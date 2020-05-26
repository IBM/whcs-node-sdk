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

const InsightsForMedicalLiteratureServiceV1 = require('../../dist/insights-for-medical-literature-service/v1');

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
  url: 'https://insights-for-medical-literature-service.cloud.ibm.com/services/medical_insights/api',
  version: 'testString',
};

const insightsForMedicalLiteratureService = new InsightsForMedicalLiteratureServiceV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(insightsForMedicalLiteratureService, 'createRequest');
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

describe('InsightsForMedicalLiteratureServiceV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = InsightsForMedicalLiteratureServiceV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(InsightsForMedicalLiteratureServiceV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(InsightsForMedicalLiteratureServiceV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(InsightsForMedicalLiteratureServiceV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = extend(options, requiredGlobals);

      const testInstance = InsightsForMedicalLiteratureServiceV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(InsightsForMedicalLiteratureServiceV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = extend(options, requiredGlobals);

      const testInstance = new InsightsForMedicalLiteratureServiceV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = extend(options, requiredGlobals);

      const testInstance = new InsightsForMedicalLiteratureServiceV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(InsightsForMedicalLiteratureServiceV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new InsightsForMedicalLiteratureServiceV1(service);
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

        const getDocumentsResult = insightsForMedicalLiteratureService.getDocuments(params);

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

        insightsForMedicalLiteratureService.getDocuments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getDocuments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentsPromise = insightsForMedicalLiteratureService.getDocuments();
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
        const document = { 'key1' : { foo: 'bar' } };
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

        const addCorpusDocumentResult = insightsForMedicalLiteratureService.addCorpusDocument(params);

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

        insightsForMedicalLiteratureService.addCorpusDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.addCorpusDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addCorpusDocumentPromise = insightsForMedicalLiteratureService.addCorpusDocument();
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

        const getDocumentInfoResult = insightsForMedicalLiteratureService.getDocumentInfo(params);

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

        insightsForMedicalLiteratureService.getDocumentInfo(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getDocumentInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentInfoPromise = insightsForMedicalLiteratureService.getDocumentInfo();
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

        const getDocumentAnnotationsResult = insightsForMedicalLiteratureService.getDocumentAnnotations(params);

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

        insightsForMedicalLiteratureService.getDocumentAnnotations(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getDocumentAnnotations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentAnnotationsPromise = insightsForMedicalLiteratureService.getDocumentAnnotations();
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

        const getDocumentCategoriesResult = insightsForMedicalLiteratureService.getDocumentCategories(params);

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

        insightsForMedicalLiteratureService.getDocumentCategories(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getDocumentCategories({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentCategoriesPromise = insightsForMedicalLiteratureService.getDocumentCategories();
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
      const stringBuilderModel = {
      };

      // AnnotationModel
      const annotationModelModel = {
        unique_id: 38,
        sticky_ids: [38],
        ontology: 'testString',
        section: 'testString',
        preferred_name: 'testString',
        cui: 'testString',
        attribute_id: 'testString',
        qualifiers: ['testString'],
        type: 'testString',
        negated: true,
        hypothetical: true,
        unit: 'testString',
        min_value: 'testString',
        max_value: 'testString',
        operator: 'testString',
        nlu_source_type: 'testString',
        nlu_relation: 'testString',
        nlu_target_type: 'testString',
        nlu_entity_index: 'testString',
        nlu_mention_index: 'testString',
        nlu_relation_id: 'testString',
        nlu_side: 'testString',
        begin: 38,
        end: 38,
        score: 36.0,
        timestamp: 26,
        features: { 'key1' : 'testString' },
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
        const highlightedSections = { 'key1' : stringBuilderModel };
        const passages = { 'key1' : { 'key1' : entryModelModel } };
        const annotations = { 'key1' : annotationModelModel };
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

        const getDocumentMultipleCategoriesResult = insightsForMedicalLiteratureService.getDocumentMultipleCategories(params);

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

        insightsForMedicalLiteratureService.getDocumentMultipleCategories(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getDocumentMultipleCategories({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDocumentMultipleCategoriesPromise = insightsForMedicalLiteratureService.getDocumentMultipleCategories();
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
        const attributes = ['testString'];
        const values = ['testString'];
        const nluRelations = ['testString'];
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
          attributes: attributes,
          values: values,
          nluRelations: nluRelations,
          limit: limit,
          searchTagBegin: searchTagBegin,
          searchTagEnd: searchTagEnd,
          relatedTagBegin: relatedTagBegin,
          relatedTagEnd: relatedTagEnd,
          fields: fields,
        };

        const getSearchMatchesResult = insightsForMedicalLiteratureService.getSearchMatches(params);

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
        expect(options.qs['attributes']).toEqual(attributes);
        expect(options.qs['values']).toEqual(values);
        expect(options.qs['nlu_relations']).toEqual(nluRelations);
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

        insightsForMedicalLiteratureService.getSearchMatches(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getSearchMatches({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSearchMatchesPromise = insightsForMedicalLiteratureService.getSearchMatches();
        expectToBePromise(getSearchMatchesPromise);

        getSearchMatchesPromise.catch(err => {
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

        const getCorporaConfigResult = insightsForMedicalLiteratureService.getCorporaConfig(params);

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

        insightsForMedicalLiteratureService.getCorporaConfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiteratureService.getCorporaConfig({});
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
        const references = { 'key1' : { foo: 'bar' } };
        const params = {
          enrichmentTargets: enrichmentTargets,
          metadataFields: metadataFields,
          corpusName: corpusName,
          references: references,
        };

        const setCorpusSchemaResult = insightsForMedicalLiteratureService.setCorpusSchema(params);

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

        insightsForMedicalLiteratureService.setCorpusSchema(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiteratureService.setCorpusSchema({});
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

        const deleteCorpusSchemaResult = insightsForMedicalLiteratureService.deleteCorpusSchema(params);

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

        insightsForMedicalLiteratureService.deleteCorpusSchema(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.deleteCorpusSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteCorpusSchemaPromise = insightsForMedicalLiteratureService.deleteCorpusSchema();
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

        const setCorpusConfigResult = insightsForMedicalLiteratureService.setCorpusConfig(params);

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

        insightsForMedicalLiteratureService.setCorpusConfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiteratureService.setCorpusConfig({});
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

        const monitorCorpusResult = insightsForMedicalLiteratureService.monitorCorpus(params);

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

        insightsForMedicalLiteratureService.monitorCorpus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.monitorCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const monitorCorpusPromise = insightsForMedicalLiteratureService.monitorCorpus();
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

        const enableCorpusSearchTrackingResult = insightsForMedicalLiteratureService.enableCorpusSearchTracking(params);

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

        insightsForMedicalLiteratureService.enableCorpusSearchTracking(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiteratureService.enableCorpusSearchTracking({});
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

        const getCorpusConfigResult = insightsForMedicalLiteratureService.getCorpusConfig(params);

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

        insightsForMedicalLiteratureService.getCorpusConfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getCorpusConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getCorpusConfigPromise = insightsForMedicalLiteratureService.getCorpusConfig();
        expectToBePromise(getCorpusConfigPromise);

        getCorpusConfigPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getStatistics', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getStatistics
        const corpus = 'testString';
        const params = {
          corpus: corpus,
        };

        const getStatisticsResult = insightsForMedicalLiteratureService.getStatistics(params);

        // all methods should return a Promise
        expectToBePromise(getStatisticsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/statistics', 'GET');
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

        insightsForMedicalLiteratureService.getStatistics(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getStatistics({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getStatisticsPromise = insightsForMedicalLiteratureService.getStatistics();
        expectToBePromise(getStatisticsPromise);

        getStatisticsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

        const getServiceStatusResult = insightsForMedicalLiteratureService.getServiceStatus(params);

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

        insightsForMedicalLiteratureService.getServiceStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiteratureService.getServiceStatus({});
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

        const getHealthCheckStatusResult = insightsForMedicalLiteratureService.getHealthCheckStatus(params);

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

        insightsForMedicalLiteratureService.getHealthCheckStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        insightsForMedicalLiteratureService.getHealthCheckStatus({});
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

        const searchResult = insightsForMedicalLiteratureService.search(params);

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

        insightsForMedicalLiteratureService.search(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.search({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const searchPromise = insightsForMedicalLiteratureService.search();
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

        const getFieldsResult = insightsForMedicalLiteratureService.getFields(params);

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

        insightsForMedicalLiteratureService.getFields(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getFields({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getFieldsPromise = insightsForMedicalLiteratureService.getFields();
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

        const typeaheadResult = insightsForMedicalLiteratureService.typeahead(params);

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

        insightsForMedicalLiteratureService.typeahead(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.typeahead({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const typeaheadPromise = insightsForMedicalLiteratureService.typeahead();
        expectToBePromise(typeaheadPromise);

        typeaheadPromise.catch(err => {
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

        const getConceptsResult = insightsForMedicalLiteratureService.getConcepts(params);

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

        insightsForMedicalLiteratureService.getConcepts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getConcepts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getConceptsPromise = insightsForMedicalLiteratureService.getConcepts();
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

        const addArtifactResult = insightsForMedicalLiteratureService.addArtifact(params);

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

        insightsForMedicalLiteratureService.addArtifact(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.addArtifact({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addArtifactPromise = insightsForMedicalLiteratureService.addArtifact();
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

        const getCuiInfoResult = insightsForMedicalLiteratureService.getCuiInfo(params);

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

        insightsForMedicalLiteratureService.getCuiInfo(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getCuiInfo({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getCuiInfoPromise = insightsForMedicalLiteratureService.getCuiInfo();
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

        const getHitCountResult = insightsForMedicalLiteratureService.getHitCount(params);

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

        insightsForMedicalLiteratureService.getHitCount(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getHitCount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getHitCountPromise = insightsForMedicalLiteratureService.getHitCount();
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

        const getRelatedConceptsResult = insightsForMedicalLiteratureService.getRelatedConcepts(params);

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

        insightsForMedicalLiteratureService.getRelatedConcepts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getRelatedConcepts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getRelatedConceptsPromise = insightsForMedicalLiteratureService.getRelatedConcepts();
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

        const getSimilarConceptsResult = insightsForMedicalLiteratureService.getSimilarConcepts(params);

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

        insightsForMedicalLiteratureService.getSimilarConcepts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.getSimilarConcepts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSimilarConceptsPromise = insightsForMedicalLiteratureService.getSimilarConcepts();
        expectToBePromise(getSimilarConceptsPromise);

        getSimilarConceptsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('tokenize', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation tokenize
        const corpus = 'testString';
        const flow = 'testString';
        const body = 'testString';
        const ontologies = ['mesh'];
        const maxWords = 38;
        const params = {
          corpus: corpus,
          flow: flow,
          body: body,
          ontologies: ontologies,
          maxWords: maxWords,
        };

        const tokenizeResult = insightsForMedicalLiteratureService.tokenize(params);

        // all methods should return a Promise
        expectToBePromise(tokenizeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/corpora/{corpus}/debug/analyze/{flow}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(body);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['ontologies']).toEqual(ontologies);
        expect(options.qs['max_words']).toEqual(maxWords);
        expect(options.path['corpus']).toEqual(corpus);
        expect(options.path['flow']).toEqual(flow);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const corpus = 'testString';
        const flow = 'testString';
        const body = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          corpus,
          flow,
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        insightsForMedicalLiteratureService.tokenize(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await insightsForMedicalLiteratureService.tokenize({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const tokenizePromise = insightsForMedicalLiteratureService.tokenize();
        expectToBePromise(tokenizePromise);

        tokenizePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
