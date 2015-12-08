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
  function SettingController ($scope, $http, $state, $stateParams, notification, User) {
    var self = this
    self.User = User
    // self.isAuthed = User.isAuthed()
    self.show = false
    self.data = {
      email: '',
      pwd: ''
    }

    self.toggleLogin = function () {
      self.show = !self.show
    }

    self.submit = function () {
      var data = {
        email: self.User.email,
        pwd: self.data.pwd
      }
      User.confirmProfile(data, function () {
        User.editprofile(data, function () {
          $state.go('setting', {}, {reload: true})
          var msg = '<span><b>Well done!</b> Edit Profile successfully.</span>'
          notification.success({
            message: msg
          })
        }, function (err) {
          var msg = '<span><b>EDIT FAILED</b></span>'
          notification.error({
            message: msg,
            replaceMessage: true
          })
        })
      }, function (err) {
        var msg = '<span><b>Confirm Failed</b> ' + err.error.description + '.</span>'
        notification.error({
          message: msg,
          replaceMessage: true
        })
      })
    }
  }
})()