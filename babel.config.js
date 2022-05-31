
module.exports = api => {
  const isDev = api.env() === "dev";
  return {
    "presets": [["@babel/env"], "@babel/react", "@babel/typescript"],

    // Babel >= 7.13.0 (https://babeljs.io/docs/en/assumptions)
    "plugins": [
      [
        "react-css-modules",
        {
          "generateScopedName": isDev ? "[path]_[local]" : "[hash:base64]",
          "filetypes": {
            ".scss": { "syntax": "postcss-scss" }
          },
          "exclude": "node_modules",
          "webpackHotModuleReloading": true,
          "attributeNames": {
            "activeStyleName": "activeClassName"
          },
          "autoResolveMultipleImports": true
        }
      ],
      [
        "module-resolver",
        {
          "root": ["./src"],
          "alias": {
            "@": "./src"
          }
        }
      ],
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css"
        }
      ],
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": false }],
      ["react-hot-loader/babel"]
    ],
    "assumptions": {
      "setPublicClassFields": false
    }
  }
}
