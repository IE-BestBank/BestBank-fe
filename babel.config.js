module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry', // Ensures polyfills are added automatically
        corejs: { version: 3 }, // Specifies the `core-js` version
      },
    ],
  ],
};
