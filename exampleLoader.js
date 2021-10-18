function exampleLoader (content, map, meta) {
  console.log(content);
  this.callback(null, content, map, meta)
}

module.exports = exampleLoader
