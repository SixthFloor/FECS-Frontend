/* global angular */

;(function () {
  /**
  * controller.settingpage Module
  *
  * @author Waranyu Rerkdee
  */
  angular
    .module('controller.settingpage', ['ui.bootstrap'])
    .controller('SettingController', SettingController)

  SettingController.$inject = ['$scope', '$http', '$state', '$stateParams', '$filter', 'User', 'Local']
  function SettingController ($scope, $http, $state, $stateParams, $filter, User, Local) {
    var self = this

    self.isAuthed = User.isAuthed()
    self.User = User
    self.Local = Local

    if (User.isAuthed()) {
      $http.defaults.headers.common['Authorization'] = User.getToken()
    } else {
      delete $http.defaults.headers.common['Authorization']
    }
  }
})()
