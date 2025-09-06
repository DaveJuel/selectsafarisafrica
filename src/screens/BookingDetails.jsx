import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEntityData } from "../utils/RequestHandler";
import {
  getFormattedTripDate,
  sortItineraryActivities,
} from "../utils/DataHandler";
import EmptyStateView from "../components/Elements/EmptyStateView";
import LoadingSpinner from "../components/Elements/LoadingSpinner";
import LogoComponent from "../assets/svg/Logo";
import { emergencyContacts } from "../data/emergency.contacts";
import StyledLongText from "../components/Inputs/StyledLongText";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SidebarTitle } from "../style/sidebar.view.styles";
import {
  ActivitiesContainer,
  ActivityCard,
  ActivityContent,
  ActivityCost,
  ActivityDescription,
  ActivityDetails,
  ActivityHeader,
  ActivityImage,
  ActivityImageContainer,
  ActivityMeta,
  ActivityName,
  BodySection,
  CompanyCard,
  CompanyInfo,
  CompanyLogo,
  CompanySection,
  ContactIcon,
  ContactInfo,
  ContactItem,
  ContactText,
  ContentContainer,
  DayCard,
  DayDate,
  DayHeader,
  DayNumber,
  DaysContainer,
  EmergencyCard,
  EmergencyGrid,
  EmergencyNumber,
  EmergencyService,
  ExportButton,
  FooterContent,
  FooterSection,
  FooterTitle,
  HeaderSection,
  ItineraryHeader,
  ItineraryTitle,
  MetaIcon,
  MetaItem,
  SectionHeader,
  SectionTitle,
  TotalCost,
  TravelerCard,
  TravelerContent,
  TravelerDetails,
  TravelerEmail,
  TravelerIcon,
  TravelerInfo,
  TravelerSection,
} from "../style/booking.details.styles";

export default function BookingDetails() {
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState(null);
  const [itiniraryActivities, setItineraryActivities] = useState([]);
  const [bookingData, setBookingData] = useState(null);
  const [activitiesDetails, setActivitiesDetails] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const { bookingCode } = useParams();
  const printRef = useRef();
  const navigate = useNavigate();

  const goHome = ()=>{
    navigate("/");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const bookingResponse = await fetchEntityData("bookings");
        if (!bookingResponse.success) return;

        const booking = bookingResponse.result?.find(
          (b) => b.booking_code === bookingCode
        );
        if (!booking) return;

        setBookingData(booking);

        const itineraryName = booking.itinerary;

        const [
          itineraryResponse,
          itineraryActivitiesResponse,
          activitiesResponse,
        ] = await Promise.all([
          fetchEntityData("itineraries"),
          fetchEntityData("itinirary_activities"),
          fetchEntityData("activities"),
        ]);

        if (itineraryResponse.success) {
          const itineraryData = itineraryResponse.result?.find(
            (item) => item.name === itineraryName
          );
          setItinerary(itineraryData);
        }

        if (itineraryActivitiesResponse.success) {
          const itineraryActivitiesData =
            itineraryActivitiesResponse.result?.filter(
              (item) => item.itinerary === itineraryName
            );
          setItineraryActivities(itineraryActivitiesData);
        }

        if (activitiesResponse.success) {
          setActivitiesDetails(activitiesResponse.result);
        }
      } catch (error) {
        console.error("Failed fetching booking or itinerary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingCode]);

  useEffect(() => {
    if (activitiesDetails.length > 0) {
      const calculateTotalCost = () => {
        const totalAmount = itiniraryActivities?.reduce((sum, activity) => {
          const activityInfo = activitiesDetails?.find(
            (item) => item.name === activity.activity
          );
          return sum + parseFloat(activityInfo.estimated_cost || 0);
        }, 0);

        setTotalCost(totalAmount);
      };

      calculateTotalCost();
    }
  }, [activitiesDetails, itiniraryActivities]);

  const activities = sortItineraryActivities(itinerary, itiniraryActivities);

  const renderedDays = [];

  const handleDownloadPDF = async () => {
    const element = printRef.current;

    // Scroll to top so all elements render
    window.scrollTo(0, 0);

    // Capture element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      ignoreElements: (el) => el.classList.contains("no-pdf"),
    });

    const imgData = canvas.toDataURL("image/png");

    // PDF setup
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Image dimensions in PDF
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add extra pages if content is longer
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("booking.pdf");
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && !bookingData && (
        <EmptyStateView message={"Invalid booking code"} />
      )}
      {!loading && bookingData && (
        <ContentContainer ref={printRef}>
          {/* Header Section */}
          <HeaderSection>
            <CompanyCard>
              <CompanySection>
                <CompanyLogo onClick={goHome}>
                  <LogoComponent />
                </CompanyLogo>
                <CompanyInfo >
                  <SidebarTitle onClick={goHome}>SELECT SAFARIS AFRICA</SidebarTitle>
                  <ContactInfo>
                    <ContactItem>
                      <ContactIcon>
                        <img src="/icons/smartphone.png" alt="Contact" />
                      </ContactIcon>
                      <ContactText>+250 788 995 497</ContactText>
                    </ContactItem>
                    <ContactItem>
                      <ContactIcon>
                        <img src="/icons/mail2.png" alt="Email" />
                      </ContactIcon>
                      <ContactText>info@selectsafarisafrica.com</ContactText>
                    </ContactItem>
                    <ContactItem>
                      <ContactIcon>
                        <img src="/icons/world-wide-web.png" alt="Email" />
                      </ContactIcon>
                      <ContactText>selectsafarisafrica.com</ContactText>
                    </ContactItem>
                  </ContactInfo>
                </CompanyInfo>
              </CompanySection>
            </CompanyCard>

            <TravelerCard>
              <TravelerSection>
                <SectionHeader>
                  <TravelerIcon>
                    <img src="/icons/traveler.png" alt="Email" />
                  </TravelerIcon>
                  <SectionTitle>{bookingData?.client_name || ""}</SectionTitle>
                </SectionHeader>
                <TravelerContent>
                  <TravelerInfo>
                    <TravelerDetails>
                      <TravelerEmail>
                        <ContactIcon>
                          <img src="/icons/promo.png" alt="Email" />
                        </ContactIcon>
                        {bookingData?.booking_code || ""}
                      </TravelerEmail>
                      <TravelerEmail>
                        <ContactIcon>
                          <img src="/icons/contact-book.png" alt="Email" />
                        </ContactIcon>
                        {bookingData?.client_contact || ""}
                      </TravelerEmail>
                      <TravelerEmail>
                        <ContactIcon>
                          <img src="/icons/planet.png" alt="Email" />
                        </ContactIcon>
                        {bookingData?.country_of_origin || ""}
                      </TravelerEmail>
                    </TravelerDetails>
                  </TravelerInfo>
                </TravelerContent>
              </TravelerSection>
            </TravelerCard>
          </HeaderSection>

          {/* Body Section - Itinerary */}
          <BodySection>
            <ItineraryHeader>
              <ItineraryTitle>{itinerary?.name}</ItineraryTitle>
              <TotalCost>Complete package: ${totalCost}</TotalCost>
            </ItineraryHeader>

            <DaysContainer>
              {activities?.map((activity, index) => {
                if (renderedDays.includes(activity.day)) return null;
                renderedDays.push(activity.day);
                const dailyActivities = activities?.filter(
                  (item) => item.day === activity.day
                );

                return (
                  <DayCard key={index}>
                    <DayHeader>
                      <DayNumber>Day {activity.day}</DayNumber>
                      <DayDate>
                        {getFormattedTripDate(
                          bookingData.trip_start_date,
                          activity.day
                        )}
                      </DayDate>
                    </DayHeader>

                    <ActivitiesContainer>
                      {dailyActivities.map(
                        (dailyActivity, dailyActivityIndex) => {
                          const activityInfo = activitiesDetails?.find(
                            (item) => item.name === dailyActivity.activity
                          );
                          return (
                            <ActivityCard key={dailyActivityIndex}>
                              <ActivityImageContainer>
                                <ActivityImage
                                  src={activityInfo.image}
                                  alt={activityInfo.name}
                                />
                              </ActivityImageContainer>
                              <ActivityContent>
                                <ActivityHeader>
                                  <ActivityName>
                                    {activityInfo.name}
                                  </ActivityName>
                                  <ActivityCost>
                                    ${activityInfo.estimated_cost}
                                  </ActivityCost>
                                </ActivityHeader>
                                <ActivityDetails>
                                  <ActivityDescription>
                                    <StyledLongText
                                      value={activityInfo.description}
                                      maxLength={2000}
                                    />
                                  </ActivityDescription>
                                  <ActivityMeta>
                                    <MetaItem>
                                      <MetaIcon>
                                        <img
                                          src="/icons/early-bird.png"
                                          alt="starts"
                                        />
                                      </MetaIcon>{" "}
                                      Starts: {dailyActivity.time}
                                    </MetaItem>
                                    <MetaItem>
                                      <MetaIcon>
                                        <img
                                          src="/icons/time.png"
                                          alt="starts"
                                        />
                                      </MetaIcon>Lasts about {dailyActivity.duration}
                                    </MetaItem>
                                  </ActivityMeta>
                                </ActivityDetails>
                              </ActivityContent>
                            </ActivityCard>
                          );
                        }
                      )}
                    </ActivitiesContainer>
                  </DayCard>
                );
              })}
            </DaysContainer>
          </BodySection>

          {/* Footer Section */}
          <FooterSection>
            <FooterContent>
              <FooterTitle>Emergency Contacts</FooterTitle>
              <EmergencyGrid>
                {emergencyContacts?.map((contact, index) => (
                  <EmergencyCard key={index}>
                    <EmergencyService>{contact.service}</EmergencyService>
                    <EmergencyNumber>{contact.number}</EmergencyNumber>
                  </EmergencyCard>
                ))}
              </EmergencyGrid>
            </FooterContent>
          </FooterSection>
          <ExportButton className="no-pdf" onClick={handleDownloadPDF}>
            Export as PDF
          </ExportButton>
        </ContentContainer>
      )}
    </>
  );
}
