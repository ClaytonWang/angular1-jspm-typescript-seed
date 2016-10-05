import * as angular from 'angular';

/**
 * IMPORTANT:
 *
 * layoutModule must be injected here to use
 * ui.router sub view
 */
import { layoutModule } from '../layouts/index';

import { homeComponent } from './route.home/home.module';

let modules = angular.module('app.modules', [
  homeComponent.name,
  layoutModule.name
]);


export {modules};
