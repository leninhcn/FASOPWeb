const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],

  publicPath: '/fasop/',

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
})
// module.exports = {
//   devServer: {
//     proxy: {
//       '^/socket.io': {
//         target: 'http://localhost:3000',
//         ws: true,
//         changeOrigin: true
//       }
//     }
//   }
// }
