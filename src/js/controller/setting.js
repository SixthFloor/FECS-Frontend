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

  SettingController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Notification', 'User']
  function SettingController ($scope, $http, $state, $stateParams, Notification, User) {
    var self = this
    self.User = User
    self.isAuthed = User.isAuthed()
    self.i = 0

    self.submit = function () {
      console.log($stateParams)
      if ((self.email !== '') &&
        (self.firstName !== '') && (self.lastName !== '')) {
        User.editprofile(function (response) {
          if (response.status === 'error') {
            var msg = '<span><b>Oh snap!</b>.</span>'
            notification.error({
              message: msg,
              replaceMessage: true
            })
          } else {
            msg = '<span><b>Success!</b> Edited Furniture ID</span>'
              notification.success({
              message: msg
            })
          }
        }, function (response) {
          console.log(response)
        }, self.i)
      } else {
        console.log('should be false')
      }
    }
  }
})()