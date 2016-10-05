import * as angular from 'angular';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-route';

// Load CSS
// import 'normalize.css';
// Contains Roboto font required by angular material
// import '../scss/global.css!';

/**
 * app directive that contains the whole application.
 */
import { modules } from './modules/index';

angular.element(document).ready(() => {

  var container = document.getElementById('app-container');

  angular.bootstrap(container, [
    modules.name,
    'ngAnimate',
    'ngRoute',
    'ui.router'], {
    strictDi: true
  });
});

export {modules};
