import SEO from "../components/Elements/SEO";
import MainView from "../components/Sections/MainView";

export default function Landing() {
    return (
    <>
      <SEO
        title="Select Safaris Africa| Discover East Africa’s Top Adventures"
        description="Plan and book unforgettable safaris in Rwanda, Tanzania, Uganda and Burundi. Choose from gorilla trekking, cultural tours, and luxury lodge experiences."
        image="https://www.selectsafarisafrica.com/assets/hero.jpg"
        url="https://www.selectsafarisafrica.com/"
        schema={{
          "@context": "https://selectsafarisafrica.com",
          "@type": "TravelAgency",
          "name": "Select Safaris Africa",
          "url": "https://www.selectsafarisafrica.com/",
          "logo": "https://www.selectsafarisafrica.com/assets/logo.webp",
          "description": "Your trusted partner for unforgettable African safari experiences.",
          "address": "Rwanda, Uganda, Tanzania, Burundi"
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
