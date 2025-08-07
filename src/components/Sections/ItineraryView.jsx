// ItineraryView.js
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { fetchEntityData } from "../../utils/RequestHandler";
import LoadingSpinner from "../Elements/LoadingSpinner";
import ItinerariesListView from "./ItinerariesListView";
import AdventuresView from "./AdventuresView";
import { useTranslation } from "react-i18next";

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

// Styled Components for ItineraryView
const ViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
`;

const HeaderTitle = styled.h2`
  color: #0e5033;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #0e5033, #0e5033, #0e5033);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #e4bc87;
`;

const HeaderSubtitle = styled.p`
  color: #e4bc87;
  font-size: 16px;
`;
