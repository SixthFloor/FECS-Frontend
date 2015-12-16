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
      var url = $scope.environment.getBaseAPI() + 'admin/shipping/list?month=' + selectMonth + '&year=' + selectYear

      $http.get(url).success(function (response) {
        self.orderList = response
      })
    }

    self.gotoView = function (orderNo) {
      $state.transitionTo('vieworder', {orderNumber: orderNo})
    }

    self.deliver = function (shipping_id, status) {
      var url= $scope.environment.getBaseAPI() + 'admin/shipping/'
      switch (status) {
        case 'progress':
          url += 'progress'
          break
        case 'done':
          url += 'done'
          break
      }
      url += '?id=' + shipping_id
      console.log(url)
      $http.post(url).success(function (response) {
        console.log(response)
        self.selectOrder(self.selectMonth, self.selectYear)
      })
    }

    self.selectOrder(self.currentMonth, self.currentYear)
  }
})()
