import {
  ActionBtn,
  ActivitiesList,
  ActivitiesSection,
  ActivitiesTitle,
  AddActivityIcon,
  AddActivityItem,
  AddActivityText,
  CardFooter,
  CardHeader,
  DurationIcon,
  DurationInfo,
  DurationText,
  ItinerariesGrid,
  ItineraryCard,
  ItineraryName,
  SeasonBadge,
} from "../../style/itineraries.list.view.styles";
import { sortItineraryActivities } from "../../utils/DataHandler";
import { useTranslation } from "react-i18next";
import NoItinerariesPrompt from "./NoItinerariesPrompt";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "../../utils/AuthHandler";
import LoadingSpinner from "../Elements/LoadingSpinner";
import { logger } from "../../utils/logger";
import { fetchEntityTranslatedData, intelligenceUrl } from "../../utils/RequestHandler";

import ItineraryListViewItem from "../Elements/ItineraryListViewItem";

const ItinerariesListView = ({
  inItineraries = [],
  inItinerariesActivities,
  openBookTripModal,
  formData,
  allActivities,
  toggleView,
  language
}) => {
  const { t } = useTranslation("itineraries");
  const [itineraries, setItineraries] = useState(inItineraries);
  const [itinerariesActivities, setItineraryActivities] = useState(
    inItinerariesActivities
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAskingAgent, setIsAskingAgent] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activityRecommendedTimes, setActivityRecommendedTimes] = useState([]);
  const [availableActivities, setAvailableActivities] = useState([]);
  const [needToAskAgent, setNeedToAskAgent] = useState(
    itineraries?.length === 0
  );

  useEffect(() => {
    const loadRecommendedTimes = async () => {
      try {
        const recommendedTimesResponse = await fetchEntityTranslatedData(
          "activity_recommended_times",
          language
        );
        if (!recommendedTimesResponse.success) return;
        setActivityRecommendedTimes(recommendedTimesResponse.result);
      } catch (error) {
        logger.error(error);
      }
    }

    const loadActivities = async () => {
      try {
        const activitiesResponse = await fetchEntityTranslatedData('activities', language);
        if (!activitiesResponse.success) return;
        setAvailableActivities(activitiesResponse.result.filter((activity) => activity.country.toLowerCase() === formData.country.toLowerCase()));
      } catch (error) {
        logger.error(error);
      }
    }

    loadActivities();
    loadRecommendedTimes();
  }, [language, formData.country]);

  useEffect(() => {
    const loginStatus = isUserLoggedIn();
    if (loginStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setItineraries(inItineraries);
  }, [inItineraries]);

  useEffect(() => {
    setItineraryActivities(inItinerariesActivities);
  }, [inItinerariesActivities]);

  useEffect(() => {
    const askAgent = async () => {
      try {
        setIsAskingAgent(true);
        const countryActivities = allActivities.filter(
          (item) =>
            item.country.toLowerCase() === formData.country.toLowerCase()
        );
        const response = await fetch(
          `${intelligenceUrl}/api/chat/generate/itinerary/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: formData?.country,
              days: formData?.days,
              selected_activities: formData?.activities || [],
              all_activities: countryActivities,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Agent request failed: ${response.status}`);
        }
        const data = await response.json();
        if (data?.itineraries?.length > 0) {
          setItineraries(
            data?.itineraries?.map((item) => {
              return {
                name: item.name,
                season: item.season,
                days: item.days,
              };
            })
          );
          const itinerary = data?.itineraries[0];
          setItineraryActivities(
            itinerary?.activities?.map((item) => {
              return { ...item, itinerary: itinerary.name };
            })
          );
          setNeedToAskAgent(false);
        } else {
          setErrorOccured(true);
          setErrorMessage(
            "We couldn't make any itineraries at the moment. Please reach out to us for further inquiry."
          );
          logger.warn("Agent returned no itineraries", data);
        }
      } catch (error) {
        setErrorOccured(true);
        setErrorMessage(
          "Something went wrong during the planning process, please reach out to us we shall get back to you in time."
        );
        logger.error("Failed to ask agent", error);
      } finally {
        setIsAskingAgent(false);
      }
    };

    if (isLoggedIn && needToAskAgent) {
      askAgent();
    }
  }, [isLoggedIn, needToAskAgent, formData, allActivities]);

  const handleDeleteActivity = (item) => {
    setItineraryActivities((prev) => prev.filter((activity) => activity.id !== item.id));
  }

  const handleEditActivity = (item) => {
    setEditingId((prev) => (prev === item.id ? null : item.id));
  }

  const confirmEditActivity = () => {
    if (isAdding) return confirmAddActivity();
    setEditingId(null);
  }

  const cancelEditActivity = () => {
    console.log(`Cancel edit activity`);
    if (isAdding) setIsAdding(false);
    setEditingId(null);
  }

  const confirmAddActivity = () => {
    setIsAdding(false);
    setEditingId(null);
  }

  const handleChange = (id, field, value) => {
    setItineraryActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    );
  };

  const handleAddActivity = (itinerary, itineraryActivities) => {
    const nextDay =
      itineraryActivities.length > 0
        ? Math.max(...itineraryActivities.map((a) => a.day)) + 1
        : 1;

    const newActivity = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      itinerary: itinerary.name,
      day: nextDay,
      time: activityRecommendedTimes[0].time,
      activity: availableActivities[0].name,
      duration: `${availableActivities[0].duration_in_hours} hours`
    };
    setItineraryActivities((prev) => [...prev, newActivity]);
    setEditingId(newActivity.id);
    setIsAdding(true);
  };

  if ((itineraries?.length === 0 && !isLoggedIn) || errorOccured) {
    return (
      <NoItinerariesPrompt
        formData={formData}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        errorOccured={errorOccured}
        errorMessage={errorMessage}
        toggleView={toggleView}
      />
    );
  }

  if (isAskingAgent) {
    return <LoadingSpinner />;
  }

  return (
    <ItinerariesGrid>
      {itineraries?.map((itinerary) => {
        const activities = sortItineraryActivities(
          itinerary,
          itinerariesActivities
        );
        return (
          <ItineraryCard key={itinerary?.id}>
            <CardHeader>
              <ItineraryName>{itinerary.name}</ItineraryName>
              <SeasonBadge>{itinerary.season}</SeasonBadge>
            </CardHeader>

            <DurationInfo>
              <DurationIcon src="/icons/day-mode.png" alt="Duration" />
              <DurationText>
                {itinerary.days} {t("days")}
              </DurationText>
            </DurationInfo>

            <ActivitiesSection>
              <ActivitiesTitle>{t("what_you_will_do")}</ActivitiesTitle>
              <ActivitiesList>
                {activities?.map((item, index) => (
                  <ItineraryListViewItem
                    item={item}
                    index={index}
                    editingId={editingId}
                    handleChange={handleChange}
                    timeOptions={activityRecommendedTimes}
                    confirmEditActivity={confirmEditActivity}
                    cancelEditActivity={cancelEditActivity}
                    handleEditActivity={handleEditActivity}
                    handleDeleteActivity={handleDeleteActivity}
                    activityOptions={availableActivities}
                  />
                ))}
                <AddActivityItem onClick={() => handleAddActivity(itinerary, activities)}>
                  <AddActivityIcon />
                  <AddActivityText>Add Activity</AddActivityText>
                </AddActivityItem>
              </ActivitiesList>
            </ActivitiesSection>

            <CardFooter
              onClick={() => openBookTripModal(itinerary, activities)}
            >
              <ActionBtn>{t("book_now")}</ActionBtn>
            </CardFooter>
          </ItineraryCard>
        );
      })}
    </ItinerariesGrid >
  );
};

export default ItinerariesListView;
