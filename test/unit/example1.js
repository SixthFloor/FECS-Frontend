/* global describe */
/* global beforeEach */
/* global it */
/* global inject */
/* global expect */

describe('FECS route', function () {
  beforeEach(module('FECSapp'))
  // beforeEach(module('ui.router'))
  // beforeEach(module('FECSapp'))

  describe('router controller', function () {
    it('should ....', inject(function ($controller) {
      var $scope = {}
      var HomePageController = $controller('HomePageController', {$scope: $scope})
      expect(HomePageController).toBeDefined()
    }))

  })
})
