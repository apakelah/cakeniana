module.exports = {
  siteMetadata: {
    title: "Nianacake",
    description:"Online shop cookies premium homemade hampers delivery fresh tanpa pengawet lezat",
    author:"nadzwa salsabilah",
    keywords:"cookies, homemade, premium, hampers, delivery, fresh, tanpa pengawet, lezat, nianacake, nianacake online, nianacake id, nianacake indonesia, nianacake online shop, nianacake online store, nianacake online shop indonesia, nianacake online store indonesia, nianacake online shop id, nianacake online store id, nianacake id, nianacake indonesia, nianacake online, nianacake online shop, nianacake online store, nianacake online shop indonesia, nianacake online store indonesia, nianacake online shop id, nianacake online store id, cookies premium, cookies homemade, cookies hampers, cookies delivery, cookies fresh, cookies tanpa pengawet, cookies lezat, cookies nianacake, nianacake cookies, nianacake online cookies, nianacake online shop cookies, nianacake online store cookies, nianacake online shop indonesia cookies, nianacake online store indonesia cookies, nianacake online shop id cookies, nianacake online store id cookies,",
    url: "https://nianacake.online/",
    },

  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          indentedSyntax: true,
        },
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-decap-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/bulma-style.sass'], // applies purging only on the bulma css file
        printRejected: true,
      },
    }, // must be after other CSS plugins
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
