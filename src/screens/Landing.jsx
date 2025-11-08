import SEO from "../components/Elements/SEO";
import MainView from "../components/Sections/MainView";

export default function Landing() {
  return (
    <>
      <SEO
        title="Select Safaris Africa | Safari Tours, Visa Assistance & Travel Packages in Rwanda, Tanzania, Uganda & Burundi"
        description="Plan your African adventure with Select Safaris Africa. We arrange safaris, tours, and visa assistance for unforgettable trips across Rwanda, Tanzania, Uganda & Burundi. Explore wildlife, culture, and nature—all in one trusted travel package."
        image="https://www.selectsafarisafrica.com/assets/bg_image1.jpg"
        url="https://www.selectsafarisafrica.com/"
        schema={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Select Safaris Africa",
          url: "https://www.selectsafarisafrica.com/",
          logo: "https://www.selectsafarisafrica.com/assets/logo.webp",
          description:
            "Select Safaris Africa offers East African safari tours, visa assistance, and cultural experiences across Rwanda, Tanzania, Uganda, and Burundi.",
          keywords:
            "East Africa safari, Rwanda visa, Tanzania safari visa, Uganda tours, Burundi travel visa, gorilla trekking permits, East Africa Tourist Visa, safari packages, travel assistance",
          sameAs: [
            "https://x.com/selectsafaris",
            "https://www.instagram.com/selectsafarisafrica/",
            "https://www.tiktok.com/@selectsafarisafrica",
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "RW",
            addressRegion: "East Africa",
          },
          makesOffer: {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Visa Assistance & Travel Planning",
              description:
                "We assist travelers in obtaining Rwanda, Uganda, Tanzania, and Burundi visas, including guidance on the East Africa Tourist Visa.",
              serviceType: "Visa Consultation",
              provider: {
                "@type": "TravelAgency",
                name: "Select Safaris Africa",
              },
            },
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "East Africa Adventures",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "TouristTrip",
                  name: "Gorilla Trekking, Volcanoes National Park (Rwanda)",
                  touristType: "Adventure Travelers",
                  description:
                    "Encounter mountain gorillas in their natural habitat in Rwanda. Includes guided trekking, permits, and visa assistance for East Africa Tourist Visa.",
                  provider: { "@type": "TravelAgency", name: "Select Safaris Africa" },
                  url: "https://www.selectsafarisafrica.com",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "TouristTrip",
                  name: "Lake Tanganyika Beach Retreat (Burundi)",
                  touristType: "Relaxation & Nature Lovers",
                  description:
                    "Relax on the pristine shores of Lake Tanganyika, explore local fishing villages, and enjoy cultural experiences in Burundi. Visa support available.",
                  provider: { "@type": "TravelAgency", name: "Select Safaris Africa" },
                  url: "https://www.selectsafarisafrica.com",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "TouristTrip",
                  name: "Serengeti National Park Safari (Tanzania)",
                  touristType: "Wildlife Enthusiasts",
                  description:
                    "Spot the Big Five on guided game drives, enjoy scenic landscapes, and get help with Tanzania safari visa and travel arrangements.",
                  provider: { "@type": "TravelAgency", name: "Select Safaris Africa" },
                  url: "https://www.selectsafarisafrica.com",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "TouristTrip",
                  name: "Bwindi Impenetrable Forest Gorilla Trek (Uganda)",
                  touristType: "Adventure Travelers",
                  description:
                    "Trek through Uganda's lush Bwindi Forest to encounter endangered gorillas. Includes permits, visa assistance, and conservation contributions.",
                  provider: { "@type": "TravelAgency", name: "Select Safaris Africa" },
                  url: "https://www.selectsafarisafrica.com",
                },
              },
            ],
          },
        }}
        additionalSchemas={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do I need a visa to visit Rwanda, Uganda, or Tanzania?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, most travelers need a visa. Select Safaris Africa helps you obtain the East Africa Tourist Visa that covers multiple countries in one application.",
                },
              },
              {
                "@type": "Question",
                name: "Can Select Safaris Africa assist with visa applications?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we provide full visa assistance for Rwanda, Uganda, Tanzania, and Burundi, helping you simplify your safari and travel experience.",
                },
              },
              {
                "@type": "Question",
                name: "What countries are included in the East Africa Tourist Visa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The East Africa Tourist Visa allows travel between Rwanda, Uganda, and Kenya using a single visa. Select Safaris Africa guides travelers on how to apply.",
                },
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "TouristInformationCenter",
            name: "Select Safaris Africa",
            url: "https://www.selectsafarisafrica.com/",
            description:
              "Select Safaris Africa provides safari tours, wildlife experiences, visa assistance, and curated travel packages across Rwanda, Uganda, Tanzania, and Burundi.",
            areaServed: [
              "Rwanda",
              "Uganda",
              "Tanzania",
              "Burundi",
              "East Africa"
            ],
            sameAs: [
              "https://www.tripadvisor.com/",
              "https://www.getyourguide.com/",
              "https://www.viator.com/",
              "https://www.safaribookings.com/",
              "https://www.lonelyplanet.com/",
              "https://www.expedia.com/",
              "https://www.booking.com/",
              "https://www.airbnb.com/",
              "https://www.kayak.com/"
            ],
            keywords: [
              "TripAdvisor Rwanda",
              "GetYourGuide Rwanda",
              "East Africa safari companies",
              "Rwanda tour operators",
              "African safari booking",
              "best safari tours East Africa",
              "wildlife tours Rwanda",
              "tourism companies in Rwanda",
              "tour companies similar to TripAdvisor",
              "Rwanda travel agency reviews",
              "safari tour booking platforms",
              "African travel packages"
            ],
            subjectOf: {
              "@type": "WebPage",
              name: "East Africa Travel & Safari Services",
              description:
                "Comparable to platforms like TripAdvisor, Viator, and GetYourGuide, Select Safaris Africa offers safari planning, tour booking, and visa assistance across East Africa.",
              url: "https://www.selectsafarisafrica.com/"
            }
          }
        ]}
        openGraph={{
          type: "website",
          title:
            "Select Safaris Africa | Safari Tours, Visa Assistance & East Africa Travel Packages",
          description:
            "Discover the best safaris and travel experiences across Rwanda, Uganda, Tanzania, and Burundi with full visa assistance from Select Safaris Africa.",
          image: "https://www.selectsafarisafrica.com/assets/bg_image1.jpg",
          url: "https://www.selectsafarisafrica.com/",
          site_name: "Select Safaris Africa",
        }}
        twitter={{
          card: "summary_large_image",
          site: "@SelectSafarisAfrica",
          title:
            "Select Safaris Africa | Safari Tours & Visa Assistance in East Africa",
          description:
            "Explore East Africa’s wonders — safaris, tours, and full visa support across Rwanda, Uganda, Tanzania & Burundi.",
          image: "https://www.selectsafarisafrica.com/assets/bg_image1.jpg",
        }}
      />
      <MainView />
    </>
  );
}
