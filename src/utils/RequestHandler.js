import { isUserLoggedIn, loginUser } from "./AuthHandler";

export const apiKey = process.env.REACT_APP_API_KEY;
export const appUrl = process.env.REACT_APP_API_URL;
export const intelligenceUrl = process.env.REACT_APP_INTELLIGENCE_URL;
export const publicUser = process.env.REACT_APP_PUBLIC_USERNAME;
export const publicPass = process.env.REACT_APP_PUBLIC_USERPASS;

/**
 * Helper function to get user credentials from localStorage
 */
export const getUserCredentials = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const { username, login_token } = JSON.parse(user);
    if (username && login_token) {
      return { token: login_token, api_key: apiKey };
    } else {
      throw new Error("Invalid user data for protected request.");
    }
  }
  throw new Error("User not logged in for protected request.");
};

/**
 * Helper function to make API requests
 */
export const makeApiRequest = async (path, method, requestBody, headers = {
  "Content-Type": "application/json",
}) => {
  const options = {
    method,
    headers,
  };
  if (method !== "GET" && requestBody) {
    options.body = JSON.stringify(requestBody);
  }
  const response = await fetch(`${appUrl}${path}`, options);
  return response.json();
};

/**
 * Fetch entity data from the API
 * @param {string} entityName - Name of the entity to fetch
 * @param {boolean} isProtected - Whether the API requires authentication
 * @returns {Promise<any>}
 */
export const fetchEntityData = async (entityName, isProtected = false) => {
  const path = isProtected ? `/entity/personal/data/${entityName}` : `/entity/public/data/${entityName}`;
  let headers = {
    "Content-Type": "application/json"
  }
  if (isProtected) {
    const credentials = getUserCredentials();
    headers = { ...headers, ...credentials};
  }else{
    headers = { ...headers, "api_key":apiKey};
  }
  return makeApiRequest(path, "GET", null, headers);
};

export const fetchEntityInstance = async (entityName, instanceId, isProtected = false) => {
  const path = isProtected ? `/entity/personal/data/${entityName}` : `/entity/row/${entityName}/${instanceId}`;
  let headers = {
    "Content-Type": "application/json"
  }
  if (isProtected) {
    const credentials = getUserCredentials();
    headers = { ...headers, ...credentials};
  }else{
    headers = { ...headers, "api_key":apiKey};
  }
  return makeApiRequest(path, "GET", null, headers);
};

/**
 * Save entity data to the API
 * @param {string} entityName - Name of the entity to save
 * @param {Object} details - Data to save
 * @param {boolean} isProtected - Whether the API requires authentication
 * @returns {Promise<any>}
 */
export const saveEntityData = async (entityName, details, instanceId = null) => {
  const path = instanceId? `/entity/${entityName}/${instanceId}`: `/entity/${entityName}/`;
  let requestBody = {
    entity_name: entityName,
    details,
  };
  let headers = {
    "Content-Type": "application/json"
  }
  if (!isUserLoggedIn()) {
    await loginUser(publicUser, publicPass);
  }
  const credentials = getUserCredentials();
  headers = { ...headers, ...credentials};
  const response = await makeApiRequest(path, instanceId? "PATCH":"POST", requestBody, headers);
  return response;
};

export const bulkSaveEntityData = async (entityName, rows) => {
  const path = `/entity/save/bulk/`;
  let requestBody = {
    entity_name: entityName,
    details: rows,
  };

  let headers = {
    "Content-Type": "application/json"
  }
  if (!isUserLoggedIn()) {
    await loginUser(publicUser, publicPass);
  }
  const credentials = getUserCredentials();
  headers = { ...headers, ...credentials};
  return makeApiRequest(path, "POST", requestBody, headers);
}