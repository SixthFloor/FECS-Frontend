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

  SettingController.$inject = ['$scope', '$http', '$state', '$stateParams', '$filter', 'User', 'Locate']
  function SettingController ($scope, $http, $state, $stateParams, $filter, User, Locate) {
    var self = this

    self.isAuthed = User.isAuthed()
    self.User = User
    self.Locate = Locate

    if (User.isAuthed()) {
      $http.defaults.headers.common['Authorization'] = User.getToken()
    } else {
      delete $http.defaults.headers.common['Authorization']
    }

    self.submit = function () {
      Locate.editprofile(function (response) { 
        if (response.status === 'error') {
          var msg = '<span><b>Oh snap!</b> ' + response.message + '.</span>'
          notification.error({
            message: msg,
            replaceMessage: true
          })
        } else {
          msg = '<span><b>Success!</b> Edited Furniture ID: ' + self.productID + '<br/>' + self.product.productName + "'s datas saved.</span>"
          notification.success({
            message: msg
          })
        }
      })  
    }
  }
})()
