import SEO from "../components/Elements/SEO";
import MainView from "../components/Sections/MainView";

export default function Landing() {
  return (
    <>
      <SEO
        title="Select Safaris Africa | Rwanda, Tanzania, Uganda & Burundi Adventures"
        description="Discover East Africa’s top safari adventures with Select Safaris Africa. Experience gorilla trekking, cultural tours, wildlife safaris, and scenic landscapes across Rwanda, Tanzania, Uganda, and Burundi."
        image="https://www.selectsafarisafrica.com/assets/bg_image1.jpg"
        url="https://www.selectsafarisafrica.com/"
        schema={{
          "@context": "https://selectsafarisafrica.com",
          "@type": "TravelAgency",
          name: "Select Safaris Africa",
          url: "https://www.selectsafarisafrica.com/",
          logo: "https://www.selectsafarisafrica.com/assets/logo.webp",
          description:
            "Select Safaris Africa is your trusted partner for unforgettable African safari experiences, offering curated tours, wildlife adventures, cultural experiences, and luxury lodges in Rwanda, Tanzania, Uganda, and Burundi.",
          address: {
            "@type": "PostalAddress",
            addressCountry: "RW",
            addressRegion: "East Africa",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "East Africa Adventures",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "TouristTrip",
                  name: "Gorilla Trekking, Volcanoes National Park",
                  touristType: "Adventure Travelers",
                  description:
                    "Encounter mountain gorillas in their natural habitat in Rwanda. Includes guided trekking, permits, and conservation contributions.",
                  provider: {
                    "@type": "TravelAgency",
                    name: "Select Safaris Africa",
                  },
                  url: "https://www.selectsafarisafrica.com",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "TouristTrip",
                  name: "Lake Tanganyika Beach Retreat, Burundi",
                  touristType: "Relaxation & Nature Lovers",
                  description:
                    "Relax on the pristine shores of Lake Tanganyika, explore local fishing villages, and enjoy cultural interactions in Burundi.",
                  provider: {
                    "@type": "TravelAgency",
                    name: "Select Safaris Africa",
                  },
                  url: "https://www.selectsafarisafrica.com",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "TouristTrip",
                  name: "Serengeti National Park Safari, Tanzania",
                  touristType: "Wildlife Enthusiasts",
                  description:
                    "Spot the Big Five on guided game drives, enjoy scenic landscapes, and experience wildlife photography opportunities.",
                  provider: {
                    "@type": "TravelAgency",
                    name: "Select Safaris Africa",
                  },
                  url: "https://www.selectsafarisafrica.com",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "TouristTrip",
                  name: "Bwindi Impenetrable Forest Gorilla Trek, Uganda",
                  touristType: "Adventure Travelers",
                  description:
                    "Trek through Uganda's lush Bwindi Forest to encounter endangered mountain gorillas with experienced guides. Includes permits and conservation support.",
                  provider: {
                    "@type": "TravelAgency",
                    name: "Select Safaris Africa",
                  },
                  url: "https://www.selectsafarisafrica.com",
                },
              },
            ],
          },
        }}
      />
      <MainView />
    </>
  );
}
