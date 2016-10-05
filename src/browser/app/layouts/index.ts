import * as angular from 'angular';
import {layoutAdminModule} from './layout.admin/index';

let layoutModule = angular.module('app.layouts', [
    layoutAdminModule.name
]);

export {layoutModule};
