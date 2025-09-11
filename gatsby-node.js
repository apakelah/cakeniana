const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              tags
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading Markdown files', result.errors)
    return
  }

  const posts = result.data.allMarkdownRemark.edges

  // Create pages from Markdown
  posts.forEach(({ node }) => {
    const { id, fields: { slug }, frontmatter: { templateKey, title } } = node

    if (!templateKey) {
      reporter.warn(`Markdown "${title || id}" tidak memiliki templateKey. Halaman tidak akan dibuat.`)
      return
    }

    const templatePath = path.resolve(`src/templates/${templateKey}.js`)

    createPage({
      path: slug,
      component: templatePath,
      context: { id },
    })

    reporter.info(`Page dibuat: ${slug} menggunakan template: ${templateKey}`)
  })

  // Create tag pages
  let tags = []
  posts.forEach(({ node }) => {
    if (_.get(node, 'frontmatter.tags')) {
      tags = tags.concat(node.frontmatter.tags)
    }
  })

  tags = _.uniq(tags.filter(tag => tag)) // hapus tag duplikat & kosong

  tags.forEach(tag => {
    const tagPath = `/tags/${_.kebabCase(tag)}/`
    createPage({
      path: tagPath,
      component: path.resolve(`src/templates/tags.js`),
      context: { tag },
    })
    reporter.info(`Tag page dibuat: ${tagPath}`)
  })
}
