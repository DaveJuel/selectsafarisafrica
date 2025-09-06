import SEO from "../components/Elements/SEO";
import MainView from "../components/Sections/MainView";

export default function Landing() {
    return (
    <>
      <SEO
        title="Select Safaris | Discover East Africa’s Top Adventures"
        description="Plan and book unforgettable safaris in Rwanda, Kenya, Uganda and beyond. Choose from gorilla trekking, cultural tours, and luxury lodge experiences."
        image="https://www.selectsafaris.com/assets/hero.jpg"
        url="https://www.selectsafaris.com/"
        schema={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Select Safaris Africa",
          "url": "https://www.selectsafaris.com/",
          "logo": "https://www.selectsafaris.com/assets/logo.webp",
          "description": "Your trusted partner for unforgettable African safari experiences.",
          // "sameAs": [
          //   "https://www.facebook.com/selectsafaris",
          //   "https://www.instagram.com/selectsafaris"
          // ]
        }}
      />
      <MainView />
    </>
  );
}
