import ItineraryView from "./ItineraryView";
import ContactUsView from "./ContactUsView";
import AboutUsView from "./AboutUsView";

export default function MainSectionView({
  currentView,
  formData,
  itineraries,
  openBookTripModal,
  toggleView,
  allActivities
}) {
  switch (currentView) {
    case "contact-us":
      return <ContactUsView />;
    case "about-us":
      return <AboutUsView toggleView={toggleView} />;
    case "itiniraries":
    default:
      return (
        <ItineraryView
          formData={formData}
          itineraries={itineraries}
          openBookTripModal={openBookTripModal}
          allActivities={allActivities}
        />
      );
  }
}
