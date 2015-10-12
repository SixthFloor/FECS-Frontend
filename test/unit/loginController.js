/* global describe */
/* global beforeEach */
/* global it */
/* global inject */
/* global expect */

describe('Login Services', function () {
  var $httpBackend
  beforeEach(module('services.login'))

  var serviceLogin
  var httpBackend
  beforeEach(inject(function($httpBackend, login) {
    httpBackend = $httpBackend
    serviceLogin = login
  }))
  
  describe('try to connect to login api with empty request', function () {
    it('should respone some error', inject(function () {
      var data = {
      	username: 'username',
      	pwd: 'password'
      }
      var response
      function callback(res){
      	response = res
      }
      serviceLogin.login(data, callback)
      expect(response.error).toBeDefined()
    }))
})
