import angular from 'angular';
import { factoryJohnPapa } from './johnPapa.factory';


let johnPapaFactoryModule = angular.module('factory.johnPapa', [])
  .factory('johnPapaService', factoryJohnPapa);

export {johnPapaFactoryModule};
