var tags = require('../lib/tags')

test('getTags("")', function () {
  expect(tags.getTags('').length).toBe(0)
})

test('getTags("my text here")', function () {
  expect(tags.getTags('my text here').length).toBe(0)
})

test('getTags("my text here @")', function () {
  var r = tags.getTags('my text here @')
  expect(r.length).toBe(0)
})

test('getTags("my text here @work")', function () {
  var r = tags.getTags('my text here @work')
  expect(r.length).toBe(1)
  expect(r[0]).toBe('@work')
})

test('getTags("my text here @work @prj1")', function () {
  var r = tags.getTags('my text here @work @prj1')
  expect(r.length).toBe(2)
  expect(r[0]).toBe('@work')
  expect(r[1]).toBe('@prj1')
})

test('removeTags("")', function () {
  expect(tags.removeTags('')).toBe('')
})

test('removeTags("my text here")', function () {
  expect(tags.removeTags('my text here')).toBe('my text here')
})

test('removeTags("my text here @")', function () {
  var r = tags.removeTags('my text here @')
  expect(r).toBe('my text here @')
})

test('removeTags("my text here @work")', function () {
  var r = tags.removeTags('my text here @work')
  expect(r).toBe('my text here')
})

test('removeTags("my text here @work @prj1")', function () {
  var r = tags.removeTags('my text here @work @prj1')
  expect(r).toBe('my text here')
})
