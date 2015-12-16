/* global angular */

;(function () {
  /**
  * controller.categorypage Module
  *
  * @author Jiratchaya Intaragumhaneg
  * @description Category Controller module use for view products by their category , can sort the products
  */
  angular
    .module('controller.shipping', [])
    .controller('ShippingController', ShippingController)

  ShippingController.$inject = ['$scope', '$http', '$state', 'moment']
  function ShippingController ($scope, $http, $state, moment) {
    var self = this

    var date = moment(new Date())
    self.currentYear = date.year()
    self.currentMonth = date.month()
    self.selectMonth = String(self.currentMonth)
    self.selectYear = String(self.currentYear)

    self.selectOrder = function (selectMonth, selectYear) {
      var url = $scope.environment.getBaseAPI() + 'shipping/view?month=' + selectMonth + '&year=' + selectYear

      $http.get(url).success(function (response) {
        if (response.description == 'None of shipping slots is inprogress') {
          self.msg = response.description
        }
        self.orderList = response
      })
    }

    self.gotoView = function (orderNo) {
      $state.transitionTo('vieworder', {orderNumber: orderNo})
    }
    self.selectOrder(self.currentMonth, self.currentYear)
  }
})()
