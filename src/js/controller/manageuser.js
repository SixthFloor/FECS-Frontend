/* global angular */

;(function () {
  /**
  * controller.manageuser Module
  *
  * @author Waranyu Rerkdee
  */
  angular
    .module('controller.manageuserpage', ['ui.bootstrap', 'ngTable'])
    .controller('ManageuserController', ManageuserController)

  ManageuserController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Notification', 'Manage', 'ngTableParams']
  function ManageuserController ($scope, $http, $state, $stateParams, notification, Manage, ngTableParams) {
    var self = this
    self.Manage = Manage
    self.data = [{
      name: "Moroni", 
      age: 50
    }]

    self.tableParams = new ngTableParams({}, { dataset: self.data})
  }
})()