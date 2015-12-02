/* global angular */

/**
* Environment service Module
*
* @auth Chinnaporn Soonue
* @description Environment service - config path api for application
*/
;(function () {
  angular
    .module('services.environment', [])
    .service('environment', environment)

  function environment () {
    return {
      getBaseAPI: getBaseAPI
    }

    function getBaseAPI () {
      return 'http://128.199.133.224/api/'
    }
  }
})()
