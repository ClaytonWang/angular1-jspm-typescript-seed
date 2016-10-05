'use strict';

// unit tests pass
import forOwn from 'lodash/forOwn';


factoryJohnPapa.$inject = ['$log', '$timeout'];
function factoryJohnPapa($log, $timeout) {

  /**
   *
   * Factory API
   */
  var service = {
    publish: publish,
    getData: getData,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  };

  var _cache = '';
  var subscribers = {};

  function getData() {
    return _cache;
  }

  function publish(id, newValue) {
    _cache = newValue;
    notify(id);
  }

  function subscribe(uniqueName, callback) {
    subscribers[uniqueName] = callback;

    if (_cache.length) {
      notify();
    }
  }

  function notify(id) {
    forOwn(subscribers, function(subscriber, key) {

      /**
       * Make sure subscriber is a function.
       *
       * To minimize $digest cycles, only publish to
       * subscribers that do not have the
       * same id as the publisher.
       */
      if (typeof subscriber === 'function' && (!id || id && id !== key)) {
        $timeout(function() {
          subscriber.call(null, _cache);
        }, 0, true)
      }
    });
  }

  function unsubscribe(id) {
    delete subscribers[id];
  }

  return service;
}

export { factoryJohnPapa };
