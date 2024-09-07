import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  //Company API routes //////////////////////////////////////////////////////
  /** Get list of companies. */
  static async getCompanies(name) {
    const res = await this.request(`companies/`, { name });
    return res.companies;
  }
  /** Get details on a company by handle. */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  ////////////////////////////////////////////////////////////////////////////

  //Job API routes //////////////////////////////////////////////////////
  /** Get list of jobs. */
  static async getJobs(title) {
    const res = await this.request(`jobs/`, { title });
    return res.jobs;
  }

  /** Get details on a job by id. */
  static async getJob(id) {
    const res = await this.request(`jobs/${id}`);
    return res.job;
  }
  ////////////////////////////////////////////////////////////////////////////

  //User API routes //////////////////////////////////////////////////////
  /** Get list of users. */
  static async getUsers() {
    const res = await this.request(`users/`);
    return res.users;
  }

  /** Get details on a user by username. */
  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** update an existing user */
  static async updateUser(username, newUserData) {
    const res = await this.request(`users/${username}`, newUserData, 'patch');
    return res.user;
  }

  /** handle user applying for a job */
  static async applyToJob(username, jobId) {
    const res = await this.request(
      `users/${username}/jobs/${jobId}`,
      {},
      'post'
    );
    return res;
  }
  ////////////////////////////////////////////////////////////////////////////

  //Auth API routes //////////////////////////////////////////////////////
  /** Authenticate an existing user. */
  static async login(userData) {
    const res = await this.request(`auth/token`, userData, 'post');
    return res.token;
  }

  /** Register a new user */
  static async signup(newUserData) {
    const res = await this.request(`auth/register`, newUserData, 'post');
    return res.token;
  }
  ////////////////////////////////////////////////////////////////////////////
}

export default JoblyApi;
