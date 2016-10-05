import * as angular from 'angular';
import 'angular-ui-router';

import {homeRoutes} from './home.routes';

homeRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

let homeComponent = angular.module('app.component.home', [
	'ui.router'
])
.config(homeRoutes);

export {homeComponent};
