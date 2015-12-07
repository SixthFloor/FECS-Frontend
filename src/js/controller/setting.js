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

  SettingController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Locate', 'Notification', 'User']
  function SettingController ($scope, $http, $state, $stateParams, Locate, Notification, User) {
    var self = this
    self.isAuthed = User.isAuthed()
    self.Locate = Locate
    self.profile = Locate.profile
    self.valid = Locate.valid
    self.i = 0

    self.submit = function () {
      console.log($stateParams)
      if ((self.profile.email !== '') &&
        (self.profile.firstName !== '') && (self.profile.lastName !== '')) {
        Locate.valid = true
        Locate.editprofile(function (response) {
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
        Locate.valid = false
      }
      self.valid = Locate.valid
    }
  }
})()