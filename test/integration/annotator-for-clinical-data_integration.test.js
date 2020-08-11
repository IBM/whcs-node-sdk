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

const fs = require('fs');
// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, IamAuthenticator } = core;
const propertiesReader = require('properties-reader');
const props = propertiesReader('test/acd.ini');

const AnnotatorForClinicalDataAcdV1 = require('../../dist/annotator-for-clinical-data/v1');
const apikey = props.get('apikey');
const iamUrl = props.get('iam_url');
const serverUrl = props.get('server_url');
const apiVersion = props.get('version');
const archive = props.get('archive');
let authenticatorType = new NoAuthAuthenticator();
const disableSsl = true;
const analyzeText =
  'The patient has cancer and patient is currently taking 400 ml sisplatin chemotherapy.  Aspirin from once daily to twice daily.\nHISTORY:  Patient is allergic to latex.  Patient cannot walk and needs help bathing and getting around.  The lab values were: white blood cell count 4.6, hemoglobin 12.2.  Echocardiogram demonstrated ejection fraction of approx 60%.  Patient cannot dress or feed without help as the patient can not see.  Patient may die soon but has not died yet.  Patient smoked for 20 years.  Patient can not clean up after defacating in toilet.  Jone Doe was seen at Baylor Hospitall in Austin, TX.  Johndoe@testaddress.com - (555) 555-5555.  The patient started on metformin because his blood sugar was too high.';

if (apikey !== 'undefined' && apikey !== null && apikey.length > 0) {
  const baseOptions = {
    disableSslVerification: false,
    url: iamUrl,
  };

  authenticatorType = new IamAuthenticator(baseOptions);
}

describe('AnnotatorForClinicalDataAcdV1_integration', () => {
  jest.setTimeout(10000);
  let ACD;
  let response;
  let service;

  beforeEach(() => {
    service = {
      authenticator: authenticatorType,
      serviceUrl: serverUrl,
      version: apiVersion,
      disableSslVerification: disableSsl,
    };
    response = undefined;
  });

  test('Create Instance', done => {
    ACD = new AnnotatorForClinicalDataAcdV1(service);
    expect(ACD).not.toBeNull();
    done();
  });

  test('Get Profiles', async () => {
    const params = {};
    response = await ACD.getProfiles(params);
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).not.toBeNull();
    for (const profileId in result) {
      if (result.hasOwnProperty(profileId)) {
        expect(profileId).not.toBeNull();
      }
    }
    return;
  });

  test('Get Profile', async () => {
    const params = {
      id: 'wh_acd.ibm_clinical_insights_v1.0_profile',
    };
    response = await ACD.getProfile(params);
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.id).not.toBeNull();
    expect(result.name).not.toBeNull();
    expect(result.description).not.toBeNull();
    expect(result.publishedDate).not.toBeNull();
    expect(result.annotators).not.toBeNull();
    return;
  });

  test('Create Profile', async () => {
    const annotator = {
      name: 'concept_detection',
    };
    const annotators = [annotator];
    const params = {
      newId: 'my-profile',
      newName: 'My Profile',
      newDescription: 'Test create profile',
      newVersion: '1.0',
      newAnnotators: annotators,
    };
    response = await ACD.createProfile(params);
    expect(response.status).toEqual(201);
    return;
  });

  test('Update Profile', async () => {
    const annotator = {
      name: 'concept_detection',
    };
    const annotators = [annotator];
    const params = {
      id: 'my-profile',
      newId: 'my-profile',
      newName: 'My Profile',
      newDescription: 'Test update profile',
      newVersion: '1.0',
      newAnnotators: annotators,
    };
    response = await ACD.updateProfile(params);
    expect(response.status).toEqual(200);
    return;
  });

  test('Delete Profile', async () => {
    const params = {
      id: 'my-profile',
    };
    response = await ACD.deleteProfile(params);
    expect(response.status).toEqual(200);
    return;
  });

  test('Get Flows', async () => {
    const params = {};
    response = await ACD.getFlows(params);
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).not.toBeNull();
    for (const flowId in result) {
      if (result.hasOwnProperty(flowId)) {
        expect(flowId).not.toBeNull();
      }
    }
    return;
  });

  test('Get Flow', async () => {
    const params = {
      id: 'wh_acd.ibm_clinical_insights_v1.0_standard_flow',
    };
    response = await ACD.getFlowsById(params);
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.id).not.toBeNull();
    expect(result.name).not.toBeNull();
    expect(result.description).not.toBeNull();
    expect(result.publishedDate).not.toBeNull();
    expect(result.annotatorFlows).not.toBeNull();
    result.annotatorFlows.forEach(element => {
      expect(element.profile).not.toBeNull();
      expect(element.flow).not.toBeNull();
    });
    return;
  });

  test('Create Flow', async () => {
    const annotator = {
      name: 'concept_detection',
    };
    const flowEntry = {
      annotator: annotator,
    };
    const flowEntries = [flowEntry];
    const flow = {
      elements: flowEntries,
      async: false,
    };
    const annotatorFlow = {
      flow: flow,
    };
    const flows = [annotatorFlow];
    const params = {
      newId: 'my_flow',
      newName: 'My Flow',
      newDescription: 'Test create flow',
      version: '1.0',
      newAnnotatorFlows: flows,
    };
    response = await ACD.createFlows(params);
    expect(response.status).toEqual(201);
    return;
  });

  test('Update Flow', async () => {
    const annotator = {
      name: 'concept_detection',
    };
    const flowEntry = {
      annotator: annotator,
    };
    const flowEntries = [flowEntry];
    const flow = {
      elements: flowEntries,
      async: false,
    };
    const annotatorFlow = {
      flow: flow,
    };
    const flows = [annotatorFlow];
    const params = {
      id: 'my_flow',
      newId: 'my_flow',
      newName: 'My Flow',
      newDescription: 'Test update flow',
      version: '1.0',
      newAnnotatorFlows: flows,
    };
    response = await ACD.updateFlows(params);
    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    return;
  });

  test('Delete Flow', async () => {
    const params = {
      id: 'my_flow',
    };

    response = await ACD.deleteFlows(params);
    expect(response.status).toEqual(200);
    return;
  });

  test('Run Pipeline', async () => {
    const container = {
      text: analyzeText,
    };
    const containers = [container];
    const annotator = {
      name: 'concept_detection',
    };
    const flowEntry = {
      annotator: annotator,
    };
    const flowEntries = [flowEntry];
    const flow = {
      elements: flowEntries,
      async: false,
    };
    const annotatorFlow = {
      flow: flow,
    };
    const flows = [annotatorFlow];
    const params = {
      unstructured: containers,
      annotatorFlows: flows,
      returnAnalyzedText: false,
    };
    response = await ACD.runPipeline(params);
    expect(response.status).toEqual(200);
    const { result } = response || {};
    result.unstructured.forEach(element => {
      expect(element.data).not.toBeNull();
      expect(element.data.concepts).not.toBeNull();
      element.data.concepts.forEach(concept => {
        expect(concept.cui).not.toBeNull();
        expect(concept.begin).not.toBeNull();
        expect(concept.end).not.toBeNull();
        expect(concept.coveredText).not.toBeNull();
      });
    });
    return;
  });

  test('Run Pipeline with Flow', async () => {
    const container = {
      text: analyzeText,
    };
    const containers = [container];
    const annotatorBean = {
      unstructured: containers,
    };
    const params = {
      analyticFlowBeanInput: annotatorBean,
      flowId: 'wh_acd.ibm_clinical_insights_v1.0_standard_flow',
      returnAnalyzedText: false,
    };
    response = await ACD.runPipelineWithFlow(params);
    expect(response.status).toEqual(200);
    const { result } = response || {};
    result.unstructured.forEach(element => {
      expect(element.data).not.toBeNull();
      expect(element.data.concepts).not.toBeNull();
      element.data.concepts.forEach(concept => {
        expect(concept.cui).not.toBeNull();
        expect(concept.begin).not.toBeNull();
        expect(concept.end).not.toBeNull();
        expect(concept.coveredText).not.toBeNull();
      });
      element.data.SymptomDiseaseInd.forEach(symptomDisease => {
        expect(symptomDisease.type).not.toBeNull();
        expect(symptomDisease.begin).not.toBeNull();
        expect(symptomDisease.end).not.toBeNull();
        expect(symptomDisease.coveredText).not.toBeNull();
      });
      element.data.attributeValues.forEach(attributeValue => {
        expect(attributeValue.name).not.toBeNull();
        expect(attributeValue.begin).not.toBeNull();
        expect(attributeValue.end).not.toBeNull();
        expect(attributeValue.coveredText).not.toBeNull();
      });
    });
    return;
  });

  test('Get Annotators', async () => {
    const params = {};
    response = await ACD.getAnnotators(params);
    expect(response.status).toEqual(200);
    return;
  });

  test('Get Annotators By Id', async () => {
    const params = {
      id: 'concept_detection',
    };
    response = await ACD.getAnnotatorsById(params);
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.description).not.toBeNull();
    return;
  });

  test('Delete User Specific Artifacts', async () => {
    const params = {
      headers: {
        'X-IBM-Client-ID': 'sdk-test',
      },
    };
    response = await ACD.deleteUserSpecificArtifacts(params);
    expect(response).toBeDefined();
    expect(response.status).toEqual(204);
    return;
  });

  test('Cartridges Get', async () => {
    const params = {};
    response = await ACD.cartridgesGet(params);
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.cartridges).not.toBeNull();
    result.cartridges.forEach(cartridge => {
      expect(cartridge.id).not.toBeNull();
      expect(cartridge.status).not.toBeNull();
    });
    return;
  });

  test('Cartridges Get Id', async () => {
    const params = {
      id: 'wh_acd.ibm_clinical_insights_v1.0',
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
    result.artifactResponse.forEach(element => {
      expect(element.code).not.toBeNull();
      expect(element.message).not.toBeNull();
      expect(element.level).not.toBeNull();
      expect(element.artifact).not.toBeNull();
    });
    return;
  });

  test('Deploy Cartridge', async () => {
    const readerStream = fs.createReadStream(archive);
    const params = {
      archiveFile: readerStream,
      archiveFileContentType: 'application/octet-stream',
      update: true,
    };
    response = await ACD.deployCartridge(params);
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(299);
    return;
  });

  test('Cartridges Post Multipart', async () => {
    const readerStream = fs.createReadStream(archive);
    const params = {
      archiveFile: readerStream,
      archiveFileContentType: 'application/octet-stream',
    };
    let response;
    try {
      response = await ACD.cartridgesPostMultipart(params);
    } catch (err) {
      expect(err.status).toEqual(409);
      return err;
    }
    expect(response).toBeDefined();
    expect(response.status).toEqual(202);
    return;
  });

  test('Cartridges Put Multipart', async () => {
    const readerStream = fs.createReadStream(archive);
    const params = {
      archiveFile: readerStream,
      archiveFileContentType: 'application/octet-stream',
    };
    let response;
    try {
      response = await ACD.cartridgesPutMultipart(params);
    } catch (err) {
      expect(err.status).toEqual(409);
      return err;
    }
    expect(response).toBeDefined();
    expect(response.status).toEqual(202);
    return;
  });

  test('Health Check', async () => {
    response = await ACD.getHealthCheckStatus();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.serviceState).toEqual('OK');
    return;
  });
});
