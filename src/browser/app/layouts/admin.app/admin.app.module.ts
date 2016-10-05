import * as angular from 'angular';
import 'angular-route';
import 'angular-ui-router';

import { layoutAdminModule } from './layout.admin/layout.admin.module';
import { adminComponent } from './admin.app.component';


let adminModule = angular.module('admin', [
  'ngRoute',
  'ui.router',
  layoutAdminModule.name
])

  .directive('adminApp', adminComponent)

  // TODO move to config
  .run(['$rootScope', '$state', function($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params);
            }
        });
    }]);

export {adminModule};
