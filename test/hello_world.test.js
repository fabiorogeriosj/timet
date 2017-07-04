var lib = require('../lib')

test('hello world', function () {
  expect(lib.hello()).toBe('Hello world!')
})
