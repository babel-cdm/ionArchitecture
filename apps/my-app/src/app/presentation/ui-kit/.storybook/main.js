module.exports = {
  stories: [
    "../**/*.mdx",
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/angular",
    "options": {}
  },
  core: { 
    builder: 'webpack5'
  },
  docs: {
    "autodocs": "tag"
  },
  // uncomment the property below if you want to apply some webpack config
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs
  //   // Return the altered config
  //   return config;
  // },
}