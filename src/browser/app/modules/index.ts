import * as angular from 'angular';

import { homeComponent} from './home/home.component';
import { layoutModule } from '../layouts/index';

let modules = angular.module('app.modules', [
  homeComponent.name,
  layoutModule.name
]);


export {modules};
