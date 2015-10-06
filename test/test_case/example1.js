/* global describe */
/* global it */
/* global browser */
/* global element */
/* global by */
/* global expect */
/* global beforeEach */
describe('test application homepage', function () {
  it('should print some message', function () {
    browser.get('http://localhost:3030')

    element(by.binding('welcome')).getText().then(function (message) {
      expect(message).toBe('Welcome to Furniture E-Commerce System')
    })

  })

})
