import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchEntityData } from "../../utils/RequestHandler";
import LoadingSpinner from "./LoadingSpinner";

const PaginatedActivities = ({
  formData,
  setFormData,
  handleActivityToggle,
}) => {
  const [allActivities, setAllActivities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = activities.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetchEntityData("activities");
        if (response.success) {
          setActivities(response.result);
          setAllActivities(response.result);
        }
      } catch (error) {
        console.error(`Failed to fetch activities`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    const filterCountryActivities = () => {
      if (formData.country) {
        setActivities(
          allActivities.filter(
            (activity) => activity.country === formData.country
          )
        );

        setFormData((prev) => ({
          ...prev,
          activities: [],
        }));
      }
    };
    filterCountryActivities();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.country]);

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <ActivitiesContainer>
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
          <ActivitiesGrid>
            {currentActivities.map((activity) => (
              <ActivityChip
                key={activity.id}
                selected={formData.activities?.includes(activity)}
                onClick={() => handleActivityToggle(activity)}
                type="button"
              >
                {activity.name}
              </ActivityChip>
            ))}
          </ActivitiesGrid>

          {totalPages > 1 && (
            <PaginationContainer>
              <PaginationButton
                type="button"
                onClick={goToPrevPage}
                disabled={currentPage === 0}
              >
                ‹
              </PaginationButton>

              <PageIndicators>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PageDot
                    type="button"
                    key={index}
                    active={index === currentPage}
                  />
                ))}
              </PageIndicators>

              <PaginationButton
                type="button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
              >
                ›
              </PaginationButton>
            </PaginationContainer>
          )}
        </>
      )}
    </ActivitiesContainer>
  );
};

// Styled Components
const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  min-height: 200px;
`;

const ActivityChip = styled.button`
  padding: 5px 6px;
  border: 1px solid ${(props) => (props.selected ? "#7E5B40" : "#e1e8ed")};
  background: ${(props) => (props.selected ? "#7E5B40" : "white")};
  color: ${(props) => (props.selected ? "white" : "#7E5B40")};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    border-color: #7e5b40;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(234, 177, 102, 0.3);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 5px;
`;

const PaginationButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #e1e8ed;
  background: white;
  color: #7e5b40;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #7e5b40;
    background: #7e5b40;
    color: white;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PageIndicators = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PageDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.active ? "#7E5B40" : "#e1e8ed")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #7e5b40;
    transform: scale(1.2);
  }
`;

export default PaginatedActivities;
