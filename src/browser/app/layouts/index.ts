import * as angular from 'angular';
import {adminModule} from './admin.app/admin.app.module';

let layoutModule = angular.module('app.layouts', [
    adminModule.name
]);

export {layoutModule};
