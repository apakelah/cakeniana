module.exports = {
  siteMetadata: {
    title: "Niana Cake & Dessert Tangerang – Cake, Cookies, Dessert Homemade",
    description: "Niana Cake & Dessert Tangerang menghadirkan beragam cake homemade, dessert segar, cookies renyah, dan hampers kue higienis. Semua dibuat dari bahan pilihan, tanpa pengawet, dan cocok untuk semua kalangan.",
    author: "Nadzwa Salsabilah",
    keywords: "cake homemade, dessert higienis, cookies premium, hampers kue, Niana Cake, Niana Cake & Dessert, cookies tanpa pengawet, cake Tangerang, dessert handmade, cake ulang tahun, mini cake, gift cake",
    url: "https://nianacake.online/",
  },

  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: { sassOptions: { indentedSyntax: true } },
    },
    // File sistem untuk images & uploads
    {
      resolve: "gatsby-source-filesystem",
      options: { path: `${__dirname}/static/img`, name: "uploads" },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { path: `${__dirname}/src/pages`, name: "pages" },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { path: `${__dirname}/src/img`, name: "images" },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { path: `${__dirname}/src/templates`, name: "templates" },
    },
    `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: { maxWidth: 2048, quality: 90, linkImagesToOriginal: false },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: { destinationDir: "static" },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-decap-cms",
      options: { modulePath: `${__dirname}/src/cms/cms.js` },
    },
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        develop: true,
        purgeOnly: ["/bulma-style.sass"],
        printRejected: true,
      },
    },
    "gatsby-plugin-netlify",
  ],
};
// make sure to put last in the array
// to avoid CSS conflicts