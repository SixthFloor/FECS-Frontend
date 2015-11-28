/* global angular */

;(function () {
  /**
  * service.permission Module
  *
  * @author Chinnaporn Soonue
  * @description Permission Service to check permission of the role.
  */
  angular
    .module('services.permission', ['permission'])
    .run(permissionService)

  function permissionService (Permission, User) {
    Permission.defineRole('anonymous', function (stateParams) {
      console.log(!User.isAuthed())
      return !User.isAuthed()
    })
  }

})()
