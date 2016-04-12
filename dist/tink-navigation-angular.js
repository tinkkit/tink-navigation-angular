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
})();;'use strict';
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
})();;'use strict';
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
})();;