module.exports = (isDev) => {
  return {
    preserveWhitepace: true,  // 去掉模板的空格
    extractCSS: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    },
    // hotReload: false, // 根据环境变量生成
  }
}