import * as angular from 'angular';
import 'angular-route';
import 'angular-ui-router';

import { layoutModule } from '../layouts/index';
import { homeComponent} from './home/home.component';
import { appComponent } from './app/app.component';

let appModule = angular.module('app', [
  'ngRoute',
  'ui.router',
  layoutModule.name,
  homeComponent.name
]).run(['$rootScope', '$state', function($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params);
            }
        });
    }])
    .directive('app', appComponent);

export {appModule};
