import { useEffect, useState } from "react";
import { fetchEntityTranslatedData } from "../../utils/RequestHandler";
import LoadingSpinner from "./LoadingSpinner";
import { ActivitiesContainer, ActivitiesGrid, ActivityChip, Ellipsis, PageDot, PageIndicators, PaginationButton, PaginationContainer } from "../../style/paginated.activities.styles";
import useItemsPerPage from "../../utils/UserItemsPerPage";

const PaginatedActivities = ({
  formData,
  setFormData,
  handleActivityToggle,
  allActivities,
  setAllActivities,
  activities,
  setActivities,
  language
}) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = useItemsPerPage();

  // Calculate pagination
  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = activities.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetchEntityTranslatedData("activities", language);
        if (response.success) {
          const data = Array.isArray(response.result) ? response.result : [];
          setActivities(data);
          setAllActivities(data);
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

  const getVisiblePages = (totalPages, currentPage) => {
    const pages = [];

    if (totalPages <= 7) {
      return [...Array(totalPages)].map((_, i) => i);
    }

    pages.push(0);

    if (currentPage > 2) pages.push("left-ellipsis");

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) pages.push("right-ellipsis");

    pages.push(totalPages - 1);

    return pages;
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
                {getVisiblePages(totalPages, currentPage).map((p, index) =>
                  p === "left-ellipsis" || p === "right-ellipsis" ? (
                    <Ellipsis key={index}>…</Ellipsis>
                  ) : (
                    <PageDot
                      key={index}
                      type="button"
                      active={p === currentPage}
                    // onClick={() => goToPage(p)}
                    />
                  )
                )}
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
