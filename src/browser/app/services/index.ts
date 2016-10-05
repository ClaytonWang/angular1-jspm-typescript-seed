import * as angular from 'angular';

import { johnPapaFactoryModule } from './factory.sampleJohnPapa/johnPapa.module';

let services = angular.module('app.services', [
  johnPapaFactoryModule.name
]);


export {services};
