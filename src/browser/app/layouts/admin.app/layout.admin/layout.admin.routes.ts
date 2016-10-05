import template from './layout.admin.html!text';
// import './home.css!';

let layoutAdminRoutes = function($stateProvider, $urlRouterProvider){

    // $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('layoutAdmin', {
            url: '/admin',
            template: template,
            redirectTo: 'layoutAdmin.admin'
        });
};

export {layoutAdminRoutes};
