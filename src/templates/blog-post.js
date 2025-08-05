import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={(
          <Helmet titleTemplate="%s | Blog">
            <title>{post.frontmatter.title}</title>
            <meta name="description" content={post.frontmatter.description} />
            
            {/* Canonical URL */}
            <link
              rel="canonical"
              href={`https://nianacake.online${post.fields.slug}`}
            />

            {/* Open Graph */}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={post.frontmatter.title} />
            <meta property="og:description" content={post.frontmatter.description} />
            <meta
              property="og:url"
              content={`https://nianacake.online${post.fields.slug}`}
            />
            <meta
              property="og:image"
              content={`https://nianacake.online${post.frontmatter.featuredimage.publicURL}`}
            />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.frontmatter.title} />
            <meta name="twitter:description" content={post.frontmatter.description} />
            <meta
              name="twitter:image"
              content={`https://nianacake.online${post.frontmatter.featuredimage.publicURL}`}
            />

            {/* Structured Data */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.frontmatter.title,
                description: post.frontmatter.description,
                datePublished: post.frontmatter.date,
                author: {
                  "@type": "Organization",
                  name: "Nianacake",
                },
                publisher: {
                  "@type": "Organization",
                  name: "Nianacake",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://nianacake.online/img/logo.png",
                  },
                },
                image: `https://nianacake.online${post.frontmatter.featuredimage.publicURL}`,
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://nianacake.online${post.fields.slug}`,
                },
              })}
            </script>
          </Helmet>
        )}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        description
        tags
        featuredimage {
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 800
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`;
