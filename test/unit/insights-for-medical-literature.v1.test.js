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

const InsightsForMedicalLiteratureV1 = require('../../dist/insights-for-medical-literature/v1');

// TODO: don't know what this should look like
const entryModelModel = {};

const { getOptions, checkUrlAndMethod, checkMediaHeaders, expectToBePromise, checkUserHeader, checkForSuccessfulExecution } = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://insights-for-medical-literature.cloud.ibm.com/services/medical_insights/api',
  version: 'testString',
};

const insightsForMedicalLiterature = new InsightsForMedicalLiteratureV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(insightsForMedicalLiterature, 'createRequest');
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

describe('InsightsForMedicalLiteratureV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = InsightsForMedicalLiteratureV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(InsightsForMedicalLiteratureV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(InsightsForMedicalLiteratureV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(InsightsForMedicalLiteratureV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = extend(options, requiredGlobals);

      const testInstance = InsightsForMedicalLiteratureV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(InsightsForMedicalLiteratureV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = extend(options, requiredGlobals);

      const testInstance = new InsightsForMedicalLiteratureV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = extend(options, requiredGlobals);

      const testInstance = new InsightsForMedicalLiteratureV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(InsightsForMedicalLiteratureV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new InsightsForMedicalLiteratureV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('getDocuments', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocuments
        const corpus = 'testString';
        const params = {
          corpus: corpus,
        };

        const getDocumentsResult = insightsForMedicalLiterature.getDocuments(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/documents', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['corpus']).toEqual(corpus);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getDocuments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getDocuments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentsPromise = insightsForMedicalLiterature.getDocuments();
        expectToBePromise(getDocumentsPromise);

        getDocumentsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addCorpusDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addCorpusDocument
        const corpus = 'testString';
        const document = { 'key1': { foo: 'bar' } };
        const acdUrl = 'testString';
        const apiKey = 'testString';
        const flowId = 'testString';
        const accessToken = 'testString';
        const otherAnnotators = [{ foo: 'bar' }];
        const params = {
          corpus: corpus,
          document: document,
          acdUrl: acdUrl,
          apiKey: apiKey,
          flowId: flowId,
          accessToken: accessToken,
          otherAnnotators: otherAnnotators,
        };

        const addCorpusDocumentResult = insightsForMedicalLiterature.addCorpusDocument(params);

        // all methods should return a Promise
        expectToBePromise(addCorpusDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/documents', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['document']).toEqual(document);
        expect(options.body['acdUrl']).toEqual(acdUrl);
        expect(options.body['apiKey']).toEqual(apiKey);
        expect(options.body['flowId']).toEqual(flowId);
        expect(options.body['accessToken']).toEqual(accessToken);
        expect(options.body['otherAnnotators']).toEqual(otherAnnotators);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['corpus']).toEqual(corpus);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.addCorpusDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.addCorpusDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addCorpusDocumentPromise = insightsForMedicalLiterature.addCorpusDocument();
        expectToBePromise(addCorpusDocumentPromise);

        addCorpusDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentInfo', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocumentInfo
        const corpus = 'testString';
        const documentId = 'testString';
        const verbose = true;
        const params = {
          corpus: corpus,
          documentId: documentId,
          verbose: verbose,
        };

        const getDocumentInfoResult = insightsForMedicalLiterature.getDocumentInfo(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentInfoResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/documents/{document_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['verbose']).toEqual(verbose);
        expect(options.path['corpus']).toEqual(corpus);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getDocumentInfo(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getDocumentInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentInfoPromise = insightsForMedicalLiterature.getDocumentInfo();
        expectToBePromise(getDocumentInfoPromise);

        getDocumentInfoPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentAnnotations', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocumentAnnotations
        const corpus = 'testString';
        const documentId = 'testString';
        const documentSection = 'testString';
        const cuis = ['testString'];
        const includeText = true;
        const params = {
          corpus: corpus,
          documentId: documentId,
          documentSection: documentSection,
          cuis: cuis,
          includeText: includeText,
        };

        const getDocumentAnnotationsResult = insightsForMedicalLiterature.getDocumentAnnotations(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentAnnotationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/documents/{document_id}/annotations', 'GET');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['document_section']).toEqual(documentSection);
        expect(options.qs['cuis']).toEqual(cuis);
        expect(options.qs['include_text']).toEqual(includeText);
        expect(options.path['corpus']).toEqual(corpus);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const documentId = 'testString';
        const documentSection = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          documentId,
          documentSection,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getDocumentAnnotations(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getDocumentAnnotations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentAnnotationsPromise = insightsForMedicalLiterature.getDocumentAnnotations();
        expectToBePromise(getDocumentAnnotationsPromise);

        getDocumentAnnotationsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentCategories', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocumentCategories
        const corpus = 'testString';
        const documentId = 'testString';
        const highlightTagBegin = 'testString';
        const highlightTagEnd = 'testString';
        const types = ['testString'];
        const category = 'disorders';
        const onlyNegatedConcepts = true;
        const fields = 'testString';
        const limit = 38;
        const params = {
          corpus: corpus,
          documentId: documentId,
          highlightTagBegin: highlightTagBegin,
          highlightTagEnd: highlightTagEnd,
          types: types,
          category: category,
          onlyNegatedConcepts: onlyNegatedConcepts,
          fields: fields,
          limit: limit,
        };

        const getDocumentCategoriesResult = insightsForMedicalLiterature.getDocumentCategories(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentCategoriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/documents/{document_id}/categories', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['highlight_tag_begin']).toEqual(highlightTagBegin);
        expect(options.qs['highlight_tag_end']).toEqual(highlightTagEnd);
        expect(options.qs['types']).toEqual(types);
        expect(options.qs['category']).toEqual(category);
        expect(options.qs['only_negated_concepts']).toEqual(onlyNegatedConcepts);
        expect(options.qs['_fields']).toEqual(fields);
        expect(options.qs['_limit']).toEqual(limit);
        expect(options.path['corpus']).toEqual(corpus);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getDocumentCategories(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getDocumentCategories({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentCategoriesPromise = insightsForMedicalLiterature.getDocumentCategories();
        expectToBePromise(getDocumentCategoriesPromise);

        getDocumentCategoriesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentMultipleCategories', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // StringBuilder
      const stringBuilderModel = {};

      // AnnotationModel
      const annotationModelModel = {
        unique_id: 38,
        ontology: 'testString',
        section: 'testString',
        preferred_name: 'testString',
        cui: 'testString',
        attribute_id: 'testString',
        qualifiers: ['testString'],
        type: 'testString',
        negated: true,
        hypothetical: true,
        begin: 38,
        end: 38,
        score: 36.0,
        timestamp: 26,
        features: { 'key1': 'testString' },
        hits: 38,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocumentMultipleCategories
        const corpus = 'testString';
        const documentId = 'testString';
        const modelLicense = 'testString';
        const highlightedTitle = stringBuilderModel;
        const highlightedAbstract = stringBuilderModel;
        const highlightedBody = stringBuilderModel;
        const highlightedSections = { 'key1': stringBuilderModel };
        const passages = { 'key1': { 'key1': entryModelModel } };
        const annotations = { 'key1': annotationModelModel };
        const highlightTagBegin = 'testString';
        const highlightTagEnd = 'testString';
        const fields = 'testString';
        const limit = 38;
        const params = {
          corpus: corpus,
          documentId: documentId,
          modelLicense: modelLicense,
          highlightedTitle: highlightedTitle,
          highlightedAbstract: highlightedAbstract,
          highlightedBody: highlightedBody,
          highlightedSections: highlightedSections,
          passages: passages,
          annotations: annotations,
          highlightTagBegin: highlightTagBegin,
          highlightTagEnd: highlightTagEnd,
          fields: fields,
          limit: limit,
        };

        const getDocumentMultipleCategoriesResult = insightsForMedicalLiterature.getDocumentMultipleCategories(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentMultipleCategoriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/documents/{document_id}/categories', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['modelLicense']).toEqual(modelLicense);
        expect(options.body['highlightedTitle']).toEqual(highlightedTitle);
        expect(options.body['highlightedAbstract']).toEqual(highlightedAbstract);
        expect(options.body['highlightedBody']).toEqual(highlightedBody);
        expect(options.body['highlightedSections']).toEqual(highlightedSections);
        expect(options.body['passages']).toEqual(passages);
        expect(options.body['annotations']).toEqual(annotations);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['highlight_tag_begin']).toEqual(highlightTagBegin);
        expect(options.qs['highlight_tag_end']).toEqual(highlightTagEnd);
        expect(options.qs['_fields']).toEqual(fields);
        expect(options.qs['_limit']).toEqual(limit);
        expect(options.path['corpus']).toEqual(corpus);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getDocumentMultipleCategories(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getDocumentMultipleCategories({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentMultipleCategoriesPromise = insightsForMedicalLiterature.getDocumentMultipleCategories();
        expectToBePromise(getDocumentMultipleCategoriesPromise);

        getDocumentMultipleCategoriesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSearchMatches', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSearchMatches
        const corpus = 'testString';
        const documentId = 'testString';
        const minScore = 36.0;
        const cuis = ['testString'];
        const text = ['testString'];
        const types = ['testString'];
        const limit = 38;
        const searchTagBegin = 'testString';
        const searchTagEnd = 'testString';
        const relatedTagBegin = 'testString';
        const relatedTagEnd = 'testString';
        const fields = 'testString';
        const params = {
          corpus: corpus,
          documentId: documentId,
          minScore: minScore,
          cuis: cuis,
          text: text,
          types: types,
          limit: limit,
          searchTagBegin: searchTagBegin,
          searchTagEnd: searchTagEnd,
          relatedTagBegin: relatedTagBegin,
          relatedTagEnd: relatedTagEnd,
          fields: fields,
        };

        const getSearchMatchesResult = insightsForMedicalLiterature.getSearchMatches(params);

        // all methods should return a Promise
        expectToBePromise(getSearchMatchesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/documents/{document_id}/search_matches', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['min_score']).toEqual(minScore);
        expect(options.qs['cuis']).toEqual(cuis);
        expect(options.qs['text']).toEqual(text);
        expect(options.qs['types']).toEqual(types);
        expect(options.qs['_limit']).toEqual(limit);
        expect(options.qs['search_tag_begin']).toEqual(searchTagBegin);
        expect(options.qs['search_tag_end']).toEqual(searchTagEnd);
        expect(options.qs['related_tag_begin']).toEqual(relatedTagBegin);
        expect(options.qs['related_tag_end']).toEqual(relatedTagEnd);
        expect(options.qs['_fields']).toEqual(fields);
        expect(options.path['corpus']).toEqual(corpus);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const documentId = 'testString';
        const minScore = 36.0;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          documentId,
          minScore,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getSearchMatches(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getSearchMatches({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSearchMatchesPromise = insightsForMedicalLiterature.getSearchMatches();
        expectToBePromise(getSearchMatchesPromise);

        getSearchMatchesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

        const getHealthCheckStatusResult = insightsForMedicalLiterature.getHealthCheckStatus(params);

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

        insightsForMedicalLiterature.getHealthCheckStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiterature.getHealthCheckStatus({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('search', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation search
        const corpus = 'testString';
        const body = 'testString';
        const verbose = true;
        const params = {
          corpus: corpus,
          body: body,
          verbose: verbose,
        };

        const searchResult = insightsForMedicalLiterature.search(params);

        // all methods should return a Promise
        expectToBePromise(searchResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/search', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(body);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['verbose']).toEqual(verbose);
        expect(options.path['corpus']).toEqual(corpus);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const body = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.search(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.search({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const searchPromise = insightsForMedicalLiterature.search();
        expectToBePromise(searchPromise);

        searchPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getFields', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getFields
        const corpus = 'testString';
        const params = {
          corpus: corpus,
        };

        const getFieldsResult = insightsForMedicalLiterature.getFields(params);

        // all methods should return a Promise
        expectToBePromise(getFieldsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/search/metadata', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['corpus']).toEqual(corpus);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getFields(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getFields({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getFieldsPromise = insightsForMedicalLiterature.getFields();
        expectToBePromise(getFieldsPromise);

        getFieldsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('typeahead', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation typeahead
        const corpus = 'testString';
        const query = 'testString';
        const ontologies = ['concepts'];
        const types = ['testString'];
        const category = 'disorders';
        const verbose = true;
        const limit = 38;
        const maxHitCount = 38;
        const noDuplicates = true;
        const params = {
          corpus: corpus,
          query: query,
          ontologies: ontologies,
          types: types,
          category: category,
          verbose: verbose,
          limit: limit,
          maxHitCount: maxHitCount,
          noDuplicates: noDuplicates,
        };

        const typeaheadResult = insightsForMedicalLiterature.typeahead(params);

        // all methods should return a Promise
        expectToBePromise(typeaheadResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/search/typeahead', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['query']).toEqual(query);
        expect(options.qs['ontologies']).toEqual(ontologies);
        expect(options.qs['types']).toEqual(types);
        expect(options.qs['category']).toEqual(category);
        expect(options.qs['verbose']).toEqual(verbose);
        expect(options.qs['_limit']).toEqual(limit);
        expect(options.qs['max_hit_count']).toEqual(maxHitCount);
        expect(options.qs['no_duplicates']).toEqual(noDuplicates);
        expect(options.path['corpus']).toEqual(corpus);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const query = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          query,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.typeahead(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.typeahead({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const typeaheadPromise = insightsForMedicalLiterature.typeahead();
        expectToBePromise(typeaheadPromise);

        typeaheadPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCorporaConfig', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCorporaConfig
        const verbose = true;
        const params = {
          verbose: verbose,
        };

        const getCorporaConfigResult = insightsForMedicalLiterature.getCorporaConfig(params);

        // all methods should return a Promise
        expectToBePromise(getCorporaConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['verbose']).toEqual(verbose);
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

        insightsForMedicalLiterature.getCorporaConfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiterature.getCorporaConfig({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('setCorpusSchema', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation setCorpusSchema
        const enrichmentTargets = [{ foo: 'bar' }];
        const metadataFields = [{ foo: 'bar' }];
        const corpusName = 'testString';
        const references = { 'key1': { foo: 'bar' } };
        const params = {
          enrichmentTargets: enrichmentTargets,
          metadataFields: metadataFields,
          corpusName: corpusName,
          references: references,
        };

        const setCorpusSchemaResult = insightsForMedicalLiterature.setCorpusSchema(params);

        // all methods should return a Promise
        expectToBePromise(setCorpusSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['enrichmentTargets']).toEqual(enrichmentTargets);
        expect(options.body['metadataFields']).toEqual(metadataFields);
        expect(options.body['corpusName']).toEqual(corpusName);
        expect(options.body['references']).toEqual(references);
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

        insightsForMedicalLiterature.setCorpusSchema(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiterature.setCorpusSchema({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteCorpusSchema', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCorpusSchema
        const instance = 'testString';
        const params = {
          instance: instance,
        };

        const deleteCorpusSchemaResult = insightsForMedicalLiterature.deleteCorpusSchema(params);

        // all methods should return a Promise
        expectToBePromise(deleteCorpusSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['instance']).toEqual(instance);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instance = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instance,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.deleteCorpusSchema(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.deleteCorpusSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteCorpusSchemaPromise = insightsForMedicalLiterature.deleteCorpusSchema();
        expectToBePromise(deleteCorpusSchemaPromise);

        deleteCorpusSchemaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('setCorpusConfig', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation setCorpusConfig
        const userName = 'testString';
        const password = 'testString';
        const corpusUri = 'testString';
        const params = {
          userName: userName,
          password: password,
          corpusUri: corpusUri,
        };

        const setCorpusConfigResult = insightsForMedicalLiterature.setCorpusConfig(params);

        // all methods should return a Promise
        expectToBePromise(setCorpusConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/configure', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['userName']).toEqual(userName);
        expect(options.body['password']).toEqual(password);
        expect(options.body['corpusURI']).toEqual(corpusUri);
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

        insightsForMedicalLiterature.setCorpusConfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiterature.setCorpusConfig({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('monitorCorpus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation monitorCorpus
        const apikey = 'testString';
        const params = {
          apikey: apikey,
        };

        const monitorCorpusResult = insightsForMedicalLiterature.monitorCorpus(params);

        // all methods should return a Promise
        expectToBePromise(monitorCorpusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/monitor', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['apikey']).toEqual(apikey);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const apikey = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          apikey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.monitorCorpus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.monitorCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const monitorCorpusPromise = insightsForMedicalLiterature.monitorCorpus();
        expectToBePromise(monitorCorpusPromise);

        monitorCorpusPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('enableCorpusSearchTracking', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation enableCorpusSearchTracking
        const enableTracking = true;
        const params = {
          enableTracking: enableTracking,
        };

        const enableCorpusSearchTrackingResult = insightsForMedicalLiterature.enableCorpusSearchTracking(params);

        // all methods should return a Promise
        expectToBePromise(enableCorpusSearchTrackingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/tracking', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['enable_tracking']).toEqual(enableTracking);
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

        insightsForMedicalLiterature.enableCorpusSearchTracking(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiterature.enableCorpusSearchTracking({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getCorpusConfig', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCorpusConfig
        const corpus = 'testString';
        const verbose = true;
        const params = {
          corpus: corpus,
          verbose: verbose,
        };

        const getCorpusConfigResult = insightsForMedicalLiterature.getCorpusConfig(params);

        // all methods should return a Promise
        expectToBePromise(getCorpusConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['verbose']).toEqual(verbose);
        expect(options.path['corpus']).toEqual(corpus);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getCorpusConfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getCorpusConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getCorpusConfigPromise = insightsForMedicalLiterature.getCorpusConfig();
        expectToBePromise(getCorpusConfigPromise);

        getCorpusConfigPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getConcepts', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getConcepts
        const corpus = 'testString';
        const cuis = ['testString'];
        const preferredNames = ['testString'];
        const surfaceForms = ['testString'];
        const attributes = ['testString'];
        const verbose = true;
        const sort = 'hitCount';
        const limit = 38;
        const params = {
          corpus: corpus,
          cuis: cuis,
          preferredNames: preferredNames,
          surfaceForms: surfaceForms,
          attributes: attributes,
          verbose: verbose,
          sort: sort,
          limit: limit,
        };

        const getConceptsResult = insightsForMedicalLiterature.getConcepts(params);

        // all methods should return a Promise
        expectToBePromise(getConceptsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/concepts', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['cuis']).toEqual(cuis);
        expect(options.qs['preferred_names']).toEqual(preferredNames);
        expect(options.qs['surface_forms']).toEqual(surfaceForms);
        expect(options.qs['attributes']).toEqual(attributes);
        expect(options.qs['verbose']).toEqual(verbose);
        expect(options.qs['_sort']).toEqual(sort);
        expect(options.qs['_limit']).toEqual(limit);
        expect(options.path['corpus']).toEqual(corpus);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getConcepts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getConcepts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getConceptsPromise = insightsForMedicalLiterature.getConcepts();
        expectToBePromise(getConceptsPromise);

        getConceptsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addArtifact', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DictonaryEntry
      const dictonaryEntryModel = {
        children: ['testString'],
        cui: 'testString',
        definition: ['testString'],
        parents: ['testString'],
        preferred_name: 'testString',
        semtypes: ['testString'],
        siblings: ['testString'],
        surface_forms: ['testString'],
        variants: ['testString'],
        vocab: 'testString',
        related: ['testString'],
        source: 'testString',
        source_version: 'testString',
      };

      // PossbileValues
      const possbileValuesModel = {
        display_value: 'testString',
        value: 'testString',
      };

      // AttributeEntry
      const attributeEntryModel = {
        attr_name: 'testString',
        data_type: 'testString',
        default_value: 'testString',
        description: 'testString',
        display_name: 'testString',
        doc_id: 'testString',
        field_values: ['testString'],
        maximum_value: 'testString',
        minimum_value: 'testString',
        multi_value: true,
        units: 'testString',
        value_type: 'testString',
        possible_values: [possbileValuesModel],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addArtifact
        const corpus = 'testString';
        const dictionaryEntry = dictonaryEntryModel;
        const attributeEntry = attributeEntryModel;
        const params = {
          corpus: corpus,
          dictionaryEntry: dictionaryEntry,
          attributeEntry: attributeEntry,
        };

        const addArtifactResult = insightsForMedicalLiterature.addArtifact(params);

        // all methods should return a Promise
        expectToBePromise(addArtifactResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/concepts/definitions', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['dictionaryEntry']).toEqual(dictionaryEntry);
        expect(options.body['attributeEntry']).toEqual(attributeEntry);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['corpus']).toEqual(corpus);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.addArtifact(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.addArtifact({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addArtifactPromise = insightsForMedicalLiterature.addArtifact();
        expectToBePromise(addArtifactPromise);

        addArtifactPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCuiInfo', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCuiInfo
        const corpus = 'testString';
        const nameOrId = 'testString';
        const ontology = 'testString';
        const fields = 'testString';
        const treeLayout = true;
        const params = {
          corpus: corpus,
          nameOrId: nameOrId,
          ontology: ontology,
          fields: fields,
          treeLayout: treeLayout,
        };

        const getCuiInfoResult = insightsForMedicalLiterature.getCuiInfo(params);

        // all methods should return a Promise
        expectToBePromise(getCuiInfoResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/concepts/{name_or_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['ontology']).toEqual(ontology);
        expect(options.qs['_fields']).toEqual(fields);
        expect(options.qs['tree_layout']).toEqual(treeLayout);
        expect(options.path['corpus']).toEqual(corpus);
        expect(options.path['name_or_id']).toEqual(nameOrId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const nameOrId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          nameOrId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getCuiInfo(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getCuiInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getCuiInfoPromise = insightsForMedicalLiterature.getCuiInfo();
        expectToBePromise(getCuiInfoPromise);

        getCuiInfoPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getHitCount', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getHitCount
        const corpus = 'testString';
        const nameOrId = 'testString';
        const ontology = 'testString';
        const params = {
          corpus: corpus,
          nameOrId: nameOrId,
          ontology: ontology,
        };

        const getHitCountResult = insightsForMedicalLiterature.getHitCount(params);

        // all methods should return a Promise
        expectToBePromise(getHitCountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/concepts/{name_or_id}/hit_count', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['ontology']).toEqual(ontology);
        expect(options.path['corpus']).toEqual(corpus);
        expect(options.path['name_or_id']).toEqual(nameOrId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const nameOrId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          nameOrId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getHitCount(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getHitCount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getHitCountPromise = insightsForMedicalLiterature.getHitCount();
        expectToBePromise(getHitCountPromise);

        getHitCountPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getRelatedConcepts', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getRelatedConcepts
        const corpus = 'testString';
        const nameOrId = 'testString';
        const relationship = 'children';
        const ontology = 'testString';
        const relationshipAttributes = ['testString'];
        const sources = ['testString'];
        const recursive = true;
        const treeLayout = true;
        const maxDepth = 38;
        const params = {
          corpus: corpus,
          nameOrId: nameOrId,
          relationship: relationship,
          ontology: ontology,
          relationshipAttributes: relationshipAttributes,
          sources: sources,
          recursive: recursive,
          treeLayout: treeLayout,
          maxDepth: maxDepth,
        };

        const getRelatedConceptsResult = insightsForMedicalLiterature.getRelatedConcepts(params);

        // all methods should return a Promise
        expectToBePromise(getRelatedConceptsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/concepts/{name_or_id}/related_concepts', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['relationship']).toEqual(relationship);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['ontology']).toEqual(ontology);
        expect(options.qs['relationship_attributes']).toEqual(relationshipAttributes);
        expect(options.qs['sources']).toEqual(sources);
        expect(options.qs['recursive']).toEqual(recursive);
        expect(options.qs['tree_layout']).toEqual(treeLayout);
        expect(options.qs['max_depth']).toEqual(maxDepth);
        expect(options.path['corpus']).toEqual(corpus);
        expect(options.path['name_or_id']).toEqual(nameOrId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const nameOrId = 'testString';
        const relationship = 'children';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          nameOrId,
          relationship,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getRelatedConcepts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getRelatedConcepts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getRelatedConceptsPromise = insightsForMedicalLiterature.getRelatedConcepts();
        expectToBePromise(getRelatedConceptsPromise);

        getRelatedConceptsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSimilarConcepts', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSimilarConcepts
        const corpus = 'testString';
        const nameOrId = 'testString';
        const returnOntologies = ['testString'];
        const ontology = 'testString';
        const limit = 38;
        const params = {
          corpus: corpus,
          nameOrId: nameOrId,
          returnOntologies: returnOntologies,
          ontology: ontology,
          limit: limit,
        };

        const getSimilarConceptsResult = insightsForMedicalLiterature.getSimilarConcepts(params);

        // all methods should return a Promise
        expectToBePromise(getSimilarConceptsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/concepts/{name_or_id}/similar_concepts', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['return_ontologies']).toEqual(returnOntologies);
        expect(options.qs['ontology']).toEqual(ontology);
        expect(options.qs['_limit']).toEqual(limit);
        expect(options.path['corpus']).toEqual(corpus);
        expect(options.path['name_or_id']).toEqual(nameOrId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const nameOrId = 'testString';
        const returnOntologies = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          nameOrId,
          returnOntologies,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiterature.getSimilarConcepts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiterature.getSimilarConcepts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSimilarConceptsPromise = insightsForMedicalLiterature.getSimilarConcepts();
        expectToBePromise(getSimilarConceptsPromise);

        getSimilarConceptsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
