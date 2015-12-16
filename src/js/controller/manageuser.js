/* global angular */

;(function () {
  /**
  * controller.manageuser Module
  *
  * @author Waranyu Rerkdee
  */
  angular
    .module('controller.manageuserpage', ['ui.bootstrap', 'ngTable'])
    .controller('ManageuserController', ManageuserController)

  ManageuserController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Notification', 'Manage', 'NgTableParams']
  function ManageuserController ($scope, $http, $state, $stateParams, notification, Manage, NgTableParams) {
    var self = this

    self.cancel = cancel
    self.del = del
    self.save = save

    self.tableParams = new NgTableParams({
      count: 10
    },
      {
        counts: ['10', '50', '100'],
        filterDelay: 300,
        paginationMaxBlocks: 13,
        paginationMinBlocks: 2,
        getData: function (params) {
          return Manage.getData(params).then(function (res) {
            return res
          }, function (res) {
            return res
          })
        }
      })
    function cancel (row, rowForm) {
      row.isEditing = false
      rowForm.$setPristine()
    }

    function del (row) {
      _.remove(self.tableParams.settings().dataset, function (item) {
        return row === item
      })
      self.tableParams.reload().then(function (data) {
        if (data.length === 0 && self.tableParams.total() > 0) {
          self.tableParams.page(self.tableParams.page() - 1)
          self.tableParams.reload()
        }
      })
    }

    function resetRow (row, rowForm) {
      row.isEditing = false
      rowForm.$setPristine()
      // self.tableTracker.untrack(row)
      // console.log(_)
      // return _.findWhere(originalData, function (r) {
      //   return r.id === row.id
      // })
      return row
    }

    function save (row, rowForm) {
      var originalRow = resetRow(row, rowForm)
      angular.extend(originalRow, row)
    }
  }
})()
