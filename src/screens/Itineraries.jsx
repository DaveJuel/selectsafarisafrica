
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Header,
  HeaderSubtitle,
  HeaderTitle,
  ViewWrapper,
} from "../style/itinerary.view.styles";

import ItinerariesListView from "../components/Sections/ItinerariesListView";
import LoadingSpinner from "../components/Elements/LoadingSpinner";
import PageSeo from "../components/Elements/PageSeo";

export default function Itineraries() {
  const { t, ready } = useTranslation("itineraries");

  const {
    formData,
    itineraries,
    itineraryActivities,
    allActivities,
    toggleView,
    language,
    setIsPersisting,
    setItinerary,
    setIsModalOpen,
    loadingMainView,
  } = useOutletContext();

  const openBookTripModal = () => {
    setIsModalOpen(true);
  };

  // SEO must render regardless of itinerary availability.
  const pageTitle = "East Africa Safari Itineraries | Select Safaris Africa";

  const pageDescription =
    "Browse safari itineraries across Rwanda, Uganda, Tanzania and Burundi, from gorilla trekking to wildlife safaris and cultural tours.";

  return (
    <>
      <PageSeo
        path="/itineraries"
        title={pageTitle}
        description={pageDescription}
      />

      <ViewWrapper>
        {!ready ? (
          <LoadingSpinner />
        ) : loadingMainView ? (
          <LoadingSpinner />
        ) : !itineraries ? (
          <section>
            <Header>
              <HeaderTitle as="h1">
                {t("page_title", {
                  defaultValue: "Explore East Africa Safari Itineraries",
                })}
              </HeaderTitle>

              <HeaderSubtitle>
                {t("no_itineraries_yet", {
                  defaultValue:
                    "Explore our safari experiences across East Africa.",
                })}
              </HeaderSubtitle>
            </Header>
          </section>
        ) : (
          <>
            <Header>
              <HeaderTitle>
                {t("lets_go_to")} {formData?.country || "East Africa"}!
              </HeaderTitle>

              <HeaderSubtitle>
                {formData?.days || 3} {t("incredible_days")}
              </HeaderSubtitle>
            </Header>

            <ItinerariesListView
              inItineraries={itineraries}
              inItinerariesActivities={itineraryActivities}
              openBookTripModal={openBookTripModal}
              formData={formData}
              allActivities={allActivities}
              toggleView={toggleView}
              language={language}
              setIsPersisting={setIsPersisting}
              setItinerary={setItinerary}
            />
          </>
        )}
      </ViewWrapper>
    </>
  );
}
