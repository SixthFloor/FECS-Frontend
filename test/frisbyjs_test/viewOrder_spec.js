/* API Test case: View order */
/* Created by Runyasak */

var request = require('request')
var frisby = require('frisby')

var login_body = {
  'email': 'runyatest@gmail.com',
  'password': '12345678'
}

var login_req = {
  uri: 'http://128.199.133.224/api/authentication/login',
  method: 'POST',
  json: login_body
}

var newOrder_body = {
  'user': { 'id': 440 },
  'cart': [ { 'product': { 'id': 156 }, 'quantity': 2 }
  ]
}

describe('View order', function () {
  it('should be responsed with order id when request with order detail', function (done) {
    request(login_req, login_callback)
    function login_callback (error, body) {
      var newOrder_req = {
        uri: 'http://128.199.133.224/api/order/new',
        method: 'POST',
        headers: {
          Authorization: body.body.token,
          'Content-Type': 'application/json'
        },
        json: newOrder_body
      }
      request(newOrder_req, newOrder_callback)
      var auth = body.body.token
      function newOrder_callback (error, response, body) {
        var post_headers = {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
        frisby.create('post order id to check product history')
          .get('http://128.199.133.224/api/order/' + body)
          .addHeaders(post_headers)
          .inspectJSON()
          .expectJSON('cart.?',{
            product: {
                    id: 156
            }
          })
        .toss()
        done()
      }
    }
  })
})