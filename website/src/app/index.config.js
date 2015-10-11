(function() {
  'use strict';

  angular
    .module('website')
    .provider('chandlerFoodBankApiRequestInterceptor', function() {
      var _this = this;
      _this.rootDataAndMeta = true;

      var transform = function(data, meta) {
        if (_this.rootDataAndMeta) {
          var payload = {
            data: data
          };
          if (meta) {
            payload.meta = meta;
          }
          return payload;
        }
        return data;
      };

      this.$get = ['$q', function($q) {
        var apiRegex = /^https:\/\/limitless-chamber-3620.herokuapp.com\/api\/.*/;
        return {
          request: function(req) {
            if (apiRegex.test(req.url)) {
              req.data = transform(req.data, req.meta);
            }
            return req;
          },
          response: function(res) {
            if (apiRegex.test(res.config.url)) {
              // Don't send the info about the request.
              return res.data;
            }
            return res;
          },
          responseError: function(res) {
            if (apiRegex.test(res.config.url)) {
              // TODO : could get the ktApi error message from meta... -OR- some point on the response.
              if (res.status !== 200 || res.status !== 201) {
                return $q.reject('Not Okay');
              }
            }
            return res;
          }
        };
      }];
    })
    .config(http)
    .config(config);

  /** @ngInject */
  function http($httpProvider, jwtInterceptorProvider) {
    //jwtInterceptorProvider.authPrefix = ''; Bearer xxx

    jwtInterceptorProvider.tokenGetter = ['config', 'userCache', function(config, userCache) {
      var apiRegex = /^https:\/\/limitless-chamber-3620.herokuapp.com\/api\/.*/;
      if (apiRegex.test(config.url)) {
        return userCache.get('jwt');
      }
    }];

    $httpProvider.interceptors.push('chandlerFoodBankApiRequestInterceptor');
    $httpProvider.interceptors.push('jwtInterceptor');
  }

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
