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
// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const AnnotatorForClinicalDataAcdV1 = require('../../dist/annotator-for-clinical-data/v1');

// don't know what this should look like
const entityModel = {
}

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://annotator-for-clinical-data-acd.cloud.ibm.com/services/clinical_data_annotator/api',
  version: 'testString',
};

const annotatorForClinicalDataAcd = new AnnotatorForClinicalDataAcdV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(annotatorForClinicalDataAcd, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    version: 'testString',
  };
});

describe('AnnotatorForClinicalDataAcdV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = AnnotatorForClinicalDataAcdV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(AnnotatorForClinicalDataAcdV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(AnnotatorForClinicalDataAcdV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(AnnotatorForClinicalDataAcdV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = extend(options, requiredGlobals);

      const testInstance = AnnotatorForClinicalDataAcdV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(AnnotatorForClinicalDataAcdV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = extend(options, requiredGlobals);

      const testInstance = new AnnotatorForClinicalDataAcdV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = extend(options, requiredGlobals);

      const testInstance = new AnnotatorForClinicalDataAcdV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(AnnotatorForClinicalDataAcdV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new AnnotatorForClinicalDataAcdV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('getProfiles', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getProfiles
        const params = {};

        const getProfilesResult = annotatorForClinicalDataAcd.getProfiles(params);

        // all methods should return a Promise
        expectToBePromise(getProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.getProfiles(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.getProfiles({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createProfile', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ConfigurationEntity
      const configurationEntityModel = {
        id: 'testString',
        type: 'testString',
        uid: 26,
        mergeid: 26,
      };

      // Annotator
      const annotatorModel = {
        name: 'testString',
        parameters: { 'key1' : ['testString'] },
        configurations: [configurationEntityModel],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createProfile
        const newId = 'testString';
        const newName = 'testString';
        const newDescription = 'testString';
        const newPublishedDate = 'testString';
        const newPublish = true;
        const newVersion = 'testString';
        const newCartridgeId = 'testString';
        const newAnnotators = [annotatorModel];
        const params = {
          newId: newId,
          newName: newName,
          newDescription: newDescription,
          newPublishedDate: newPublishedDate,
          newPublish: newPublish,
          newVersion: newVersion,
          newCartridgeId: newCartridgeId,
          newAnnotators: newAnnotators,
        };

        const createProfileResult = annotatorForClinicalDataAcd.createProfile(params);

        // all methods should return a Promise
        expectToBePromise(createProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/profiles', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['id']).toEqual(newId);
        expect(options.body['name']).toEqual(newName);
        expect(options.body['description']).toEqual(newDescription);
        expect(options.body['publishedDate']).toEqual(newPublishedDate);
        expect(options.body['publish']).toEqual(newPublish);
        expect(options.body['version']).toEqual(newVersion);
        expect(options.body['cartridgeId']).toEqual(newCartridgeId);
        expect(options.body['annotators']).toEqual(newAnnotators);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.createProfile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.createProfile({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getProfile', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getProfile
        const id = 'testString';
        const params = {
          id: id,
        };

        const getProfileResult = annotatorForClinicalDataAcd.getProfile(params);

        // all methods should return a Promise
        expectToBePromise(getProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/profiles/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.getProfile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await annotatorForClinicalDataAcd.getProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getProfilePromise = annotatorForClinicalDataAcd.getProfile();
        expectToBePromise(getProfilePromise);

        getProfilePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateProfile', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ConfigurationEntity
      const configurationEntityModel = {
        id: 'testString',
        type: 'testString',
        uid: 26,
        mergeid: 26,
      };

      // Annotator
      const annotatorModel = {
        name: 'testString',
        parameters: { 'key1' : ['testString'] },
        configurations: [configurationEntityModel],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateProfile
        const id = 'testString';
        const newId = 'testString';
        const newName = 'testString';
        const newDescription = 'testString';
        const newPublishedDate = 'testString';
        const newPublish = true;
        const newVersion = 'testString';
        const newCartridgeId = 'testString';
        const newAnnotators = [annotatorModel];
        const params = {
          id: id,
          newId: newId,
          newName: newName,
          newDescription: newDescription,
          newPublishedDate: newPublishedDate,
          newPublish: newPublish,
          newVersion: newVersion,
          newCartridgeId: newCartridgeId,
          newAnnotators: newAnnotators,
        };

        const updateProfileResult = annotatorForClinicalDataAcd.updateProfile(params);

        // all methods should return a Promise
        expectToBePromise(updateProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/profiles/{id}', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['id']).toEqual(newId);
        expect(options.body['name']).toEqual(newName);
        expect(options.body['description']).toEqual(newDescription);
        expect(options.body['publishedDate']).toEqual(newPublishedDate);
        expect(options.body['publish']).toEqual(newPublish);
        expect(options.body['version']).toEqual(newVersion);
        expect(options.body['cartridgeId']).toEqual(newCartridgeId);
        expect(options.body['annotators']).toEqual(newAnnotators);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.updateProfile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await annotatorForClinicalDataAcd.updateProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateProfilePromise = annotatorForClinicalDataAcd.updateProfile();
        expectToBePromise(updateProfilePromise);

        updateProfilePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteProfile', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteProfile
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteProfileResult = annotatorForClinicalDataAcd.deleteProfile(params);

        // all methods should return a Promise
        expectToBePromise(deleteProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/profiles/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.deleteProfile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await annotatorForClinicalDataAcd.deleteProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteProfilePromise = annotatorForClinicalDataAcd.deleteProfile();
        expectToBePromise(deleteProfilePromise);

        deleteProfilePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getFlows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getFlows
        const params = {};

        const getFlowsResult = annotatorForClinicalDataAcd.getFlows(params);

        // all methods should return a Promise
        expectToBePromise(getFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/flows', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.getFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.getFlows({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createFlows', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FlowEntry
      const flowEntryModel = {
      };

      // ConfigurationEntity
      const configurationEntityModel = {
        id: 'testString',
        type: 'testString',
        uid: 26,
        mergeid: 26,
      };

      // Flow
      const flowModel = {
        elements: [flowEntryModel],
        async: true,
      };

      // AnnotatorFlow
      const annotatorFlowModel = {
        profile: 'testString',
        flow: flowModel,
        id: 'testString',
        type: 'testString',
        data: { 'key1' : [entityModel] },
        metadata: { 'key1' : { foo: 'bar' } },
        global_configurations: [configurationEntityModel],
        uid: 26,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createFlows
        const newId = 'testString';
        const newName = 'testString';
        const newDescription = 'testString';
        const newPublishedDate = 'testString';
        const newPublish = true;
        const newVersion = 'testString';
        const newCartridgeId = 'testString';
        const newAnnotatorFlows = [annotatorFlowModel];
        const params = {
          newId: newId,
          newName: newName,
          newDescription: newDescription,
          newPublishedDate: newPublishedDate,
          newPublish: newPublish,
          newVersion: newVersion,
          newCartridgeId: newCartridgeId,
          newAnnotatorFlows: newAnnotatorFlows,
        };

        const createFlowsResult = annotatorForClinicalDataAcd.createFlows(params);

        // all methods should return a Promise
        expectToBePromise(createFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/flows', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['id']).toEqual(newId);
        expect(options.body['name']).toEqual(newName);
        expect(options.body['description']).toEqual(newDescription);
        expect(options.body['publishedDate']).toEqual(newPublishedDate);
        expect(options.body['publish']).toEqual(newPublish);
        expect(options.body['version']).toEqual(newVersion);
        expect(options.body['cartridgeId']).toEqual(newCartridgeId);
        expect(options.body['annotatorFlows']).toEqual(newAnnotatorFlows);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.createFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.createFlows({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getFlowsById', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getFlowsById
        const id = 'testString';
        const params = {
          id: id,
        };

        const getFlowsByIdResult = annotatorForClinicalDataAcd.getFlowsById(params);

        // all methods should return a Promise
        expectToBePromise(getFlowsByIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/flows/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.getFlowsById(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await annotatorForClinicalDataAcd.getFlowsById({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getFlowsByIdPromise = annotatorForClinicalDataAcd.getFlowsById();
        expectToBePromise(getFlowsByIdPromise);

        getFlowsByIdPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateFlows', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FlowEntry
      const flowEntryModel = {
      };

      // ConfigurationEntity
      const configurationEntityModel = {
        id: 'testString',
        type: 'testString',
        uid: 26,
        mergeid: 26,
      };

      // Flow
      const flowModel = {
        elements: [flowEntryModel],
        async: true,
      };

      // AnnotatorFlow
      const annotatorFlowModel = {
        profile: 'testString',
        flow: flowModel,
        id: 'testString',
        type: 'testString',
        data: { 'key1' : [entityModel] },
        metadata: { 'key1' : { foo: 'bar' } },
        global_configurations: [configurationEntityModel],
        uid: 26,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateFlows
        const id = 'testString';
        const newId = 'testString';
        const newName = 'testString';
        const newDescription = 'testString';
        const newPublishedDate = 'testString';
        const newPublish = true;
        const newVersion = 'testString';
        const newCartridgeId = 'testString';
        const newAnnotatorFlows = [annotatorFlowModel];
        const params = {
          id: id,
          newId: newId,
          newName: newName,
          newDescription: newDescription,
          newPublishedDate: newPublishedDate,
          newPublish: newPublish,
          newVersion: newVersion,
          newCartridgeId: newCartridgeId,
          newAnnotatorFlows: newAnnotatorFlows,
        };

        const updateFlowsResult = annotatorForClinicalDataAcd.updateFlows(params);

        // all methods should return a Promise
        expectToBePromise(updateFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/flows/{id}', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['id']).toEqual(newId);
        expect(options.body['name']).toEqual(newName);
        expect(options.body['description']).toEqual(newDescription);
        expect(options.body['publishedDate']).toEqual(newPublishedDate);
        expect(options.body['publish']).toEqual(newPublish);
        expect(options.body['version']).toEqual(newVersion);
        expect(options.body['cartridgeId']).toEqual(newCartridgeId);
        expect(options.body['annotatorFlows']).toEqual(newAnnotatorFlows);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.updateFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await annotatorForClinicalDataAcd.updateFlows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateFlowsPromise = annotatorForClinicalDataAcd.updateFlows();
        expectToBePromise(updateFlowsPromise);

        updateFlowsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteFlows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteFlows
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteFlowsResult = annotatorForClinicalDataAcd.deleteFlows(params);

        // all methods should return a Promise
        expectToBePromise(deleteFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/flows/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.deleteFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await annotatorForClinicalDataAcd.deleteFlows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteFlowsPromise = annotatorForClinicalDataAcd.deleteFlows();
        expectToBePromise(deleteFlowsPromise);

        deleteFlowsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('runPipeline', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // UnstructuredContainer
      const unstructuredContainerModel = {
        text: 'testString',
        id: 'testString',
        type: 'testString',
        data: { 'key1' : [entityModel] },
        metadata: { 'key1' : { foo: 'bar' } },
        uid: 26,
      };

      // FlowEntry
      const flowEntryModel = {
      };

      // ConfigurationEntity
      const configurationEntityModel = {
        id: 'testString',
        type: 'testString',
        uid: 26,
        mergeid: 26,
      };

      // Flow
      const flowModel = {
        elements: [flowEntryModel],
        async: true,
      };

      // AnnotatorFlow
      const annotatorFlowModel = {
        profile: 'testString',
        flow: flowModel,
        id: 'testString',
        type: 'testString',
        data: { 'key1' : [entityModel] },
        metadata: { 'key1' : { foo: 'bar' } },
        global_configurations: [configurationEntityModel],
        uid: 26,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation runPipeline
        const unstructured = [unstructuredContainerModel];
        const annotatorFlows = [annotatorFlowModel];
        const debugTextRestore = true;
        const returnAnalyzedText = true;
        const params = {
          unstructured: unstructured,
          annotatorFlows: annotatorFlows,
          debugTextRestore: debugTextRestore,
          returnAnalyzedText: returnAnalyzedText,
        };

        const runPipelineResult = annotatorForClinicalDataAcd.runPipeline(params);

        // all methods should return a Promise
        expectToBePromise(runPipelineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/analyze', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['unstructured']).toEqual(unstructured);
        expect(options.body['annotatorFlows']).toEqual(annotatorFlows);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['debug_text_restore']).toEqual(debugTextRestore);
        expect(options.qs['return_analyzed_text']).toEqual(returnAnalyzedText);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.runPipeline(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.runPipeline({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('runPipelineWithFlow', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FlowEntry
      const flowEntryModel = {
      };

      // ConfigurationEntity
      const configurationEntityModel = {
        id: 'testString',
        type: 'testString',
        uid: 26,
        mergeid: 26,
      };

      // Flow
      const flowModel = {
        elements: [flowEntryModel],
        async: true,
      };

      // AnnotatorFlow
      const annotatorFlowModel = {
        profile: 'testString',
        flow: flowModel,
        id: 'testString',
        type: 'testString',
        data: { 'key1' : [entityModel] },
        metadata: { 'key1' : { foo: 'bar' } },
        global_configurations: [configurationEntityModel],
        uid: 26,
      };

      // UnstructuredContainer
      const unstructuredContainerModel = {
        text: 'testString',
        id: 'testString',
        type: 'testString',
        data: { 'key1' : [entityModel] },
        metadata: { 'key1' : { foo: 'bar' } },
        uid: 26,
      };

      // AnalyticFlowBeanInput
      const analyticFlowBeanInputModel = {
        unstructured: [unstructuredContainerModel],
        annotator_flows: [annotatorFlowModel],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation runPipelineWithFlow
        const flowId = 'testString';
        const returnAnalyzedText = true;
        const analyticFlowBeanInput = analyticFlowBeanInputModel;
        const contentType = 'application/json';
        const debugTextRestore = true;
        const params = {
          flowId: flowId,
          returnAnalyzedText: returnAnalyzedText,
          analyticFlowBeanInput: analyticFlowBeanInput,
          contentType: contentType,
          debugTextRestore: debugTextRestore,
        };

        const runPipelineWithFlowResult = annotatorForClinicalDataAcd.runPipelineWithFlow(params);

        // all methods should return a Promise
        expectToBePromise(runPipelineWithFlowResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/analyze/{flow_id}', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(options.body).toEqual(analyticFlowBeanInput);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['return_analyzed_text']).toEqual(returnAnalyzedText);
        expect(options.qs['debug_text_restore']).toEqual(debugTextRestore);
        expect(options.path['flow_id']).toEqual(flowId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const flowId = 'testString';
        const returnAnalyzedText = true;
        const analyticFlowBeanInput = analyticFlowBeanInputModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          flowId,
          returnAnalyzedText,
          analyticFlowBeanInput,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.runPipelineWithFlow(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await annotatorForClinicalDataAcd.runPipelineWithFlow({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const runPipelineWithFlowPromise = annotatorForClinicalDataAcd.runPipelineWithFlow();
        expectToBePromise(runPipelineWithFlowPromise);

        runPipelineWithFlowPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getAnnotators', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAnnotators
        const params = {};

        const getAnnotatorsResult = annotatorForClinicalDataAcd.getAnnotators(params);

        // all methods should return a Promise
        expectToBePromise(getAnnotatorsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/annotators', 'GET');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.getAnnotators(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.getAnnotators({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getAnnotatorsById', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAnnotatorsById
        const id = 'testString';
        const params = {
          id: id,
        };

        const getAnnotatorsByIdResult = annotatorForClinicalDataAcd.getAnnotatorsById(params);

        // all methods should return a Promise
        expectToBePromise(getAnnotatorsByIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/annotators/{id}', 'GET');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.getAnnotatorsById(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await annotatorForClinicalDataAcd.getAnnotatorsById({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getAnnotatorsByIdPromise = annotatorForClinicalDataAcd.getAnnotatorsById();
        expectToBePromise(getAnnotatorsByIdPromise);

        getAnnotatorsByIdPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteUserSpecificArtifacts', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteUserSpecificArtifacts
        const params = {};

        const deleteUserSpecificArtifactsResult = annotatorForClinicalDataAcd.deleteUserSpecificArtifacts(params);

        // all methods should return a Promise
        expectToBePromise(deleteUserSpecificArtifactsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/user_data', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.deleteUserSpecificArtifacts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.deleteUserSpecificArtifacts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('cartridgesGet', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation cartridgesGet
        const params = {};

        const cartridgesGetResult = annotatorForClinicalDataAcd.cartridgesGet(params);

        // all methods should return a Promise
        expectToBePromise(cartridgesGetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/cartridges', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.cartridgesGet(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.cartridgesGet({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('cartridgesPostMultipart', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation cartridgesPostMultipart
        const archiveFile = Buffer.from('This is a mock file.');
        const archiveFileContentType = 'testString';
        const params = {
          archiveFile: archiveFile,
          archiveFileContentType: archiveFileContentType,
        };

        const cartridgesPostMultipartResult = annotatorForClinicalDataAcd.cartridgesPostMultipart(params);

        // all methods should return a Promise
        expectToBePromise(cartridgesPostMultipartResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/cartridges', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['archive_file'].data).toEqual(archiveFile);
        expect(options.formData['archive_file'].contentType).toEqual(archiveFileContentType);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.cartridgesPostMultipart(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.cartridgesPostMultipart({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('cartridgesPutMultipart', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation cartridgesPutMultipart
        const archiveFile = Buffer.from('This is a mock file.');
        const archiveFileContentType = 'testString';
        const params = {
          archiveFile: archiveFile,
          archiveFileContentType: archiveFileContentType,
        };

        const cartridgesPutMultipartResult = annotatorForClinicalDataAcd.cartridgesPutMultipart(params);

        // all methods should return a Promise
        expectToBePromise(cartridgesPutMultipartResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/cartridges', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['archive_file'].data).toEqual(archiveFile);
        expect(options.formData['archive_file'].contentType).toEqual(archiveFileContentType);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.cartridgesPutMultipart(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.cartridgesPutMultipart({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('cartridgesGetId', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation cartridgesGetId
        const id = 'testString';
        const params = {
          id: id,
        };

        const cartridgesGetIdResult = annotatorForClinicalDataAcd.cartridgesGetId(params);

        // all methods should return a Promise
        expectToBePromise(cartridgesGetIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/cartridges/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.cartridgesGetId(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await annotatorForClinicalDataAcd.cartridgesGetId({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const cartridgesGetIdPromise = annotatorForClinicalDataAcd.cartridgesGetId();
        expectToBePromise(cartridgesGetIdPromise);

        cartridgesGetIdPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deployCartridge', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deployCartridge
        const archiveFile = Buffer.from('This is a mock file.');
        const archiveFileContentType = 'testString';
        const update = true;
        const params = {
          archiveFile: archiveFile,
          archiveFileContentType: archiveFileContentType,
          update: update,
        };

        const deployCartridgeResult = annotatorForClinicalDataAcd.deployCartridge(params);

        // all methods should return a Promise
        expectToBePromise(deployCartridgeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/deploy', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['archive_file'].data).toEqual(archiveFile);
        expect(options.formData['archive_file'].contentType).toEqual(archiveFileContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['update']).toEqual(update);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.deployCartridge(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.deployCartridge({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getServiceStatus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getServiceStatus
        const accept = 'application/json';
        const format = 'json';
        const livenessCheck = 'true';
        const params = {
          accept: accept,
          format: format,
          livenessCheck: livenessCheck,
        };

        const getServiceStatusResult = annotatorForClinicalDataAcd.getServiceStatus(params);

        // all methods should return a Promise
        expectToBePromise(getServiceStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/status', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(options.qs['format']).toEqual(format);
        expect(options.qs['liveness_check']).toEqual(livenessCheck);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.getServiceStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.getServiceStatus({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getHealthCheckStatus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getHealthCheckStatus
        const accept = 'application/json';
        const format = 'json';
        const params = {
          accept: accept,
          format: format,
        };

        const getHealthCheckStatusResult = annotatorForClinicalDataAcd.getHealthCheckStatus(params);

        // all methods should return a Promise
        expectToBePromise(getHealthCheckStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/status/health_check', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(options.qs['format']).toEqual(format);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        annotatorForClinicalDataAcd.getHealthCheckStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        annotatorForClinicalDataAcd.getHealthCheckStatus({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
