'use strict';
(function(module) {
  try {
    module = angular.module('tink.navigation');
  } catch (e) {
    module = angular.module('tink.navigation', ['tink.tinkApi']);
  }
  module.directive('tinkNavAside',['tinkApi', '$timeout',function(tinkApi, $timeout){
   return {
    restrict:'AE',
    link:function(scope,elem,attr){

      $timeout(function() {
        if(!tinkApi.sideNavigation || !tinkApi.sideNavToggle){
          return;
        }

        var opts= {
            
        };
        if(attr.extraTop){
            opts.extraTop = parseInt(attr.extraTop);
        }
        if(attr.autoSelect){
          opts.autoSelect = (attr.autoSelect === 'true');
        }
        var sideNav = tinkApi.sideNavigation(elem);
        sideNav.init(opts);
        if(attr.toggleId){
          tinkApi.sideNavToggle.register(attr.toggleId,sideNav);
        }
      });
    }
};
}]);
})();