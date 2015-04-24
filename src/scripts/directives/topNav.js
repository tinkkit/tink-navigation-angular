'use strict';
(function(module) {
  try {
    module = angular.module('tink.navigation');
  } catch (e) {
    module = angular.module('tink.navigation', ['tink.tinkApi']);
  }
  module.directive('tinkTopNav',['$document','$window','tinkApi',function($document,$window,tinkApi){
   return {
    restrict:'AE',
    priority:99,
    link:function(scope,elem){
      if(!tinkApi.sideNavigation || !tinkApi.sideNavToggle){
        return;
      }
      tinkApi.topNavigation(elem).init();
  }
};
}]);
})();