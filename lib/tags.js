function getTags (description) {
  if (description.includes('@')) {
    var array = description.split(' ')
    var tags = []
    if (array.length > 1) {
      array.map(item => {
        if (item.startsWith('@') && item.length > 1) {
          tags.push(item.substring(1))
        }
      })
      return tags
    }
  }
  return []
}

function removeTags (description) {
  if (description.includes('@')) {
    var array = description.split(' ')
    var desc = ''
    array.map(item => {
      if (!item.startsWith('@') || item.length === 1) {
        desc += item + ' '
      }
    })
    return desc.trimRight()
  }
  return description
}

module.exports = {getTags, removeTags}
