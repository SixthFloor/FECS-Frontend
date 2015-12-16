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
      return !User.isAuthed()
    })

    Permission.defineRole('member', function (stateParams) {
      if (User.isAuthed()) {
        if (User.role === 'member') {
          return true
        }
      }
      return false
    })

    Permission.defineRole('staff', function (stateParams) {
      if (User.isAuthed()) {
        if (User.role === 'staff') {
          return true
        }
      }
      return false
    })

    Permission.defineRole('admin', function (stateParams) {
      if (User.isAuthed()) {
        if (User.role === 'admin') {
          return true
        }
      }
      return false
    })

    Permission.defineRole('owner', function (stateParams) {
      if (User.isAuthed()) {
        if (User.role === 'owner') {
          return true
        }
      }
      return false
    })
  }
})()
