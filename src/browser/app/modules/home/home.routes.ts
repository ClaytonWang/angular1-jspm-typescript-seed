import {HomeController} from './home.controller';
import template from './home.html!text';

let homeRoutes = function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/admin');

    $stateProvider
        .state('layoutAdmin.admin', {
            url: '',
            views: {
                'content@layoutAdmin': {
                    template: template,
                    controller: HomeController,
                    controllerAs: 'vm',
                    bindToController: true
                }
            }
        });
};

export {homeRoutes};
