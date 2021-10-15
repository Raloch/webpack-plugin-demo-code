const fs = require('fs')
const path = require('path')

// 根据路径，获取其下所有的文件名称
const getAllFiles = (url) => {
  const res = []
  const getRes = (url) => {
    const list = fs.readdirSync(url)
    list.forEach(item => {
      const file = path.resolve(url, item)
      const stat = fs.statSync(file)
      if (stat.isFile()) {
        res.push(file)
      } else (
        getRes(file)
      )
    })
  }
  getRes(url)
  return res
}

class ExamplePlugin {
  constructor (options = {}) {
    // ...
  }

  apply (compiler) {
    compiler.hooks.emit.tap('ExamplePlugin', compilation => {
      const fileDependencies = [...compilation.fileDependencies].filter(item => {
        // 过滤 src 下且带有后缀为文件
        return /.*\/src\/.*\..*/.test(item)
      })

      const allFiles = getAllFiles(path.resolve(__dirname, './src'))
      const invalidFiles = allFiles.filter((item) => !fileDependencies.includes(item))
      fs.writeFileSync('./invalid_files.json', JSON.stringify(invalidFiles))
    })
    
    // 其它阶段也可以拿到 fileDependencies，例如：
    // compiler.hooks.done.tap('ExamplePlugin', stats => {
    //   const fileDependencies = [...stats.compilation.fileDependencies].filter(item => {
    //     // 过滤 src 下且带有后缀为文件
    //     return /.*\/src\/.*\..*/.test(item)
    //   })

    //   const allFiles = getAllFiles(path.resolve(__dirname, './src'))
    //   const invalidFiles = allFiles.filter((item) => !fileDependencies.includes(item))
    //   console.log(invalidFiles);
    // })
  }
}

module.exports = ExamplePlugin
