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

export const persistItinerary = async (itinerary, itineraryActivities, allActivities) => {
    try{
        
        const [countriesResponse, seasonsResponse] = await Promise.all([
          fetchEntityData("countries"),
          fetchEntityData("seasons"),
        ]);
        if (!countriesResponse.success || !seasonsResponse.success) {
          throw new Error("Failed to fetch countries or seasons");
        }
        const countriesMap = new Map(
          countriesResponse.result.map(c => [c.name.toLowerCase(), c])
        );
        const seasonsMap = new Map(
          seasonsResponse.result.map(s => [s.name.toLowerCase(), s])
        );

        const itineraryCountry = countriesMap.get(itinerary.country.toLowerCase());
        const itinerarySeason = seasonsMap.get(itinerary.season.toLowerCase());

        if (!itineraryCountry || !itinerarySeason) {
          throw new Error("Invalid itinerary: country or season not found");
        }
        const itineraryData = {
            ...itinerary,
            country: itineraryCountry.id,
            season: itinerarySeason.id
        }
        const response = await ssaiSaveEntityData("itineraries", itineraryData);
        if(!response.success){
          logger.error('An error occurred persisting itinerary: results', response);
          throw new Error('An error occurred persisting itinerary');
        }
        const persistedItinerary = response.result;
        await persistItineraryActivities(persistedItinerary, itineraryActivities, allActivities);
        return persistedItinerary;
    }catch(error){
        logger.error(`Failed to persist itinerary`, error);
    }
}

export const persistItineraryActivities = async (itinerary, itineraryActivities, allActivities) => {
  try{
      logger.info(`peristed itinerary`, itinerary);
      const recommendedTimesResponse = await fetchEntityData("activity_recommended_times");
      if(!recommendedTimesResponse.success){
        logger.error(`Failed to fetch recommended times`, recommendedTimesResponse);
        throw new Error(`Failed to fetch recommended times`);
      }
      
      const recommendedTimesMap = new Map(
        recommendedTimesResponse.result.map(t => [t.time.toLowerCase(), t])
      );
      const countryActivitiesMap = new Map(
        allActivities
          .filter(a => a.country.toLowerCase() === itinerary.country.toLowerCase())
          .map(a => [a.name.toLowerCase(), a])
      );
     
     
      const itineraryActivitiesData = itineraryActivities.map(activityData => {
      logger.info(`itinerary activity data`, activityData);
      const recommendedTime = recommendedTimesMap.get(activityData.time.toLowerCase());
      const activity = countryActivitiesMap.get(activityData.activity.toLowerCase());
      if (!recommendedTime || !activity) {
        throw new Error(
          `Invalid activity or time for itinerary: ${activityData.activity}, ${activityData.time}`
        );
      }

      return {
        itinerary: itinerary.id,
        activity: activity.id,
        time: recommendedTime.id,
        duration: `${activity.duration_in_hours} hours`,
        day: activityData.day,
        more_information: "",
      };
    });

    logger.info("Persisting itinerary activities", itineraryActivitiesData);

    await ssaBulkSaveEntityData("itinirary_activities", itineraryActivitiesData);
  }catch(error){
    logger.error(`Failed to persist itinerary activities`, error);
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

export const ssaBulkSaveEntityData = async (entityName, rows) => {
  const path = `/entity/save/bulk/`;
  let requestBody = {
    entity_name: entityName,
    details: rows,
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
}