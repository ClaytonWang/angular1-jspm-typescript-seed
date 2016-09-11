import * as fs from 'fs';
import { join } from 'path';
import * as vm from 'vm';
import {forEach, keys, sortBy, map, extend} from 'lodash';
import { JSPM_CONFIG_FILE, JSPM_KARMA_CONFIG_FILE } from '../../config';

export = (done: any) => {

  var jspmConfigPath = JSPM_CONFIG_FILE;
  var jspmKarmaConfig = JSPM_KARMA_CONFIG_FILE;
  let file: string = join(process.cwd(),  jspmConfigPath);

  var SystemJS = {
    configs: {
      transpilerConfig: {},
      packageConfigPathsConfig: {},
    },
    merged: {},
    config: function(cfg: any) {

      var merged = this.merged;
      forEach(cfg, function(value, key) {
        if (merged[key]) {
          extend(merged[key], cfg[key]);
        } else {
          merged[key] = value;
        }
      });
      return this.merged = merged;
    }
  };

  var context = {
    SystemJS: SystemJS,
    extend: extend,
    forEach: forEach
  };


  readModuleFile(file, function (err: any, jspmConfig: any) {
    var c: any = vm.runInNewContext(jspmConfig, context);

    // forEach(c.packageConfigPathsConfig.map, function(value, key) {
    forEach(c.map, function(value, key) {
      if (key.indexOf('@angular') !== -1) {
        var semVer = value.replace('npm:@', '').split('@')[1];
        var keyParts = key.split('/');

        // Maps
        c.map[key] = 'npm:' + key + '@' + semVer + '/bundles/' + keyParts[1] + '.umd.js';
        c.map[key + '/testing'] = 'npm:' + key + '@' + semVer + '/bundles/' + keyParts[1] + '-testing.umd.js';

        //  Packages
        c.packages[key] = getPackageDescription();
        c.packages[key + '/testing'] = getPackageDescription();
      }
    });

    c.baseURL = 'base';
    c.map = sortKeys(c.map);
    c.packages = sortKeys(c.packages);

    var fileHeader = '/**\n* This file is generated by the\n* gulp task build.jspm.test.config. \n**/\n\n';
    var fileToWrite = fileHeader + 'SystemJS.config(' + JSON.stringify(c, null, 2) + ');';

    fs.writeFile(jspmKarmaConfig, fileToWrite, function(err) {
      if(err) {
        return console.log(err);
      }

      done();
    });

  });

  function readModuleFile(path: string, callback: any) {
    try {
      var filename: string = require.resolve(path);
      fs.readFile(filename, 'utf8', callback);
    } catch (e) {
      callback(e);
    }
  }

  function getPackageDescription() {
    return {
      'defaultExtension': 'js',
      'format': 'amd',
      'meta': {
        '*.js': {
          'loader': 'ts'
        }
      }
    };
  }

  function sortKeys(obj: any) {

    var mapKeysArray:any = sortBy(keys(obj), function (key) {
      return key;
    });

    var sortedConfig: any = <Object>{};

    map(mapKeysArray, function (key: any) {
      sortedConfig[key] = obj[key];
    });

    return sortedConfig;
  }

};