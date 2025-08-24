import {
  ActionBtn,
  ActivitiesList,
  ActivitiesSection,
  ActivitiesTitle,
  ActivityContent,
  ActivityDescription,
  ActivityHeader,
  ActivityItem,
  CardFooter,
  CardHeader,
  DayBadge,
  DurationIcon,
  DurationInfo,
  DurationText,
  ItinerariesGrid,
  ItineraryCard,
  ItineraryName,
  SeasonBadge,
  TimeTag,
} from "../../style/itineraries.list.view.styles";
import { sortItineraryActivities } from "../../utils/DataHandler";
import { useTranslation } from "react-i18next";
import NoItinerariesPrompt from "./NoItinerariesPrompt";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "../../utils/AuthHandler";
import LoadingSpinner from "../Elements/LoadingSpinner";
import { logger } from "../../utils/logger";
import { intelligenceUrl } from "../../utils/RequestHandler";

const ItinerariesListView = ({
  inItineraries = [],
  inItinerariesActivities,
  openBookTripModal,
  formData,
  allActivities,
  toggleView,
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
  const [needToAskAgent, setNeedToAskAgent] = useState(
    itineraries?.length === 0
  );

  useEffect(() => {
    const loginStatus = isUserLoggedIn();
    if (loginStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const askAgent = async () => {
      try {
        setIsAskingAgent(true);
        const countryActivities = allActivities.filter(
          (item) =>
            item.country.toLowerCase() === formData.country.toLowerCase()
        );
        const response = await fetch(
          `${intelligenceUrl}/api/generate/itinerary/`,
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
              <DurationIcon>📅</DurationIcon>
              <DurationText>
                {itinerary.days} {t("days")}
              </DurationText>
            </DurationInfo>

            <ActivitiesSection>
              <ActivitiesTitle>{t("what_you_will_do")}</ActivitiesTitle>
              <ActivitiesList>
                {activities?.map((item, index) => (
                  <ActivityItem key={index}>
                    <ActivityContent>
                      <ActivityHeader>
                        <DayBadge>
                          {t("day")} {item?.day}
                        </DayBadge>
                        <TimeTag>{item?.time}</TimeTag>
                      </ActivityHeader>
                      <ActivityDescription>
                        {item?.activity}
                      </ActivityDescription>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </ActivitiesList>
            </ActivitiesSection>

            <CardFooter onClick={() => openBookTripModal(itinerary)}>
              <ActionBtn>{t("book_now")}</ActionBtn>
            </CardFooter>
          </ItineraryCard>
        );
      })}
    </ItinerariesGrid>
  );
};

export default ItinerariesListView;
