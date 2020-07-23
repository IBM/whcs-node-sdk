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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, IamAuthenticator } = core;
const propertiesReader = require('properties-reader');
const props = propertiesReader('test/iml.ini');

const InsightsForMedicalLiteratureServiceV1 = require('../../dist/insights-for-medical-literature/v1');
const apikey = props.get('apikey');
const iamUrl = props.get('iam_url');
const serverUrl = props.get('server_url');
const apiVersion = props.get('version');
const corpus = props.get('corpus');
let authenticatorType = new NoAuthAuthenticator();
const disableSsl = true;

if (apikey !== 'undefined' && apikey !== null && apikey.length > 0) {
  const baseOptions = {
    disableSslVerification: false,
    url: iamUrl,
  };

  authenticatorType = new IamAuthenticator(baseOptions);
}

describe('InsightsForMedicalLiteratureServiceV1_integration', () => {
  jest.setTimeout(10000);
  let IML;
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
    IML = new InsightsForMedicalLiteratureServiceV1(service);
    expect(IML).not.toBeNull();
    done();
  });

  test('Get Corpora', async () => {
    const params = {};
    response = await IML.getCorporaConfig(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.corpora).not.toBeNull();
    return;
  });

  test('Get Corpus', async () => {
    const params = {
      corpus: corpus,
    };
    response = await IML.getCorpusConfig(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.corpusName).not.toBeNull();
    expect(result.descriptiveName).not.toBeNull();
    expect(result.ontologies).not.toBeNull();
    return;
  });

  test('Enable Tracking', async () => {
    const params = {
      enaableTracking: true,
    };
    response = await IML.enableCorpusSearchTracking(params);

    return;
  });

  test('Get Documents', async () => {
    const params = {
      corpus: corpus,
    };
    response = await IML.getDocuments(params);

    expect(response.status).toEqual(200);
    return;
  });

  test('Get Document Info', async () => {
    const params = {
      corpus: corpus,
      documentId: '2787890',
    };
    response = await IML.getDocumentInfo(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.metadata).not.toBeNull();
    expect(result.title).not.toBeNull();
    return;
  });

  test('Get Document Annotations', async () => {
    const params = {
      corpus: corpus,
      documentId: '2787890',
      documentSection: 'title',
    };
    response = await IML.getDocumentAnnotations(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.metadata).not.toBeNull();
    expect(result.title).not.toBeNull();
    return;
  });

  test('Get Document Search Matches', async () => {
    const minScore = 0.1;
    const cuis = ['C0031507'];
    const text = ['otoconia'];
    const types = ['PharmacologicSubstance'];
    const limit = 38;
    const searchTagBegin = '<b>';
    const searchTagEnd = '</b>';
    const relatedTagBegin = '<i>';
    const relatedTagEnd = '</i>';
    const fields = 'passages,annotations,highlightedTitle,highlightedAbstract,highlightedBody,highlightedSections';
    const params = {
      corpus: corpus,
      documentId: '2787890',
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

    response = await IML.getSearchMatches(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.annotations).not.toBeNull();
    expect(result.passages).not.toBeNull();
    expect(result.authors).not.toBeNull();
    expect(result.title).not.toBeNull();
    expect(result.documentId).not.toBeNull();
    expect(result.externalId).not.toBeNull();
    expect(result.publicationDate).not.toBeNull();
    expect(result.publicationName).not.toBeNull();
    return;
  });

  test('Get Document Categories', async () => {
    const types = ['OrganicChemical'];
    const limit = 38;
    const highlightTagBegin = '<b>';
    const highlightTagEnd = '</b>';
    const fields = 'passages,annotations,highlightedTitle,highlightedAbstract,highlightedBody,highlightedSections';
    const params = {
      corpus: corpus,
      documentId: '2787890',
      category: 'disorders',
      onlyNegatedConcepts: false,
      types: types,
      limit: limit,
      highlightTagBegin: highlightTagBegin,
      highlightTagEnd: highlightTagEnd,
      fields: fields,
    };

    response = await IML.getDocumentCategories(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.annotations).not.toBeNull();
    expect(result.passages).not.toBeNull();
    expect(result.highlightedTitle).not.toBeNull();
    expect(result.highlightedAbstract).not.toBeNull();
    expect(result.highlightedSections).not.toBeNull();
    expect(result.modelLicense).not.toBeNull();
    return;
  });

  test('Get Document Multiple Categories', async () => {
    const category = {
      'name': 'disorders',
      'category': 'disorders',
    };
    const categories = [category];
    const limit = 38;
    const highlightTagBegin = '<b>';
    const highlightTagEnd = '</b>';
    const fields = 'passages,annotations,highlightedTitle,highlightedAbstract,highlightedBody,highlightedSections';
    const params = {
      corpus: corpus,
      documentId: '2787890',
      categories: categories,
      limit: limit,
      highlightTagBegin: highlightTagBegin,
      highlightTagEnd: highlightTagEnd,
      fields: fields,
    };

    response = await IML.getDocumentCategories(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.annotations).not.toBeNull();
    expect(result.passages).not.toBeNull();
    expect(result.highlightedTitle).not.toBeNull();
    expect(result.highlightedAbstract).not.toBeNull();
    expect(result.highlightedSections).not.toBeNull();
    expect(result.modelLicense).not.toBeNull();
    return;
  });

  test('Get Concepts', async () => {
    const params = {
      corpus: corpus,
      cuis: ['C0018787'],
      preferredNames: ['Sepsis'],
      surfaceForms: ['over eating'],
      attributes: ['medication'],
      verbose: true,
      limit: 50,
    };

    response = await IML.getConcepts(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.concepts).not.toBeNull();
    result.concepts.forEach(element => {
      expect(element.cui).not.toBeNull();
      expect(element.ontology).not.toBeNull();
      expect(element.preferredName).not.toBeNull();
      expect(element.semanticType).not.toBeNull();
      expect(element.hitCount) > 0;
    });
    return;
  });

  test('Get Concept Info', async () => {
    const params = {
      corpus: corpus,
      nameOrId: 'Sepsis',
      ontology: 'concepts',
      treeLayout: false,
    };

    response = await IML.getCuiInfo(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.cui).not.toBeNull();
    expect(result.definition).not.toBeNull();
    expect(result.ontology).not.toBeNull();
    expect(result.preferredName).not.toBeNull();
    expect(result.semanticTypes).not.toBeNull();
    expect(result.surfaceForms).not.toBeNull();
    expect(result.hasParents).toEqual(true);
    expect(result.hasChildren).toEqual(true);
    expect(result.hasSiblings).toEqual(true);
    return;
  });

  test('Get Concept Hit Count', async () => {
    const params = {
      corpus: corpus,
      nameOrId: 'Sepsis',
      ontology: 'concepts',
    };

    response = await IML.getHitCount(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.hitCount) > 0;
    return;
  });

  test('Get Related Concepts', async () => {
    const params = {
      corpus: corpus,
      nameOrId: 'Sepsis',
      ontology: 'concepts',
      relationship: 'children',
      source: ['MSH'],
      recursive: true,
      treeLayout: false,
      maxDepth: 2,
    };

    response = await IML.getRelatedConcepts(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.conceepts).not.toBeNull();
    result.concepts.forEach(element => {
      expect(element.cuik).not.toBeNull();
    });
    return;
  });

  test('Get Similar Concepts', async () => {
    // Construct the params object for operation getSimilarConcepts
    const params = {
      corpus: corpus,
      nameOrId: 'Sepsis',
      ontology: 'concepts',
      returnOntologies: ['concepts'],
      limit: 20,
    };

    response = await IML.getSimilarConcepts(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.conceepts).not.toBeNull();
    result.concepts.forEach(element => {
      expect(element.cui).not.toBeNull();
      expect(element.ontology).not.toBeNull();
      expect(element.preferredName).not.toBeNull();
      expect(element.semanticType).not.toBeNull();
      expect(element.hitCount) > 0;
    });
    return;
  });

  test('Get Fields', async () => {
    const params = {
      corpus: corpus,
    };

    response = await IML.getFields(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.fields).not.toBeNull();
    expect(result.sectionFieldNames).not.toBeNull();
    expect(result.attrSectionFieldNames).not.toBeNull();
    expect(result.qualifierSectionFieldNames).not.toBeNull();
    expect(result.meshSectionFieldNames).not.toBeNull();
    expect(result.fieldIndexMap).not.toBeNull();
    return;
  });

  test('Typeahead', async () => {
    const params = {
      corpus: corpus,
      query: 'Seps',
      ontologies: ['concepts'],
      category: 'disorders',
      verbose: true,
      limit: 20,
      maxHitCount: 500000,
      noDuplicates: true,
    };

    response = await IML.typeahead(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.conceepts).not.toBeNull();
    result.concepts.forEach(element => {
      expect(element.cui).not.toBeNull();
      expect(element.ontology).not.toBeNull();
      expect(element.preferredName).not.toBeNull();
      expect(element.semanticType).not.toBeNull();
      expect(element.hitCount) > 0;
    });
    return;
  });

  test('Search', async () => {
    // Construct the params object for operation search
    const concept = {
      'ontology': 'concepts',
      'cui': 'C0024117',
      'rank': '10',
    };
    const concepts = [concept];
    const query = {
      concepts: concepts,
    };
    const documents = {
      'limit': '10',
      'offset': 0,
    };
    const returns = {
      documents: documents,
    };
    const body = {
      query: query,
      returns: returns,
    };
    const params = {
      corpus: corpus,
      body: body,
    };

    response = await IML.search(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.pageNumber) > 0;
    expect(result.totalDocumentCount) > 0;
    expect(result.documents).not.toBeNull();
    result.documents.forEach(element => {
      expect(element.documentId).not.toBeNull();
      expect(element.corpus).not.toBeNull();
      expect(element.links).not.toBeNull();
      expect(element.metadata).not.toBeNull();
    });
    return;
  });

  test('Search - types', async () => {
    // Construct the params object for operation search
    const types = {
      'ontology': 'concepts',
    };
    const returns = {
      types: types,
    };
    const body = {
      returns: returns,
    };
    const params = {
      corpus: corpus,
      body: body,
    };

    response = await IML.search(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.types).not.toBeNull();
    return;
  });

  test('Search - concepts', async () => {
    const concepts = {
      'limit': '10',
      'types': ['SignOrSymptom'],
      'mode': 'popular',
    };
    const returns = {
      concepts: concepts,
    };
    const body = {
      returns: returns,
    };
    const params = {
      corpus: corpus,
      body: body,
    };

    response = await IML.search(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.concepts).not.toBeNull();
    result.concepts.forEach(element => {
      expect(element.count) > 0;
      expect(element.cui).not.toBeNull();
      expect(element.hitCount) > 0;
      expect(element.ontology).not.toBeNull();
      expect(element.preferredName).not.toBeNull();
      expect(element.semanticType).not.toBeNull();
    });
    return;
  });

  test('Search - attributes', async () => {
    const attributes = {};
    const returns = {
      attributes: attributes,
    };
    const body = {
      returns: returns,
    };
    const params = {
      corpus: corpus,
      body: body,
    };

    response = await IML.search(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.attributes).not.toBeNull();
    result.attributes.forEach(element => {
      expect(element.count) > 0;
      expect(element.attributeId).not.toBeNull();
      expect(element.displayName).not.toBeNull();
    });
    return;
  });

  test('Search - aggregations', async () => {
    const authors = {
      'limit': '100',
    };
    const aggregations = {
      'authors': authors,
    };
    const returns = {
      aggregations: aggregations,
    };
    const body = {
      returns: returns,
    };
    const params = {
      corpus: corpus,
      body: body,
    };

    response = await IML.search(params);

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.aggregations).not.toBeNull();
    return;
  });

  test('Health Check', async () => {
    response = await IML.getHealthCheckStatus();

    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result.serviceState).toEqual('OK');
    return;
  });
});
