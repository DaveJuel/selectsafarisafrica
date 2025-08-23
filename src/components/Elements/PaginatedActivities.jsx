import { useEffect, useState } from "react";
import { fetchEntityData } from "../../utils/RequestHandler";
import LoadingSpinner from "./LoadingSpinner";
import { ActivitiesContainer, ActivitiesGrid, ActivityChip, PageDot, PageIndicators, PaginationButton, PaginationContainer } from "../../style/paginated.activities.styles";

const PaginatedActivities = ({
  formData,
  setFormData,
  handleActivityToggle,
  allActivities,
  setAllActivities,
  activities, 
  setActivities
}) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default PaginatedActivities;
