import { parseISO, addDays, format } from 'date-fns';
import { enUS, fr, es, pt, zhCN } from 'date-fns/locale';
import { fetchEntityData } from './RequestHandler';
import { logger } from './logger';

const localeMap = {
  en: enUS,
  fr: fr,
  es: es,
  pt: pt,
  zh: zhCN
};

export const filterItineraries = async (
  country,
  days,
  activities = [],
  setLoading
) => {
  let data = [];
  try {
    setLoading(true);
    const response = await fetchEntityData("itineraries");
    if (!response.success) return { itineraries: data, itineraryActivities: [] };

    const itineraries = response.result?.filter(
      (item) => item.country === country && parseInt(item.days, 10) === days
    ) || [];
    const itineraryActivitiesResponse = await fetchEntityData("itinirary_activities");
    const itineraryActivities = itineraryActivitiesResponse.success
      ? itineraryActivitiesResponse.result
      : [];

    if (!activities.length) {
      return { itineraries, itineraryActivities };
    }

    const itineraryMap = new Map();
    itineraryActivities.forEach((ia) => {
      if (!itineraryMap.has(ia.itinerary)) {
        itineraryMap.set(ia.itinerary, new Set());
      }
      itineraryMap.get(ia.itinerary).add(ia.activity);
    });

    const activityNamesSet = new Set(activities.map((a) => a.name));

    const filteredItineraries = itineraries.filter((itinerary) => {
      const activitiesSet = itineraryMap.get(itinerary.name);
      if (!activitiesSet) return false;
      return [...activityNamesSet].some((act) => activitiesSet.has(act));
    });

    return { itineraries: filteredItineraries, itineraryActivities };
  } catch (error) {
    logger.error("Failed to filter itineraries", {
      error: error.message,
      stack: error.stack,
    });
    return { itineraries: data, itineraryActivities: [] };
  } finally {
    setLoading(false);
  }
};



export const fetchData = async (entityName, setLoading) => {
  let data = [];
  try {
    setLoading(true);
    const response = await fetchEntityData(entityName);
    if (response.success) {
      data = response.result;
    }
  } catch (error) {
    logger.error(`Fetching ${entityName}`, error);
  }finally{
    setLoading(false);
  }
  return data;
};

export const sortItineraryActivities = (itinerary, allActivities) => {
    const timeOrder = [
        "Early morning",
        "Mid morning",
        "Late morning",
        "Midday",
        "Early afternoon",
        "Late afternoon",
        "Sunset",
        "Evening",
        "Night",
        "Midnight",
    ];

    const timeRank = timeOrder.reduce((acc, time, index) => {
        acc[time.toLowerCase()] = index;
        return acc;
    }, {});

    return allActivities
        ?.filter((activity) => activity.itinerary === itinerary.name)
        ?.sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;

        const timeA = timeRank[a.time?.toLowerCase()] ?? Infinity;
        const timeB = timeRank[b.time?.toLowerCase()] ?? Infinity;

        return timeA - timeB;
    });
}

/**
 * Formats a trip date into a human-readable string in the specified language.
 *
 * @param {string} tripStartDate - The ISO date string of the trip start date.
 * @param {number} day - The day number (e.g., 1 = start date, 2 = next day).
 * @param {string} [lang='en'] - The language code ('en', 'fr', 'es', 'pt', 'zh').
 * @returns {string} - Formatted date in the specified language.
 */
export const getFormattedTripDate = (tripStartDate, day, lang = 'en') => {
  if (!tripStartDate || !day) return '';

  const startDate = parseISO(tripStartDate);
  const currentDate = addDays(startDate, day - 1);

  const locale = localeMap[lang] || enUS;

  return format(currentDate, 'EEEE, dd MMMM yyyy', { locale });
};

export const getTodayDateISO = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};