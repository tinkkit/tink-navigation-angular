'use strict';
(function(module) {
  try {
    module = angular.module('tink.navigation');
  } catch (e) {
    module = angular.module('tink.navigation', ['tink.tinkApi']);
  }
  module.directive('tinkNavAside',['tinkApi',function(tinkApi){
   return {
    restrict:'AE',
    link:function(scope,elem,attr){
      if(!tinkApi.sideNavigation || !tinkApi.sideNavToggle){
        return;
      }

      var opts= {};
      if(attr.autoSelect){
        opts.autoSelect = (attr.autoSelect === 'true');
      }
      var sideNav = tinkApi.sideNavigation(elem);
      sideNav.init(opts);
      if(attr.toggleId){
        tinkApi.sideNavToggle.register(attr.toggleId,sideNav);
      }
    }
};
}]);
})();