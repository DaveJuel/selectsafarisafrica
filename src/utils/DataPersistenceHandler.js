import { logger } from "./logger";
import { apiKey, fetchEntityData, makeApiRequest } from "./RequestHandler";
export const ssaIntelligenceUser = process.env.REACT_APP_SSA_INTELLIGENT_USER;
export const ssaIntelligencePass = process.env.REACT_APP_SSA_INTELLIGENT_PASS;

export const ssaiLoginUser = async () => {
    let isLoggedIn = false;
    const request = {
        api_key: apiKey,
        username:ssaIntelligenceUser,
        password:ssaIntelligencePass
    };
    const response = await makeApiRequest(`/user/login`, 'POST',request);
    if(response.success){
        localStorage.setItem("ssai_user", JSON.stringify(response.result));
        isLoggedIn = true;
    }else{
        throw new Error(response.result ?? 'Failed to authenticate ssa intelligence.');
    }
    return isLoggedIn;
}

export const logoutSsaiUser = () => {
    localStorage.removeItem("ssai_user");
}

export const isSsaiLoggedIn = () => {
    const user = localStorage.getItem("ssai_user");
    return !!user;
}

export const persistItinerary = async (itinerary) => {
    try{
        const countriesResponse = await fetchEntityData("countries");
        const seasonsResponse = await fetchEntityData("seasons");
        const countries = countriesResponse.result;
        const seasons = seasonsResponse.result;
        const itinerarySeason = seasons.find((season) => season.name.toLowerCase() === itinerary.season.toLowerCase());
        const itineraryCountry = countries.find((country) => country.name.toLowerCase() === itinerary.country.toLowerCase());
        const itineraryData = {
            ...itinerary,
            country: itineraryCountry.id,
            season: itinerarySeason.id
        }
        const response = await ssaiSaveEntityData("itineraries", itineraryData);
        return response.result;
    }catch(error){
        logger.error(`Failed to persist itinerary`, error);
    }
}

export const getSsaiUserCredentials = () => {
  const user = localStorage.getItem("ssai_user");
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

export const ssaiSaveEntityData = async (entityName, details) => {
  const path = `/entity/${entityName}/`;
  let requestBody = {
    entity_name: entityName,
    details,
  };
  let headers = {
    "Content-Type": "application/json"
  }
  if (!isSsaiLoggedIn()) {
    await ssaiLoginUser();
  }
  const credentials = getSsaiUserCredentials();
  headers = { ...headers, ...credentials};
  const response = await makeApiRequest(path, "POST", requestBody, headers);
  return response;
};