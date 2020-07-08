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

const AnnotatorForClinicalDataAcdV1 = require('../../dist/annotator-for-clinical-data/v1');
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

    test('Get Profiles', async done => {
        const params = {};
        response = await ACD.getProfiles(params);
  
        expect(response.status).toEqual(200);
        const { result } = response || {};
        done();
    });
    test('Get Profile', async done => {
        const params = {
            id: 'wh_acd.ibm_clinical_insights_v1.0_profile'
        };
        response = await ACD.getProfile(params);
  
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result.id).not.toBeNull();
        expect(result.name).not.toBeNull();
        expect(result.description).not.toBeNull();
        expect(result.publishedDate).not.toBeNull();
        expect(result.annotators).not.toBeNull();
        done();
    });
    test('Create Profile', async done => {
        const annotator =  {
            name: 'concept_detection'
        };
        const annotators = [annotator];
        const params = {
            newId: 'my-profile',
            newName: 'My Profile',
            newDescription: 'Test update profile',
            newVersion: '1.0',
            newAnnotators: annotators
        };
        try{
        response = await ACD.createProfile(params);
        expect(response.status).toEqual(201);
        done();
        } catch(err){
            //already exists
            done(err);
        }
    });
    test('Update Profile', async done => {
        const annotator =  {
            name: 'concept_detection'
        };
        const annotators = [annotator];
        const params = {
            id: 'my-profile',
            newId: 'my-profile',
            newName: 'My Profile',
            newDescription: 'Test create profile',
            newVersion: '1.0',
            newAnnotators: annotators
        };
        response = await ACD.updateProfile(params);
        expect(response.status).toEqual(200);
        done();
    });
    test('Delete Profile', async done => {
        const params = {
            id: 'my-profile'
        };
        response = await ACD.deleteProfile(params);
        expect(response.status).toEqual(200);
        done();
    });
    test('Get Flows', async done => {
        const params = {};
        response = await ACD.getFlows(params);
  
        expect(response.status).toEqual(200);
        const { result } = response || {};
        done();
    });
    test('Get Flow', async done => {
        const params = {
            id: 'wh_acd.ibm_clinical_insights_v1.0_standard_flow'
        };
        response = await ACD.getFlowsById(params);
  
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result.id).not.toBeNull();
        expect(result.name).not.toBeNull();
        expect(result.description).not.toBeNull();
        expect(result.publishedDate).not.toBeNull();
        expect(result.annotatorFlows).not.toBeNull();
        result.annotatorFlows.forEach( (element) => {
            expect(element.profile).not.toBeNull();
            expect(element.flow).not.toBeNull();
        })
        done();
    });
    test('Create Flow', async done => {
        const annotator =  {
            name: 'concept_detection'
        };
        const flowEntry = {
            annotator: annotator
        }
        const flowEntries = [flowEntry];
        const flow = {
            elements: flowEntries,
            async: false
        };
        const annotatorFlow = {
            flow: flow
        };
        const flows = [annotatorFlow];
        const params = {
            newId: 'my_flow',
            newName: 'My Flow',
            newDescription: 'Test craete flow',
            version: '1.0',
            newAnnotatorFlows: flows
        }
        response = await ACD.createFlows(params);
        expect(response.status).toEqual(201);
        done();
    });
    test('Update Flow', async done => {
        const annotator =  {
            name: 'concept_detection'
        };
        const flowEntry = {
            annotator: annotator
        }
        const flowEntries = [flowEntry];
        const flow = {
            elements: flowEntries,
            async: false
        };
        const annotatorFlow = {
            flow: flow
        };
        const flows = [annotatorFlow];
        const params = {
            id: 'my_flow',
            newId: 'my_flow',
            newName: 'My Flow',
            newDescription: 'Test update flow',
            version: '1.0',
            newAnnotatorFlows: flows
        }
        response = await ACD.updateFlows(params);
        expect(response.status).toEqual(200);
        done();
    });
    test('Delete Flow', async done => {
        const params = {
            id: 'my_flow'
        };
        response = await ACD.deleteFlows(params);
        expect(response.status).toEqual(200);
        done();
    });
    test('Run Pipeline', async done => {
        const container = {
            text: 'The patient has diabetes'
        }
        const containers = [container];
        const annotator =  {
            name: 'concept_detection'
        };
        const flowEntry = {
            annotator: annotator
        }
        const flowEntries = [flowEntry];
        const flow = {
            elements: flowEntries,
            async: false
        };
        const annotatorFlow = {
            flow: flow
        };
        const flows = [annotatorFlow];
        const params = {
            unstructured: containers,
            annotatorFlows: flows,
            returnAnalyzedText: false
        };
        response = await ACD.runPipeline(params);
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result.data).not.toBeNull();
        result.unstructured.forEach( (element) => {
            expect(element.data).not.toBeNull();
            expect(element.data['concepts']).not.toBeNull();
        })
        done();
    });
    test('Run Pipeline with Flow', async done => {
        const container = {
            text: 'The patient has diabetes'
        }
        const containers = [container];
        const annotatorBean =  {
            unstructured: containers
        };
        const params = {
            analyticFlowBeanInput: annotatorBean,
            flowId: 'wh_acd.ibm_clinical_insights_v1.0_standard_flow',
            returnAnalyzedText: false
        };
        response = await ACD.runPipelineWithFlow(params);
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result.data).not.toBeNull();
        result.unstructured.forEach( (element) => {
            expect(element.data).not.toBeNull();
            expect(element.data['concepts']).not.toBeNull();
        })
        done();
    });
    test('Get Annotators', async done => {
        const params = {};
        response = await ACD.getAnnotators(params);
  
        expect(response.status).toEqual(200);
        const { result } = response || {};
        done();
    });
    test('Get Annotators By Id', async done => {
        const params = {
            id: 'concept_detection'
        };
        response = await ACD.getAnnotatorsById(params);
  
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result.description).not.toBeNull();
        done();
    });
    test('Delete User Specific Artifacts', async done => {
        const params = {
            headers : { 
                'X-IBM-Client-ID': 'sdk-test'
            }
        };
        response = await ACD.deleteUserSpecificArtifacts(params);
        expect(response.status).toEqual(204);
        done();
    });
    test('Cartridges Get', async done => {
        const params = {};
        response = await ACD.cartridgesGet(params);
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result.cartridges).not.toBeNull();
        result.cartridges.forEach( (element) => {
            expect(element.id).not.toBeNull();
        })
        done();
    });
    test('Cartridges Get Id', async done => {
        const params = {
            id: 'wh_acd.ibm_clinical_insights_v1.0'
        };
        response = await ACD.cartridgesGetId(params);
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result.id).not.toBeNull();
        expect(result.status).not.toBeNull();
        expect(result.statusLocation).not.toBeNull();
        expect(result.startTime).not.toBeNull();
        expect(result.endTime).not.toBeNull();
        expect(result.duration).not.toBeNull();
        expect(result.correlationId).not.toBeNull();
        expect(result.artifactResponseCode).not.toBeNull();
        expect(result.artrifactResponse).not.toBeNull();
        result.artifactResponse.forEach( (element) => {
            expect(element.code).not.toBeNull();
            expect(element.message).not.toBeNull();
            expect(element.level).not.toBeNull();
            expect(element.artifact).not.toBeNull();
        })
        done();
    });
    test('Deploy Cartridge', async done => {
        var readerStream = fs.createReadStream('/Users/dcweber/Downloads/wfg_enrichment_v2.0.zip');
        readerStream.setEncoding('utf8');
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
    test('Cartridges Post Multipart', async done => {
        var readerStream = fs.createReadStream('/Users/dcweber/Downloads/wfg_enrichment_v2.0.zip');
        readerStream.setEncoding('utf8');
        const params = {
            archiveFile: readerStream,
            archiveFileContentType: "application/octet-stream"
        };
        response = await ACD.cartridgesPostMultipart(params);
        expect(response.status).toEqual(200);
        const { result } = response || {};

        done();
    });
    test('Cartridges Put Multipart', async done => {
        var readerStream = fs.createReadStream('/Users/dcweber/Downloads/wfg_enrichment_v2.0.zip');
        readerStream.setEncoding('utf8');
        const params = {
            archiveFile: readerStream,
            archiveFileContentType: "application/octet-stream"
        };
        response = await ACD.cartridgesPutMultipart(params);
        expect(response.status).toEqual(200);
        const { result } = response || {};

        done();
    });
    test('Health Check', async done => {
        response = await ACD.getHealthCheckStatus();
      
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result.serviceState).toEqual("OK");
        done();
      });
  })