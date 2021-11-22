/**
 * (C) Copyright IBM Corp. 2021.
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

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  getMissingParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Natural Language Processing (NLP) service featuring a set of medical domain annotators for use in detecting entities
 * and medical concepts from unstructured data. Multiple annotators may be invoked from a single request.
 */

class AnnotatorForClinicalDataV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string =
    'https://annotator-for-clinical-data.cloud.ibm.com/services/clinical_data_annotator/api';

  static DEFAULT_SERVICE_NAME: string = 'annotator_for_clinical_data';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of AnnotatorForClinicalDataV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {AnnotatorForClinicalDataV1}
   */

  public static newInstance(options: UserOptions): AnnotatorForClinicalDataV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new AnnotatorForClinicalDataV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** The release date of the version of the API you want to use. Specify dates in YYYY-MM-DD format. */
  version: string;

  /**
   * Construct a AnnotatorForClinicalDataV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The release date of the version of the API you want to use. Specify dates in
   * YYYY-MM-DD format.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/services/clinical_data_annotator/api'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {AnnotatorForClinicalDataV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['version'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(AnnotatorForClinicalDataV1.DEFAULT_SERVICE_URL);
    }
    this.version = options.version;
  }

  /*************************
   * profiles
   ************************/

  /**
   * Get list of available persisted profiles.
   *
   * Returns a summary including ID and description of the available persisted profiles.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.ListStringWrapper>>}
   */
  public getProfiles(
    params?: AnnotatorForClinicalDataV1.GetProfilesParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.ListStringWrapper>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'version': this.version,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'getProfiles'
      );

      const parameters = {
        options: {
          url: '/v1/profiles',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Persist a new profile.
   *
   * This API persists a new profile.  A profile is identified by an ID.  This ID can optionally be specified as part of
   * the request body when invoking <b>POST /v1/analyze</b> API.  A profile contains annotator configuration information
   * that will be applied to the annotators specified in the annotator flow.<p>If a caller would choose to have the ID
   * of the new profile generated on their behalf, then in the request body the "id" field of the profile definition
   * should be an empty string ("").  The auto-generated ID would be a normalized form of the "name" field from the
   * profile definition.<p><b>Sample Profile #1</b><br>A profile definition that configures the 'concept_detection'
   * annotator to use the UMLS umls.latest library.<br><pre>{<br>  "id": "acd_profile_cd_umls_latest",<br>  "name":
   * "Profile for the latest Concept Detection UMLS Library",<br>  "description": "Provides configurations for running
   * Concept Detection with the latest UMLS library",<br>  "annotators": [<br>    {<br>      "name":
   * "concept_detection",<br>      "parameters": {<br>         "libraries": ["umls.latest"]<br>       }<br>    }<br>
   * ]<br>}</pre><p><b>Sample Profile #2</b><br>A profile definition that configures the 'concept_detection' annotator
   * to exclude any annotations where the semantic type does not equal 'neop'.<br><pre>{<br>  "id":
   * "acd_profile_cd_neop_only",<br>  "name": "Profile for Concept Detection neop Semantic Type",<br>  "description":
   * "Concept Detection configuration fitler to exclude annotations where semantic type does not equal 'neop'.",<br>
   * "annotators": [<br>    {<br>       "name": "concept_detection",<br>       "configurations": [<br>         {<br>
   *       "filter": {<br>             "target": "unstructured.data.concepts",<br>             "condition": {<br>
   *         "type": "match",<br>                "field": "semanticType",<br>                "values": [<br>
   *       "neop"<br>                 ],<br>                "not": false,<br>                "caseInsensitive":
   * false,<br>                "operator": "equals"<br>              }<br>            }<br>         }<br>       ]<br>
   * }<br>  ]<br>}</pre>.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.newId] -
   * @param {string} [params.newName] -
   * @param {string} [params.newDescription] -
   * @param {string} [params.newPublishedDate] -
   * @param {boolean} [params.newPublish] -
   * @param {string} [params.newVersion] -
   * @param {string} [params.newCartridgeId] -
   * @param {Annotator[]} [params.newAnnotators] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public createProfile(
    params?: AnnotatorForClinicalDataV1.CreateProfileParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const body = {
        'id': _params.newId,
        'name': _params.newName,
        'description': _params.newDescription,
        'publishedDate': _params.newPublishedDate,
        'publish': _params.newPublish,
        'version': _params.newVersion,
        'cartridgeId': _params.newCartridgeId,
        'annotators': _params.newAnnotators,
      };

      const query = {
        'version': this.version,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'createProfile'
      );

      const parameters = {
        options: {
          url: '/v1/profiles',
          method: 'POST',
          body,
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Content-Type': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Get details of a specific profile.
   *
   * Using the specified profile ID, retrieves the profile definition.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Profile ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.AcdProfile>>}
   */
  public getProfile(
    params: AnnotatorForClinicalDataV1.GetProfileParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.AcdProfile>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const query = {
        'version': this.version,
      };

      const path = {
        'id': _params.id,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'getProfile'
      );

      const parameters = {
        options: {
          url: '/v1/profiles/{id}',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Update a persisted profile definition.
   *
   * Using the specified Profile ID, updates the profile definition.  This is a complete replacement of the existing
   * profile definition using the JSON object provided in the request body.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Profile ID.
   * @param {string} [params.newId] -
   * @param {string} [params.newName] -
   * @param {string} [params.newDescription] -
   * @param {string} [params.newPublishedDate] -
   * @param {boolean} [params.newPublish] -
   * @param {string} [params.newVersion] -
   * @param {string} [params.newCartridgeId] -
   * @param {Annotator[]} [params.newAnnotators] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public updateProfile(
    params: AnnotatorForClinicalDataV1.UpdateProfileParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = {
        'id': _params.newId,
        'name': _params.newName,
        'description': _params.newDescription,
        'publishedDate': _params.newPublishedDate,
        'publish': _params.newPublish,
        'version': _params.newVersion,
        'cartridgeId': _params.newCartridgeId,
        'annotators': _params.newAnnotators,
      };

      const query = {
        'version': this.version,
      };

      const path = {
        'id': _params.id,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'updateProfile'
      );

      const parameters = {
        options: {
          url: '/v1/profiles/{id}',
          method: 'PUT',
          body,
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Content-Type': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Delete a persisted profile.
   *
   * Using the specified profile ID, deletes the profile from the list of persisted profiles.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Profile ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public deleteProfile(
    params: AnnotatorForClinicalDataV1.DeleteProfileParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const query = {
        'version': this.version,
      };

      const path = {
        'id': _params.id,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'deleteProfile'
      );

      const parameters = {
        options: {
          url: '/v1/profiles/{id}',
          method: 'DELETE',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {}, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /*************************
   * flows
   ************************/

  /**
   * Get list of available persisted flows.
   *
   * Returns a summary including ID and description of the available persisted flows.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.ListStringWrapper>>}
   */
  public getFlows(
    params?: AnnotatorForClinicalDataV1.GetFlowsParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.ListStringWrapper>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'version': this.version,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'getFlows'
      );

      const parameters = {
        options: {
          url: '/v1/flows',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Persist a new flow definition.
   *
   * This API persists a new flow.  A flow is identified by an ID.  This ID can optionally be specified as part of the
   * request body when invoking <b>POST /v1/analyze</b> API.  A flow definition contains a list one or more annotators,
   * and optionally can include annotator configuration, a flow ID, and/or flow sequence.<p>If a caller would choose to
   * have the ID of the new flow generated on their behalf, then in the request body the "id" field of the flow
   * definition should be an empty string ("").  The auto-generated ID would be a normalized form of the "name" field
   * from the flow definition.<p><p><b>Sample Flow #1</b><br>A flow definition that includes two
   * annotators.<br><pre>{<br>  "id": "flow_simple",<br>  "name": "flow simple",<br>  "description": "A simple flow with
   * two annotators",<br>  "annotatorFlows": [<br>      {<br>       "flow": {<br>          "elements": [<br>
   * {<br>               "annotator": {<br>                   "name": "concept_detection"<br>                }<br>
   *       },<br>             {<br>               "annotator": {<br>                   "name": "symptom_disease"<br>
   *            }<br>             }<br>           ],<br>       "async": false<br>        }<br>      }<br>
   * ]<br>}</pre><p><b>Sample Flow #2</b><br>A flow definition that includes the 'concept_detection' annotator and
   * configuration details for the 'concept_detection' annotator.<br><pre>{<br>  "id":
   * "flow_concept_detection_exclude_non_neop",<br>  "name": "flow concept detection exclude non neop",<br>
   * "description": "A flow excluding detected concepts that do not have 'neop' semantic type",<br>  "annotatorFlows":
   * [<br>      {<br>       "flow": {<br>          "elements": [<br>             {<br>               "annotator": {<br>
   *                  "name": "concept_detection",<br>                   "configurations": [<br>
   * {<br>                        "filter": {<br>                           "target": "unstructured.data.concepts",<br>
   *                          "condition": {<br>                              "type": "match",<br>
   *        "field": "semanticType",<br>                              "values": [<br>
   * "neop"<br>                                ],<br>                              "not": false,<br>
   *          "caseInsensitive": false,<br>                              "operator": "equals"<br>
   *     }<br>                         }<br>                      }<br>                    ]<br>                 }<br>
   *            }<br>         ],<br>       "async": false<br>        }<br>      }<br>   ]<br>}</pre>.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.newId] -
   * @param {string} [params.newName] -
   * @param {string} [params.newDescription] -
   * @param {string} [params.newPublishedDate] -
   * @param {boolean} [params.newPublish] -
   * @param {string} [params.newVersion] -
   * @param {string} [params.newCartridgeId] -
   * @param {AnnotatorFlow[]} [params.newAnnotatorFlows] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public createFlows(
    params?: AnnotatorForClinicalDataV1.CreateFlowsParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const body = {
        'id': _params.newId,
        'name': _params.newName,
        'description': _params.newDescription,
        'publishedDate': _params.newPublishedDate,
        'publish': _params.newPublish,
        'version': _params.newVersion,
        'cartridgeId': _params.newCartridgeId,
        'annotatorFlows': _params.newAnnotatorFlows,
      };

      const query = {
        'version': this.version,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'createFlows'
      );

      const parameters = {
        options: {
          url: '/v1/flows',
          method: 'POST',
          body,
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Content-Type': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Get details of a specific flow.
   *
   * Using the specified Flow ID, retrieves the flow definition.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Flow ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.AcdFlow>>}
   */
  public getFlowsById(
    params: AnnotatorForClinicalDataV1.GetFlowsByIdParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.AcdFlow>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const query = {
        'version': this.version,
      };

      const path = {
        'id': _params.id,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'getFlowsById'
      );

      const parameters = {
        options: {
          url: '/v1/flows/{id}',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Update a persisted flow definition.
   *
   * Using the specified Flow ID, updates the persisted flow definition.  This is a complete replacement of the existing
   * flow definition using the JSON object provided in the request body.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Flow ID.
   * @param {string} [params.newId] -
   * @param {string} [params.newName] -
   * @param {string} [params.newDescription] -
   * @param {string} [params.newPublishedDate] -
   * @param {boolean} [params.newPublish] -
   * @param {string} [params.newVersion] -
   * @param {string} [params.newCartridgeId] -
   * @param {AnnotatorFlow[]} [params.newAnnotatorFlows] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public updateFlows(
    params: AnnotatorForClinicalDataV1.UpdateFlowsParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = {
        'id': _params.newId,
        'name': _params.newName,
        'description': _params.newDescription,
        'publishedDate': _params.newPublishedDate,
        'publish': _params.newPublish,
        'version': _params.newVersion,
        'cartridgeId': _params.newCartridgeId,
        'annotatorFlows': _params.newAnnotatorFlows,
      };

      const query = {
        'version': this.version,
      };

      const path = {
        'id': _params.id,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'updateFlows'
      );

      const parameters = {
        options: {
          url: '/v1/flows/{id}',
          method: 'PUT',
          body,
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Content-Type': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Delete a persisted flow.
   *
   * Using the specified Flow ID, deletes the flow from the list of persisted flows.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Flow ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public deleteFlows(
    params: AnnotatorForClinicalDataV1.DeleteFlowsParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const query = {
        'version': this.version,
      };

      const path = {
        'id': _params.id,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'deleteFlows'
      );

      const parameters = {
        options: {
          url: '/v1/flows/{id}',
          method: 'DELETE',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {}, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /*************************
   * aCD
   ************************/

  /**
   * Detect entities & relations from unstructured data.
   *
   * <p>This API accepts a JSON request model featuring both the unstructured data to be analyzed as well as the desired
   * annotator flow.<p/><p><b>Annotator Chaining</b><br/>Sample request invoking both the concept_detection and
   * symptom_disease annotators asynchronously. This sample request references configurations via a profile id. Profiles
   * define configurations that can be referenced within a request. Profile is optional. A default profile is used if no
   * profile id is available in the annotator flow. The default profile contains the parameters for the concept
   * detection and the attribute detection. An empty profile can be used if absolutely no parameters are attached to any
   * annotators. See <a href=".." target="_blank">documentation</a> for more information. </p><pre>{<br/>
   * "annotatorFlows": [<br/>    {<br/>      "profile" : "default_profile_v1.0", <br/>      "flow": {<br/>
   * "elements": [<br/>          {<br/>            "annotator": {<br/>              "name": "concept_detection"<br/>
   *        }<br/>          },<br/>          {<br/>            "annotator": {<br/>              "name":
   * "symptom_disease"<br/>             }<br/>          }<br/>        ],<br/>        "async": false<br/>      }<br/>
   * }<br/>  ],<br/>  "unstructured": [<br/>    {<br/>      "text": "Patient has lung cancer, but did not smoke. She may
   * consider chemotherapy as part of a treatment plan."<br/>    }<br/>  ]<br/>}<br/></pre><p><b>Annotation
   * Filtering</b><br/>Sample request invoking concept_detection with a filter defined to exclude any annotations
   * detected from concept_detection where the semanticType field does not equal "neop".</p><pre>{<br/>
   * "annotatorFlows": [<br/>    {<br/>      "flow": {<br/>        "elements": [<br/>          {<br/>
   * "annotator": {<br/>              "name": "concept_detection",<br/>              "configurations": [<br/>
   *     {<br/>                  "filter": {<br/>                     "target": "unstructured.data.concepts",<br/>
   *               "condition": {<br/>                        "type": "match",<br/>                        "field":
   * "semanticType",<br/>                        "values": [<br/>                           "neop"<br/>
   *        ],<br/>                        "not": false,<br/>                        "caseInsensitive": false,<br/>
   *                   "operator": "equals"<br/>                     }<br/>                  }<br/>
   * }<br/>              ]<br/>            }<br/>          }<br/>        ],<br/>       "async": false<br/>      }<br/>
   *  }<br/>  ],<br/>  "unstructured": [<br/>    {<br/>      "text": "Patient has lung cancer, but did not smoke. She
   * may consider chemotherapy as part of a treatment plan."<br/>    }<br/>  ]<br/>}<br/></pre><p><b>Annotators that
   * support annotation filtering:</b> allergy, bathing_assistance, cancer, concept_detection, dressing_assistance,
   * eating_assistance, ejection_fraction, lab_value, medication, named_entities, procedure, seeing_assistance, smoking,
   * symptom_disease, toileting_assistance, walking_assistance.</p><hr/><p><b>Annotation Augmentation</b><br/>Sample
   * request invoking the cancer annotator and providing a whitelist entry for a new custom surface form:
   * "lungcancer".</p><pre>{<br/> "annotatorFlows": [<br/>    {<br/>     "flow": {<br/>       "elements": [<br/>
   *  {<br/>           "annotator": {<br/>             "name": "cancer",<br/>             "configurations": [<br/>
   *          {<br/>                 "whitelist": {<br/>                   "name": "cancer",<br/>
   * "entries": [<br/>                      {<br/>                  "surfaceForms": [<br/>
   * "lungcancer"<br/>                ],<br/>               "features": {<br/>                   "normalizedName": "lung
   * cancer",<br/>                   "hccCode": "9",<br/>                   "icd10Code": "C34.9",<br/>
   * "ccsCode": "19",<br/>                   "icd9Code": "162.9",<br/>                   "conceptId": "93880001"<br/>
   *             }<br/>                      }<br/>                    ]<br/>                  }<br/>
   * }<br/>              ]<br/>            }<br/>          }<br/>        ],<br/>       "async": false<br/>      }<br/>
   *  }<br/>  ],<br/> "unstructured": [<br/>    {<br/>     "text": "The patient was diagnosed with lungcancer, on Dec
   * 23, 2011."<br/>    }<br/>  ]<br/>}<br/></pre><b>Annotators that support annotation augmentation:</b> allergy,
   * bathing_assistance, cancer, dressing_assistance, eating_assistance, ejection_fraction, lab_value, medication,
   * named_entities, procedure, seeing_assistance, smoking, symptom_disease, toileting_assistance,
   * walking_assistance.<br/>.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {UnstructuredContainer[]} [params.unstructured] -
   * @param {AnnotatorFlow[]} [params.annotatorFlows] -
   * @param {boolean} [params.debugTextRestore] - If true, any ReplaceTextChange annotations will be left in the
   * container and the modified text before restoring to original form will stored in the metadata that is returned.
   * Otherwise, these annotations and modified text will be removed from the container.
   * @param {boolean} [params.returnAnalyzedText] - Set this to true to show the analyzed text in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public runPipeline(
    params?: AnnotatorForClinicalDataV1.RunPipelineParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const body = {
        'unstructured': _params.unstructured,
        'annotatorFlows': _params.annotatorFlows,
      };

      const query = {
        'version': this.version,
        'debug_text_restore': _params.debugTextRestore,
        'return_analyzed_text': _params.returnAnalyzedText,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'runPipeline'
      );

      const parameters = {
        options: {
          url: '/v1/analyze',
          method: 'POST',
          body,
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Content-Type': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * analyze with a pre-specified flow.
   *
   * <p>This API accepts a flow identifier as well as a <emph>TEXT</emph> or a <emph>JSON</emph> request model featuring
   * the unstructured text to be analyzed. <p/><p><b>JSON request model with unstructured text </b></p><pre>{<br/>
   * "unstructured": [<br/>    {<br/>      "text": "Patient has lung cancer, but did not smoke. She may consider
   * chemotherapy as part of a treatment plan."<br/>    }<br/>  ]<br/>}<br/></pre><p><b>JSON request model with existing
   * annotations </b><br/></p><pre>{<br> "unstructured": [<br>    {<br>      "text": "Patient will not start on
   * cisplatin 80mg on 1/1/2018. Patient is also diabetic.",<br>      "data": {<br>        "concepts": [<br>
   * {<br>            "cui": "C0030705",<br>            "preferredName": "Patients",<br>            "semanticType":
   * "podg",<br>            "source": "umls",<br>            "sourceVersion": "2017AA",<br>            "type":
   * "umls.PatientOrDisabledGroup",<br>            "begin": 0,<br>            "end": 7,<br>            "coveredText":
   * "Patient"<br>          }<br> ]<br>      }  <br>    } <br> ]<br>}<br></pre>.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.flowId - flow identifier .
   * @param {boolean} params.returnAnalyzedText - Set this to true to show the analyzed text in the response.
   * @param {AnalyticFlowBeanInput|string} params.analyticFlowBeanInput - Input request data in TEXT or JSON format .
   * @param {string} [params.contentType] - The type of the input. A character encoding can be specified by including a
   * `charset` parameter. For example, 'text/plain;charset=utf-8'.
   * @param {boolean} [params.debugTextRestore] - If true, any ReplaceTextChange annotations will be left in the
   * container and the modified text before restoring to original form will be returned in the metadata.  Otherwise,
   * these annotations and modified text will be removed from the container.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public runPipelineWithFlow(
    params: AnnotatorForClinicalDataV1.RunPipelineWithFlowParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);
    const requiredParams = ['flowId', 'returnAnalyzedText', 'analyticFlowBeanInput'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const body = _params.analyticFlowBeanInput;
      const query = {
        'version': this.version,
        'return_analyzed_text': _params.returnAnalyzedText,
        'debug_text_restore': _params.debugTextRestore,
      };

      const path = {
        'flow_id': _params.flowId,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'runPipelineWithFlow'
      );

      const parameters = {
        options: {
          url: '/v1/analyze/{flow_id}',
          method: 'POST',
          body,
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Content-Type': _params.contentType,
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Get list of available annotators.
   *
   * Get list of available annotators that can be leveraged to detect information from unstructured data. One or more
   * annnotators can be leveraged within a single request to the service.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public getAnnotators(
    params?: AnnotatorForClinicalDataV1.GetAnnotatorsParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'version': this.version,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'getAnnotators'
      );

      const parameters = {
        options: {
          url: '/v1/annotators',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {}, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Get details of a specific annotator.
   *
   * Get details of an annotator that can be used to detect information from unstructured data.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID the Service API was registered under.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public getAnnotatorsById(
    params: AnnotatorForClinicalDataV1.GetAnnotatorsByIdParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const query = {
        'version': this.version,
      };

      const path = {
        'id': _params.id,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'getAnnotatorsById'
      );

      const parameters = {
        options: {
          url: '/v1/annotators/{id}',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {}, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Delete tenant specific artifacts.
   *
   * Delete tenant specific artifacts.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>>}
   */
  public deleteUserSpecificArtifacts(
    params?: AnnotatorForClinicalDataV1.DeleteUserSpecificArtifactsParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.Empty>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'version': this.version,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'deleteUserSpecificArtifacts'
      );

      const parameters = {
        options: {
          url: '/v1/user_data',
          method: 'DELETE',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {}, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /*************************
   * cartridges
   ************************/

  /**
   * Get list of available deployment status.
   *
   * Returns a summary including ID and status of the available deployments.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.ListStringWrapper>>}
   */
  public cartridgesGet(
    params?: AnnotatorForClinicalDataV1.CartridgesGetParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.ListStringWrapper>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'version': this.version,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'cartridgesGet'
      );

      const parameters = {
        options: {
          url: '/v1/cartridges',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Create a cartridge deployment.
   *
   * Create a cartridge deployment from a cartridge archive file.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|Buffer} [params.archiveFile] - Cartridge archive file.
   * @param {string} [params.archiveFileContentType] - The content type of archiveFile.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.DeployCartridgeResponse>>}
   */
  public cartridgesPostMultipart(
    params?: AnnotatorForClinicalDataV1.CartridgesPostMultipartParams
  ): Promise<
    AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.DeployCartridgeResponse>
  > {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const formData = {
        'archive_file': {
          data: _params.archiveFile,
          contentType: _params.archiveFileContentType,
        },
      };

      const query = {
        'version': this.version,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'cartridgesPostMultipart'
      );

      const parameters = {
        options: {
          url: '/v1/cartridges',
          method: 'POST',
          qs: query,
          formData,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Create a cartridge deployment.
   *
   * Update a cartridge deployment from a cartridge archive file.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|Buffer} [params.archiveFile] - Cartridge archive file.
   * @param {string} [params.archiveFileContentType] - The content type of archiveFile.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.DeployCartridgeResponse>>}
   */
  public cartridgesPutMultipart(
    params?: AnnotatorForClinicalDataV1.CartridgesPutMultipartParams
  ): Promise<
    AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.DeployCartridgeResponse>
  > {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const formData = {
        'archive_file': {
          data: _params.archiveFile,
          contentType: _params.archiveFileContentType,
        },
      };

      const query = {
        'version': this.version,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'cartridgesPutMultipart'
      );

      const parameters = {
        options: {
          url: '/v1/cartridges',
          method: 'PUT',
          qs: query,
          formData,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Get details of a specific deployment.
   *
   * Using the specified Catridge ID, retrieves the deployment status.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Cartridge ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.AcdCartridges>>}
   */
  public cartridgesGetId(
    params: AnnotatorForClinicalDataV1.CartridgesGetIdParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.AcdCartridges>> {
    const _params = extend({}, params);
    const requiredParams = ['id'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        return reject(missingParams);
      }

      const query = {
        'version': this.version,
      };

      const path = {
        'id': _params.id,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'cartridgesGetId'
      );

      const parameters = {
        options: {
          url: '/v1/cartridges/{id}',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': 'application/json',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Deploy a cartridge.
   *
   * Deploy a cartridge from a cartridge archive file.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|Buffer} [params.archiveFile] - Cartridge archive file.
   * @param {string} [params.archiveFileContentType] - The content type of archiveFile.
   * @param {boolean} [params.update] - Update resources if they already exist.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.DeployCartridgeResponse>>}
   */
  public deployCartridge(
    params?: AnnotatorForClinicalDataV1.DeployCartridgeParams
  ): Promise<
    AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.DeployCartridgeResponse>
  > {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const formData = {
        'archive_file': {
          data: _params.archiveFile,
          contentType: _params.archiveFileContentType,
        },
      };

      const query = {
        'version': this.version,
        'update': _params.update,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'deployCartridge'
      );

      const parameters = {
        options: {
          url: '/v1/deploy',
          method: 'POST',
          qs: query,
          formData,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /*************************
   * status
   ************************/

  /**
   * Get status of service.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accept] - The type of the response: application/json or application/xml.
   * @param {string} [params.format] - Override response format.
   * @param {string} [params.livenessCheck] - Perform a shallow liveness check.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.ServiceStatus>>}
   */
  public getServiceStatus(
    params?: AnnotatorForClinicalDataV1.GetServiceStatusParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.ServiceStatus>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'format': _params.format,
        'liveness_check': _params.livenessCheck,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'getServiceStatus'
      );

      const parameters = {
        options: {
          url: '/v1/status',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': _params.accept,
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }

  /**
   * Determine if service is running correctly.
   *
   * This resource differs from /status in that it will will always return a 500 error if the service state is not OK.
   * This makes it simpler for service front ends (such as Datapower) to detect a failed service.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accept] - The type of the response: application/json or application/xml.
   * @param {string} [params.format] - Override response format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.ServiceStatus>>}
   */
  public getHealthCheckStatus(
    params?: AnnotatorForClinicalDataV1.GetHealthCheckStatusParams
  ): Promise<AnnotatorForClinicalDataV1.Response<AnnotatorForClinicalDataV1.ServiceStatus>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const query = {
        'format': _params.format,
      };

      const sdkHeaders = getSdkHeaders(
        AnnotatorForClinicalDataV1.DEFAULT_SERVICE_NAME,
        'v1',
        'getHealthCheckStatus'
      );

      const parameters = {
        options: {
          url: '/v1/status/health_check',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(
            true,
            sdkHeaders,
            {
              'Accept': _params.accept,
            },
            _params.headers
          ),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  }
}

/*************************
 * interfaces
 ************************/

namespace AnnotatorForClinicalDataV1 {
  /** Options for the `AnnotatorForClinicalDataV1` constructor. */
  export interface Options extends UserOptions {
    /** The release date of the version of the API you want to use. Specify dates in YYYY-MM-DD format. */
    version: string;
  }

  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getProfiles` operation. */
  export interface GetProfilesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProfile` operation. */
  export interface CreateProfileParams {
    newId?: string;
    newName?: string;
    newDescription?: string;
    newPublishedDate?: string;
    newPublish?: boolean;
    newVersion?: string;
    newCartridgeId?: string;
    newAnnotators?: Annotator[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProfile` operation. */
  export interface GetProfileParams {
    /** Profile ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProfile` operation. */
  export interface UpdateProfileParams {
    /** Profile ID. */
    id: string;
    newId?: string;
    newName?: string;
    newDescription?: string;
    newPublishedDate?: string;
    newPublish?: boolean;
    newVersion?: string;
    newCartridgeId?: string;
    newAnnotators?: Annotator[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProfile` operation. */
  export interface DeleteProfileParams {
    /** Profile ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getFlows` operation. */
  export interface GetFlowsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createFlows` operation. */
  export interface CreateFlowsParams {
    newId?: string;
    newName?: string;
    newDescription?: string;
    newPublishedDate?: string;
    newPublish?: boolean;
    newVersion?: string;
    newCartridgeId?: string;
    newAnnotatorFlows?: AnnotatorFlow[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getFlowsById` operation. */
  export interface GetFlowsByIdParams {
    /** Flow ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateFlows` operation. */
  export interface UpdateFlowsParams {
    /** Flow ID. */
    id: string;
    newId?: string;
    newName?: string;
    newDescription?: string;
    newPublishedDate?: string;
    newPublish?: boolean;
    newVersion?: string;
    newCartridgeId?: string;
    newAnnotatorFlows?: AnnotatorFlow[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteFlows` operation. */
  export interface DeleteFlowsParams {
    /** Flow ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `runPipeline` operation. */
  export interface RunPipelineParams {
    unstructured?: UnstructuredContainer[];
    annotatorFlows?: AnnotatorFlow[];
    /** If true, any ReplaceTextChange annotations will be left in the container and the modified text before
     *  restoring to original form will stored in the metadata that is returned.  Otherwise, these annotations and
     *  modified text will be removed from the container.
     */
    debugTextRestore?: boolean;
    /** Set this to true to show the analyzed text in the response. */
    returnAnalyzedText?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `runPipelineWithFlow` operation. */
  export interface RunPipelineWithFlowParams {
    /** flow identifier . */
    flowId: string;
    /** Set this to true to show the analyzed text in the response. */
    returnAnalyzedText: boolean;
    /** Input request data in TEXT or JSON format . */
    analyticFlowBeanInput: AnalyticFlowBeanInput | string;
    /** The type of the input. A character encoding can be specified by including a `charset` parameter. For
     *  example, 'text/plain;charset=utf-8'.
     */
    contentType?: RunPipelineWithFlowConstants.ContentType | string;
    /** If true, any ReplaceTextChange annotations will be left in the container and the modified text before
     *  restoring to original form will be returned in the metadata.  Otherwise, these annotations and modified text
     *  will be removed from the container.
     */
    debugTextRestore?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `runPipelineWithFlow` operation. */
  export namespace RunPipelineWithFlowConstants {
    /** The type of the input. A character encoding can be specified by including a `charset` parameter. For example, 'text/plain;charset=utf-8'. */
    export enum ContentType {
      APPLICATION_JSON = 'application/json',
      TEXT_PLAIN = 'text/plain',
    }
  }

  /** Parameters for the `getAnnotators` operation. */
  export interface GetAnnotatorsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAnnotatorsById` operation. */
  export interface GetAnnotatorsByIdParams {
    /** The ID the Service API was registered under. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteUserSpecificArtifacts` operation. */
  export interface DeleteUserSpecificArtifactsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `cartridgesGet` operation. */
  export interface CartridgesGetParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `cartridgesPostMultipart` operation. */
  export interface CartridgesPostMultipartParams {
    /** Cartridge archive file. */
    archiveFile?: NodeJS.ReadableStream | Buffer;
    /** The content type of archiveFile. */
    archiveFileContentType?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `cartridgesPutMultipart` operation. */
  export interface CartridgesPutMultipartParams {
    /** Cartridge archive file. */
    archiveFile?: NodeJS.ReadableStream | Buffer;
    /** The content type of archiveFile. */
    archiveFileContentType?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `cartridgesGetId` operation. */
  export interface CartridgesGetIdParams {
    /** Cartridge ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deployCartridge` operation. */
  export interface DeployCartridgeParams {
    /** Cartridge archive file. */
    archiveFile?: NodeJS.ReadableStream | Buffer;
    /** The content type of archiveFile. */
    archiveFileContentType?: string;
    /** Update resources if they already exist. */
    update?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getServiceStatus` operation. */
  export interface GetServiceStatusParams {
    /** The type of the response: application/json or application/xml. */
    accept?: GetServiceStatusConstants.Accept | string;
    /** Override response format. */
    format?: GetServiceStatusConstants.Format | string;
    /** Perform a shallow liveness check. */
    livenessCheck?: GetServiceStatusConstants.LivenessCheck | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getServiceStatus` operation. */
  export namespace GetServiceStatusConstants {
    /** The type of the response: application/json or application/xml. */
    export enum Accept {
      APPLICATION_JSON = 'application/json',
      APPLICATION_XML = 'application/xml',
    }
    /** Override response format. */
    export enum Format {
      JSON = 'json',
      XML = 'xml',
    }
    /** Perform a shallow liveness check. */
    export enum LivenessCheck {
      TRUE = 'true',
      FALSE = 'false',
    }
  }

  /** Parameters for the `getHealthCheckStatus` operation. */
  export interface GetHealthCheckStatusParams {
    /** The type of the response: application/json or application/xml. */
    accept?: GetHealthCheckStatusConstants.Accept | string;
    /** Override response format. */
    format?: GetHealthCheckStatusConstants.Format | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getHealthCheckStatus` operation. */
  export namespace GetHealthCheckStatusConstants {
    /** The type of the response: application/json or application/xml. */
    export enum Accept {
      APPLICATION_JSON = 'application/json',
      APPLICATION_XML = 'application/xml',
    }
    /** Override response format. */
    export enum Format {
      JSON = 'json',
      XML = 'xml',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** AcdCartridges. */
  export interface AcdCartridges {
    id?: string;
    name?: string;
    status?: string;
    statusCode?: number;
    statusLocation?: string;
    startTime?: string;
    endTime?: string;
    duration?: string;
    correlationId?: string;
    artifactResponseCode?: number;
    artifactResponse?: ServiceError[];
  }

  /** AcdFlow. */
  export interface AcdFlow {
    id?: string;
    name?: string;
    description?: string;
    publishedDate?: string;
    publish?: boolean;
    version?: string;
    cartridgeId?: string;
    annotatorFlows?: AnnotatorFlow[];
  }

  /** AcdProfile. */
  export interface AcdProfile {
    id?: string;
    name?: string;
    description?: string;
    publishedDate?: string;
    publish?: boolean;
    version?: string;
    cartridgeId?: string;
    annotators?: Annotator[];
  }

  /** AnalyticFlowBeanInput. */
  export interface AnalyticFlowBeanInput {
    unstructured?: UnstructuredContainer[];
    annotatorFlows?: AnnotatorFlow[];
  }

  /** AdverseEvent. InsightModel. */
  export interface AdverseEvent {
    score?: number;
    allergyScore?: number;
    usage?: Usage;
  }

  /** Annotation. */
  export interface Annotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    insightModelData?: InsightModel;
  }

  /** Annotator. */
  export interface Annotator {
    name: string;
    parameters?: JsonObject;
    configurations?: ConfigurationEntity[];
  }

  /** AnnotatorFlow. */
  export interface AnnotatorFlow {
    profile?: string;
    flow: Flow;
    id?: string;
    type?: string;
    data?: JsonObject;
    metadata?: JsonObject;
    globalConfigurations?: ConfigurationEntity[];
    uid?: number;
  }

  export interface AssistanceAnnotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    modality?: string;
    primaryActionNormalizedName?: string;
    primaryActionSurfaceForm?: string;
    SectionNormalizedName?: string;
    SectionSurfaceForm?: string;
    insightModelData?: InsightModel;
  }

  /** AttributeValueAnnotation. */
  export interface AttributeValueAnnotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    concept?: Concept;
    disambiguationData?: Disambiguation;
    sectionNormalizedName?: string;
    sectionSurfaceForm?: string;
    cptCode?: string;
    icd9Code?: string;
    icd10Code?: string;
    loincId?: string;
    meshId?: string;
    name?: string;
    nciCode?: string;
    preferredName?: string;
    rxNormId?: string;
    snomedConceptId?: string;
    source?: string;
    sourceVersion?: string;
    values?: AttributeValueEntry[];
    vocabs?: string;
    insightModelData?: InsightModel;
    ccsCode?: string;
    hccCode?: string;
    ruleId?: string;
    derivedFrom?: Concept[];
    temporal?: Temporal[];
    evidenceSpans?: Reference[];
  }

  /** AttributeValueEntry. */
  export interface AttributeValueEntry {
    value?: string;
    unit?: string;
    frequency?: string;
    duration?: string;
    dimension?: string;
  }

  /** CancerAnnotation. */
  export interface CancerAnnotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    cui?: string;
    modality?: string;
    cancer?: JsonObject[];
    disambiguationData?: Disambiguation;
    sectionNormalizedName?: string;
    sectionSurfaceForm?: string;
    insightModelData?: InsightModel;
  }

  /** Concept. */
  export interface Concept {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    cui?: string;
    disambiguationData?: Disambiguation;
    sectionNormalizedName?: string;
    sectionSurfaceForm?: string;
    cptCode?: string;
    icd9Code?: string;
    icd10Code?: string;
    loincId?: string;
    meshId?: string;
    name?: string;
    nciCode?: string;
    preferredName?: string;
    rxNormId?: string;
    snomedConceptId?: string;
    source?: string;
    sourceVersion?: string;
    semanticType?: string;
    vocabs?: string;
    insightModelData?: InsightModel;
    ruleId?: string;
    derivedFrom?: Concept[];
    temporal?: Temporal[];
    selectionLabel?: string;
    valueIndex?: number;
  }

  /** ConceptValue. */
  export interface ConceptValue {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    cui?: string;
    dimension?: string;
    sectionNormalizedName?: string;
    sectionSurfaceForm?: string;
    preferredName?: string;
    trigger?: string;
    value?: string;
    source?: string;
    ruleId?: string;
    derivedFrom?: Concept[];
    unit?: string;
    values?: JsonObject[];
    range_begin?: string;
    range_end?: string;
  }

  /** ConfigurationEntity. */
  export interface ConfigurationEntity {
    id?: string;
    type?: string;
    uid?: number;
    mergeid?: number;
  }

  /** ContainerAnnotation. */
  export interface ContainerAnnotation {
    allergyInd?: Annotation[];
    allergyMedicationInd?: Annotation[];
    attributeValues?: AttributeValueAnnotation[];
    bathingAssistanceInd?: AssistanceAnnotation[];
    icaCancerDiagnosisInd?: CancerAnnotation[];
    concepts?: Concept[];
    conceptValues?: ConceptValue[];
    ejectionFractionInd?: EjectionFractionAnnotation[];
    hypotheticalSpans?: Annotation[];
    labValueInd?: LabValueAnnotation[];
    medicationInd?: MedicationAnnotation[];
    emailAddressInd?: Annotation[];
    personInd?: Annotation[];
    US_PhoneNumberInd?: Annotation[];
    medicalInstitutionInd?: Annotation[];
    organizationInd?: Annotation[];
    negatedSpans?: NegatedSpan[];
    procedureInd?: ProcedureAnnotation[];
    seeingAssistanceInd?: AssistanceAnnotation[];
    smokingInd?: SmokingAnnotation[];
    symptomDiseaseInd?: SymptomDiseaseAnnotation[];
    toiletingAssistanceInd?: AssistanceAnnotation[];
    walkingAssistanceInd?: AssistanceAnnotation[];
    sections?: SectionAnnotation[];
    nluEntities?: NluEntities[];
    relations?: Relations[];
    spellingCorrections?: SpellingCorrection[];
    spellCorrectedText?: SpellCorrectedText[];
    temporalSpans?: Temporal[];
    lines?: Annotation[];
    sentences?: Annotation[];
    paragraphs?: Annotation[];
  }

  /** DeployCartridgeResponse. */
  export interface DeployCartridgeResponse {
    code?: number;
    artifactResponse?: ServiceError[];
  }

  /** DiagnosisInsight. */
  export interface DiagnosisInsight {
    usage?: Usage;
    suspectedScore?: number;
    symptomScore?: number;
    traumaScore?: number;
    familyHistoryScore?: number;
    modifiers?: DiagnosisModifier;
  }

  /** DiagnosisModifier. */
  export interface DiagnosisModifier {
    associatedProcedures?: Evidence[];
    sites?: Site[];
  }

  /** Disambiguation. */
  export interface Disambiguation {
    validity?: string;
  }

  /** EjectionFractionAnnotation. */
  export interface EjectionFractionAnnotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    isRange?: string;
    firstValue?: string;
    secondValue?: string;
    efAlphabeticValueNormalizedName?: string;
    efAlphabeticValueSurfaceForm?: string;
    efSuffixNormalizedName?: string;
    efSuffixSurfaceForm?: string;
    efTermNormalizedName?: string;
    efTermSurfaceForm?: string;
    sectionNormalizedName?: string;
    sectionSurfaceForm?: string;
    insightModelData?: InsightModel;
  }

  /** Entity. */
  export interface Entity {
    id?: string;
    type?: string;
    uid?: number;
    mergeid?: number;
  }

  /** Evidence. InsightModel. */
  export interface Evidence {
    begin?: number;
    end?: number;
    coveredText?: string;
  }

  /** Flow. */
  export interface Flow {
    elements?: JsonObject[];
    async?: boolean;
  }

  /** InsightModel. */
  export interface InsightModel {
    procedure?: ProcedureInsight;
    diagnosis?: DiagnosisInsight;
    medication?: MedicationInsight;
    normality?: NormalityInsight;
  }

  /** LabValueAnnotation. */
  export interface LabValueAnnotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    dateInMilliseconds?: string;
    labValue?: string;
    labTypeNormalizedName?: string;
    labTypeSurfaceForm?: string;
    sectionNormalizedName?: string;
    sectionSurfaceForm?: string;
    insightModelData?: InsightModel;
  }

  /** ListStringWrapper. */
  export interface ListStringWrapper {
    data?: string[];
  }

  /** MedicationAnnotation . */
  export interface MedicationAnnotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    drug?: JsonObject[];
    sectionNormalizedName?: string;
    sectionSurfaceForm?: string;
    insightModelData?: InsightModel;
    temporal?: Temporal[];
  }

  /** MedicationInsight. */
  export interface MedicationInsight {
    usage?: Usage;
    startedEvent?: Event;
    stoppedEvent?: Event;
    doseChangedEvent?: Event;
    adverseEvent?: AdverseEvent;
  }

  /** NegatedSpan. */
  export interface NegatedSpan {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    trigger?: JsonObject[];
  }

  /** NluEntities. */
  export interface NluEntities {
    begin?: number;
    end?: number;
    coveredText?: string;
    type?: string;
    source?: string;
    relevance?: number;
    uid?: number;
    negated?: boolean;
    hypothetical?: boolean;
  }

  /** NodeAnnotation. */
  export interface NodeAnnotation {
    entity?: NodeEntityAnnotation;
  }

  /** NodeEntityAnnotation. */
  export interface NodeEntityAnnotation {
    uid?: number;
  }

  /** NormalityUsage. InsightModel. */
  export interface NormalityUsage {
    normalScore?: number;
    abnormalScore?: number;
    unknownScore?: number;
    nonFindingScore?: number;
  }

  /** NormalityInsight. */
  export interface NormalityInsight {
    normalityUsage?: NormalityUsage;
    evidence?: Evidence[];
    directlyAffectedScore?: number;
  }

  /** ProcedureAnnotation. */
  export interface ProcedureAnnotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    dateInMilliseconds?: string;
    disambiguationData?: Disambiguation;
    procedureNormalizedName?: string;
    procedureSurfaceForm?: string;
    sectionNormalizedName?: string;
    sectionSurfaceForm?: string;
    snomedConceptId?: string;
    insightModelData?: InsightModel;
    temporal?: Temporal[];
  }

  /** ProcedureInsight. */
  export interface ProcedureInsight {
    task?: Task;
    type?: Type;
    usage?: Usage;
    modifiers?: ProcedureModifier;
  }

  /** ProcedureModifier. */
  export interface ProcedureModifier {
    associatedDiagnosis?: Evidence[];
    sites?: Site[];
  }

  /** Reference. */
  export interface Reference {
    uid?: number;
    selectionLabel?: string;
    valueIndex?: number;
  }

  /** Relations. */
  export interface Relations {
    source?: string;
    score?: number;
    nodes?: NodeAnnotation[];
    type?: string;
  }

  /** SectionAnnotation. */
  export interface SectionAnnotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    sectionType?: string;
    type?: string;
    trigger?: SectionTrigger;
  }

  /** SectionTrigger. */
  export interface SectionTrigger {
    begin?: number;
    end?: number;
    coveredText?: string;
    source?: string;
    type?: string;
    sectionNormalizedName?: string;
  }

  /** Site. */
  export interface Site {
    begin?: number;
    end?: number;
    coveredText?: string;
    type?: string;
  }

  /** SmokingAnnotation. */
  export interface SmokingAnnotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    modality?: string;
    current?: string;
    participation?: string;
    smokeTermNormalizedName?: string;
    smokeTermSurfaceForm?: string;
    sectionNormalizedName?: string;
    sectionSurfaceForm?: string;
    insightModelData?: InsightModel;
  }

  /** SpellCorrectedText. */
  export interface SpellCorrectedText {
    correctedText?: string;
    debugText?: string;
  }

  /** SpellingCorrection. */
  export interface SpellingCorrection {
    begin?: number;
    end?: number;
    coveredText?: string;
    suggestion?: Suggestion[];
  }

  /** Event. InsightModel. */
  export interface Event {
    score?: number;
    allergyScore?: number;
    usage?: Usage;
  }

  /** Suggestion. */
  export interface Suggestion {
    applied?: boolean;
    confidence?: number;
    semTypes?: string;
    text?: string;
  }

  /** SymptomDiseaseAnnotation. */
  export interface SymptomDiseaseAnnotation {
    begin?: number;
    end?: number;
    coveredText?: string;
    id?: string;
    type?: string;
    uid?: number;
    hypothetical?: boolean;
    negated?: boolean;
    dateInMilliseconds?: string;
    disambiguationData?: Disambiguation;
    ccsCode?: string;
    cui?: string;
    hccCode?: string;
    icd9Code?: string;
    icd10Code?: string;
    modality?: string;
    snomedConceptId?: string;
    symptomDiseaseNormalizedName?: string;
    symptomDiseaseSurfaceForm?: string;
    sectionNormalizedName?: string;
    sectionSurfaceForm?: string;
    insightModelData?: InsightModel;
    temporal?: Temporal[];
  }

  /** Task. InsightModel. */
  export interface Task {
    therapeuticScore?: number;
    diagnosticScore?: number;
    labTestScore?: number;
    surgicalTaskScore?: number;
    clinicalAssessmenttScore?: number;
  }

  /** Temporal. */
  export interface Temporal {
    begin?: number;
    end?: number;
    coveredText?: string;
    temporalType?: JsonObject;
    relationTypes?: JsonObject;
  }

  /** Type. InsightModel. */
  export interface Type {
    deviceScore?: number;
    materialScore?: number;
    medicationScore?: number;
    procedureScore?: number;
    conditionManagementScore?: number;
  }

  /** UnstructuredContainer. */
  export interface UnstructuredContainer {
    text?: string;
    id?: string;
    type?: string;
    data?: ContainerAnnotation;
    metadata?: JsonObject;
    uid?: number;
  }

  /** Usage. InsightModel. */
  export interface Usage {
    explicitScore?: number;
    patientReportedScore?: number;
    discussedScore?: number;
    takenScore?: number;
    labMeasurementScore?: number;
  }

  /** Object representing an HTTP response with an error. */
  export interface ServiceError {
    /** respone code. */
    code?: number;
    /** response error message. */
    message?: string;
    /** error severity level. */
    level?: string;
    /** error description. */
    description?: string;
    /** additional error information. */
    moreInfo?: string;
    /** error message correlation identifier. */
    correlationId?: string;
    artifact?: string;
    href?: string;
  }

  /** Object representing service runtime status. */
  export interface ServiceStatus {
    /** version of the service. */
    version?: string;
    /** service uptime since last restart. */
    upTime?: string;
    /** scurrent service state. */
    serviceState?: string;
    /** service state details. */
    stateDetails?: string;
    /** service uptime since last restart. */
    hostName?: string;
    /** total number of requests during uptime. */
    requestCount?: number;
    /** Maximum memory used during uptime. */
    maxMemoryMb?: number;
    /** Megabytes of committed memory. */
    commitedMemoryMb?: number;
    /** Megabytes of memory used. */
    inUseMemoryMb?: number;
    /** number of available processors. */
    availableProcessors?: number;
    /** number of concurrent requests. */
    concurrentRequests?: number;
    /** configured maximum concurrent request limit. */
    maxConcurrentRequests?: number;
    /** number of rejected requests. */
    totalRejectedRequests?: number;
    /** number of blocked requests. */
    totalBlockedRequests?: number;
  }
}

export = AnnotatorForClinicalDataV1;
