/* global angular */

;(function () {
  angular
    .module('controller.navbar', [])
    .controller('NavbarController', NavbarController)

  NavbarController.$inject = []
  function NavbarController () {
    var self = this
    self.welcomeMessage = 'Welcome to FECS'
  }
})()
