'use strict';
describe('TopNavigation', function() {

  var bodyEl = $('body'), sandboxEl;
  var $compile, $templateCache, $animate, scope, today, $timeout,$window,tinkApi;

  beforeEach(module('tink.tinkApi'));
  beforeEach(module('tink.navigation'));


  beforeEach(inject(function (_$rootScope_, _$compile_, _$templateCache_, _$animate_, _$timeout_,_$window_,_tinkApi_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $templateCache = _$templateCache_;
    $animate = _$animate_;
    today = new Date();
    bodyEl.html('');
    sandboxEl = $('<div>').attr('id', 'sandbox').appendTo(bodyEl);
    $timeout = _$timeout_;
    $window = _$window_;
    tinkApi = _tinkApi_;
  }));

  afterEach(function() {
    scope.$destroy();
    sandboxEl.remove();
  });

  function compileDirective(template, locals) {
    template = templates[template];
    angular.extend(scope, angular.copy(template.scope || templates['default'].scope), locals);
    var element = $(template.element).appendTo(sandboxEl);
    element = $compile(element)(scope);
    scope.$digest();
    return jQuery(element[0]);
  }

  var templates = {
    'default': {
      scope: {selectedDate: new Date()},
      element: '<nav data-tink-top-nav class="nav-top">'+
      '<ul class="nav-top-left">'+
      '<li class="nav-top-logo">'+
      '<a href="#" title=""><span>My App</span></a>'+
      '</li>'+
      '<li class="nav-top-toggle">'+
      '<a href="#" title="Open menu" data-ng-click="sidenav.open = !sidenav.open"><i class="fa fa-bars"><span class="sr-only">Open menu</span></i></a>'+
      '</li>'+
      '<li class="nav-top-app">'+
      '<h1><a href="#">My App</a></h1>'+
      '</li>'+
      '<li>'+
      '<a href="#">Menu L1</a>'+
      '</li>'+
      '</ul>'+
      '<ul class="nav-top-right">'+
      '<li class="active">'+
      '<a href="#">Menu R1</a>'+
      '</li>'+
      '<li>'+
      '<a href="#">Menu R2</a>'+
      '</li>'+
      '</ul>'+
      '<div class="nav-top-center">'+
      '<input type="search" class="input-search" placeholder="Zoeken" />'+
      '</div>'+
      '</nav>'
    },
    'withSidenav': {
      scope: {selectedDate: new Date()},
      element:
      '<nav data-tink-top-nav class="nav-top">'+
      '<ul class="nav-top-left">'+
      '<li class="nav-top-logo">'+
      '<a href="#" title=""><span>My App</span></a>'+
      '</li>'+
      '<li class="nav-top-toggle" data-tink-sidenav-collapse="sidenav">'+
      '<a href="#" title="Open menu" data-ng-click="sidenav.open = !sidenav.open"><i class="fa fa-bars"><span class="sr-only">Open menu</span></i></a>'+
      '</li>'+
      '<li class="nav-top-app">'+
      '<h1><a href="#">My App</a></h1>'+
      '</li>'+
      '<li>'+
      '<a href="#">Menu L1</a>'+
      '</li>'+
      '</ul>'+
      '<ul class="nav-top-right">'+
      '<li class="active">'+
      '<a href="#">Menu R1</a>'+
      '</li>'+
      '<li>'+
      '<a href="#">Menu R2</a>'+
      '</li>'+
      '</ul>'+
      '<div class="nav-top-center">'+
      '<input type="search" class="input-search" placeholder="Zoeken" />'+
      '</div>'+
      '</nav>'+
      '<aside data-tink-nav-aside data-toggle-id="sidenav" class="nav-left">'+
      '<ul class="nav-aside-list" role="sidenav">'+
      '<li> <a href="#/menu1"> <i class="fa fa-fw fa-dashboard"></i> <span>Menu item 1</span> <span class="badge">479</span> </a> </li>'+
      '<li class="can-open"> <a href="#/menu2"> <i class="fa fa-fw fa-dashboard"></i> <span>Menu item 2</span> <span class="badge">479</span> </a> <ul>'+
      '<li> <a href="#/menu2/menu1"> <span>Sub menu item 1</span> <span class="badge">479</span> </a> </li>'+
      '<li> <a href="#/menu2/menu2"> <span>Sub menu item 2</span> </a> </li>'+
      '<li> <a href="#/menu2/menu3"> <span>Sub menu item 3 als dat geen probleem is</span> <span class="badge">479</span> </a>'+
      '</li>'+
      '</ul> </li>'+
      '<li> <a href="#/menu4"> <!-- <i class="fa fa-fw fa-dashboard"></i> --> <span>Menu item 4<span class="badge">479</span></span> </a>'+
      '<ul>'+
      '<li> <a href="#/menu4/menu1"> <span>Sub menu item 14<span class="badge">479</span></span> </a> </li>'+
      '<li> <a href="#/menu4/menu2"> <span>Sub menu item14</span> </a> </li>'+
      '<li> <a href="#/menu4/menu3"> <span> Sub menu item 54 <span class="badge">479</span> </span> </a> </li>'+
      '</ul> </li>'+
      '<li> <a href="#/menu3"> <i class="fa fa-fw fa-dashboard"></i> <span>Menu item 3</span> </a> </li>'+
      '<li> <a href="#/menu3/menu4"> <i class="fa fa-fw fa-dashboard"></i> <span>Menu item 4</span> </a> </li> </ul> </aside>'
    }
  };


  describe('default', function() {
    it('resize padding when window resizes ',function(){
      var elm = compileDirective('default');
      var bodyStart = bodyEl.css('padding-top');
      bodyEl.css('width', '50px');
      $(window).trigger('resize');
      scope.$digest();
      setTimeout(function(){
           expect(bodyEl.css('padding-top')).toBeGreaterThan(bodyStart);
      expect(bodyEl.css('padding-top')).toBe(elm[0].getBoundingClientRect().height+'px');

      },500);
    });
  });
  describe('with sideNavigation', function() {

    afterEach(function() {
      $('html').removeClass('nav-left-open');
    });

    it('when clicked on toggle add class to sideNavigation',function(){
      var elm = compileDirective('withSidenav');
      elm.find('li.nav-top-toggle').triggerHandler('click');
      scope.$digest();
      expect($('html').hasClass('nav-left-open')).toBe(true);
    });

    it('when click on toggle expect function to be called',function(){
      var elm = compileDirective('withSidenav');
      var spyToggle = spyOn(tinkApi.sideNavToggle,'toggleById');
      elm.find('li.nav-top-toggle').triggerHandler('click');
      scope.$digest();
      expect(spyToggle).toHaveBeenCalled();
    });

    it('when sidenav is open close it again',function(){
      var elm = compileDirective('withSidenav');
      elm.find('li.nav-top-toggle').triggerHandler('click');
      scope.$digest();
      expect($('html').hasClass('nav-left-open')).toBe(true);
      elm.find('li.nav-top-toggle').triggerHandler('click');
      scope.$digest();
      expect($('html').hasClass('nav-left-open')).toBe(false);
    });
  });

});