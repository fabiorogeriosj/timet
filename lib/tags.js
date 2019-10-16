function getTags (description) {
  if (description.includes('#')) {
    var array = description.split(' ')
    var tags = []
    if (array.length > 1) {
      array.map(item => {
        if (item.startsWith('#') && item.length > 1) {
          tags.push(item)
        }
      })
      return tags
    }
  }
  return []
}
module.exports = {getTags}
