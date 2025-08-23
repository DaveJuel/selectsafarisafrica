// ItineraryView.js
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchEntityData } from "../../utils/RequestHandler";
import LoadingSpinner from "../Elements/LoadingSpinner";
import ItinerariesListView from "./ItinerariesListView";
import AdventuresView from "./AdventuresView";
import { useTranslation } from "react-i18next";
import { Header, HeaderSubtitle, HeaderTitle, ViewWrapper } from "../../style/itinerary.view.styles";

export default function ItineraryView({
  formData,
  itineraries,
  openBookTripModal,
}) {
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("itineraries");

  useEffect(() => {
    const fetchItineraryActivities = async () => {
      try {
        const response = await fetchEntityData("itinirary_activities");
        if (response.success) {
          setItineraryActivities(response.result);
        }
      } catch (error) {
        console.error(`Failed to fetch itinerary activities`, error);
      }
    };

    const fetchData = async () => {
      try {
        fetchItineraryActivities();
      } catch (error) {
        console.error(`Failed to data`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!itineraries) {
    return <AdventuresView formData={formData} />;
  }

  return (
    <ViewWrapper>
      <Header>
        <HeaderTitle>
          {t("lets_go_to")} {formData.country}!
        </HeaderTitle>
        <HeaderSubtitle>
          {formData.days} {t("incredible_days")}
        </HeaderSubtitle>
      </Header>
      {itineraries?.length > 0 && (
        <ItinerariesListView
          itineraries={itineraries}
          itinerariesActivities={itineraryActivities}
          openBookTripModal={openBookTripModal}
        />
      )}
    </ViewWrapper>
  );
}

