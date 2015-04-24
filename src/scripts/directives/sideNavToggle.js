'use strict';
(function(module) {
  try {
    module = angular.module('tink.navigation');
  } catch (e) {
    module = angular.module('tink.navigation', ['tink.tinkApi']);
  }
  module.directive('tinkSidenavCollapse',['tinkApi',function(tinkApi){
   return {
    restrict:'A',
    link:function(scope,elem,attr){
      if(!tinkApi.sideNavigation || !tinkApi.sideNavToggle){
        return;
      }
      elem.bind('click', function(){
        if(attr.tinkSidenavCollapse && attr.tinkSidenavCollapse.trim() !== ''){
          tinkApi.sideNavToggle.toggleById(attr.tinkSidenavCollapse);
          return false;
        }
      });
    }
};
}]);
})();