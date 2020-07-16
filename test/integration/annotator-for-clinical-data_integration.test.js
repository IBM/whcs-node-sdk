/**
 * (C) Copyright IBM Corp. 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const extend = require('extend');
const fs = require('fs');
// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, IamAuthenticator } = core;
const PropertiesReader = require('properties-reader');
const props = PropertiesReader('test/acd.ini');

const AnnotatorForClinicalDataAcdV1 = require('../../dist/annotator-for-clinical-data-acd/v1');
const apikey = props.get('apikey');
const iamUrl = props.get('iam_url');
const serverUrl = props.get('server_url');
const apiVersion = props.get('version');
const authenticatorType = new NoAuthAuthenticator();
const disableSsl = true;

if (apikey !== 'undefined' && apikey !== null && apikey.length > 0) {
  const baseOptions = {
    disableSslVerification: false,
    url: iamUrl
  }
  
  authenticatorType = new IamAuthenticator(baseOptions)
  console.log("iam auth")

}

  describe('AnnotatorForClinicalDataAcdV1_integration', () => {
    let ACD;
    let response;
    let service;

    beforeEach(() => {
      service = {
        authenticator: authenticatorType,
        serviceUrl: serverUrl,
        version: apiVersion,
        disableSslVerification: disableSsl
      };
      response = undefined;
    });

    test('Create Instance', done => {
      ACD = new AnnotatorForClinicalDataAcdV1(service);
      expect(ACD).not.toBeNull();
      done();
    });

   
      test('Deploy Cartridge', async done => {
          var readerStream = fs.createReadStream('/Users/dangst/Downloads/deb_test_0414_v2.0.zip');
          
          //readerStream.setEncoding('utf8');
          const params = {
              archiveFile: readerStream,
              archiveFileContentType: "application/octet-stream",
              update: true
          };
        
          response = await ACD.deployCartridge(params);
          expect(response.status).toEqual(200);
          const { result } = response || {};

          done();
      });
  })
