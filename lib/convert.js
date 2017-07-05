function convertMinsToHrsMins (minutes) {
  var h = Math.floor(minutes / 60)
  var m = minutes % 60
  m = m < 10 ? '0' + m : m
  return h + ':' + m
}

function draw (v, n) {
  v = v.toString()
  var vn = v
  for (var i = v.length; i < n; i++) {
    vn += ' '
  }
  return vn
}

module.exports = {convertMinsToHrsMins, draw}
