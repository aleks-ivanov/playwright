/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as folio from 'folio';
import * as path from 'path';
import { test as pageTest } from '../page/pageTest';
import { androidFixtures } from '../android/androidTest';
import { PlaywrightOptions } from './browserTest';
import { CommonOptions } from './baseTest';

const outputDir = path.join(__dirname, '..', '..', 'test-results');
const testDir = path.join(__dirname, '..');
const config: folio.Config<CommonOptions & PlaywrightOptions> = {
  testDir,
  outputDir,
  timeout: 120000,
  globalTimeout: 7200000,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [
    'dot',
    { name: 'json', outputFile: path.join(outputDir, 'report.json') },
  ] : 'line',
  projects: [],
};

const metadata = {
  platform: 'Android',
  headful: false,
  browserName: 'chromium',
  channel: 'chrome',
  mode: 'default',
  video: false,
};

config.projects.push({
  name: 'android',
  use: {
    loopback: '10.0.2.2',
    mode: 'default',
    browserName: 'chromium',
  },
  testDir: path.join(testDir, 'android'),
  metadata,
});

config.projects.push({
  name: 'android',
  use: {
    loopback: '10.0.2.2',
    mode: 'default',
    browserName: 'chromium',
  },
  testDir: path.join(testDir, 'page'),
  define: { test: pageTest, fixtures: androidFixtures },
  metadata,
});

export default config;
