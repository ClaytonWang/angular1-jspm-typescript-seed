import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import { join } from 'path';

import {PROJECT_TASKS_DIR, DEV_TASKS_DIR, E2E_TASKS_DIR, PROD_TASKS_DIR, REPORTS_TASKS_DIR, UNIT_TESTS_TASKS_DIR} from './tools/config';
import {loadTasks} from './tools/utils';


loadTasks(DEV_TASKS_DIR);
loadTasks(PROJECT_TASKS_DIR);
loadTasks(E2E_TASKS_DIR);
loadTasks(PROD_TASKS_DIR);
loadTasks(REPORTS_TASKS_DIR);
loadTasks(UNIT_TESTS_TASKS_DIR);

/**
 * No config property since this is for demo
 * purposes only. Either comment or remove
 * when forking this repo.
 */
loadTasks(join(process.cwd(), 'tools', 'tasks', 'conditionalSubstitution'));


// --------------
// Build dev.
gulp.task('build.dev', (done: any) =>
  runSequence(
    'build.index.dev',
    'serve.dev',
    done));

gulp.task('dev', (done: any) =>
  runSequence(
    'set.featureA',
    'build.dev',
    done));

// Feature A
gulp.task('dev.featureA', (done: any) =>
  runSequence(
    'set.featureA',
    'build.dev',
    done));

// Feature B
gulp.task('dev.featureB', (done: any) =>
  runSequence(
    'set.featureB',
    'build.dev',
    done));

// --------------
// Build prod.

gulp.task('build.prod', (done: any) =>
  runSequence(
    'tslint',
    'build.assets.prod',
    'copy.prod',
    'build.index.prod',
    'serve.prod',
    done));

// --------------
// Build prod
gulp.task('prod', (done: any) =>
  runSequence(
    'clean.prod',
    'build.js.prod.featureA',
    'build.prod',
    done));

// Feature A
gulp.task('prod.featureA', (done: any) =>
  runSequence(
    'clean.prod',
    'build.js.prod.featureA',
    'build.prod',
    done));

// Feature B
gulp.task('prod.featureB', (done: any) =>
  runSequence(
    'clean.prod',
    'build.js.prod.featureB',
    'build.prod',
    done));

// --------------
// Test.
gulp.task('test', (done: any) =>
  runSequence(
    'build.jspm.test.config',
    'clean.unitTest.reports',
    'karma.start',
    done));

// --------------
// e2e serving dev.
gulp.task('e2e.dev', (done: any) =>
  runSequence(
    'clean.e2e.reports',
    'build.index.dev',
    'protractor.dev',
    done));

gulp.task('e2e', ['e2e.dev']);

// --------------
// e2e serving dev.
// Note: Don't want to use prod task because
// browsersync intermittently interferes with
// protractor's multicapabilities feature.
gulp.task('e2e.prod', (done: any) =>
  runSequence(
    'clean.e2e.reports',
    'build.index.prod',
    'protractor.prod',
    done));

// --------------
// Clean all reports.
gulp.task('clean.reports', ['clean.e2e.reports', 'clean.unitTest.reports']);
