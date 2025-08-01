// ItineraryView.js
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { fetchEntityData } from "../../utils/RequestHandler";
import LoadingSpinner from "../Elements/LoadingSpinner";
import ItinerariesListView from "./ItinerariesListView";
import AdventuresView from "./AdventuresView";

export default function ItineraryView({
  formData,
  itineraries,
  openBookTripModal,
}) {
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <HeaderTitle>Let's Go to {formData.country}!</HeaderTitle>
        <HeaderSubtitle>
          {formData.days} incredible days planned just for you
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
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
`;

const HeaderTitle = styled.h2`
  color: #0e5033;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const HeaderSubtitle = styled.p`
  color: #0e5033;
  font-size: 16px;
`;
