/* global angular */

;(function () {
  /**
  * controller.home Module
  *
  * @author Jiratchaya Intaragumhaneg
  * @description Homepage Controller module to add create all controller of this project.
  */
  angular
    .module('controller.navbar', [])
    .controller('NavbarController', NavbarController)

  NavbarController.$inject = ['$scope', 'FECSAuth']
  function NavbarController ($scope, FECSAuth) {
    var self = this

    self.isAuthed = FECSAuth.isAuthed()
  }
})()
