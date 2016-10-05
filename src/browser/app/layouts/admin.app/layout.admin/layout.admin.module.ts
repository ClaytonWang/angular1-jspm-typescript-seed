import * as angular from 'angular';
import 'angular-ui-router';
import { layoutAdminRoutes } from './layout.admin.routes';


layoutAdminRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

let layoutAdminModule = angular.module('layout.admin', [
        'ui.router'
    ]).config(layoutAdminRoutes);

export {layoutAdminModule};
