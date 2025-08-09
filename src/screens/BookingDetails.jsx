import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
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

export default function BookingDetails() {
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState(null);
  const [itiniraryActivities, setItineraryActivities] = useState([]);
  const [bookingData, setBookingData] = useState(null);
  const [activitiesDetails, setActivitiesDetails] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const { bookingCode } = useParams();

  useEffect(() => {
    const fetchBookingData = async () => {
      const response = await fetchEntityData("bookings");
      if (response.success) {
        const bookingDetails = response.result?.find(
          (item) => item.booking_code === bookingCode
        );
        setBookingData(bookingDetails);
        return bookingDetails;
      }
    };

    const fetchItineraryData = async (itineraryName) => {
      const response = await fetchEntityData("itineraries");
      if (response.success) {
        const itineraryData = response.result?.find(
          (item) => item.name === itineraryName
        );
        setItinerary(itineraryData);
      }
    };

    const fetchItineraryActivities = async (itineraryName) => {
      const response = await fetchEntityData("itinirary_activities");
      if (response.success) {
        const itineraryActivitiesData = response.result?.filter(
          (item) => item.itinerary === itineraryName
        );
        setItineraryActivities(itineraryActivitiesData);
      }
    };

    const fetchActivitiesDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchEntityData("activities");
        if (response.success) {
          setActivitiesDetails(response.result);
        }
      } catch (error) {
        console.error("Failed to load activitied");
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        const booking = await fetchBookingData();
        await fetchItineraryData(booking.itinerary);
        await fetchItineraryActivities(booking.itinerary);
        await fetchActivitiesDetails();
      } catch (error) {
        console.error(`Failed fetching data`);
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

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && !bookingData && (
        <EmptyStateView message={"Invalid booking code"} />
      )}
      {!loading && bookingData && (
        <ContentContainer>
          {/* Header Section */}
          <HeaderSection>
            <CompanyCard>
              <CompanySection>
                <CompanyLogo>
                  <LogoComponent />
                </CompanyLogo>
                <CompanyInfo>
                  <CompanyName>SELECT SAFARIS AFRICA</CompanyName>
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
                          <img src="/icons/contact-book.png" alt="Email" />
                        </ContactIcon>
                        {bookingData?.client_email || ""}
                      </TravelerEmail>
                      <TravelerEmail>
                        <ContactIcon>
                          <img src="/icons/planet.png" alt="Email" />
                        </ContactIcon>
                        {bookingData?.country_of_origin	 || ""}
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
                                      🕐 Starts: {dailyActivity.time}
                                    </MetaItem>
                                    <MetaItem>
                                      ⏱️ Lasts about {dailyActivity.duration}
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
        </ContentContainer>
      )}
    </>
  );
}

const ContentContainer = styled.div`
  padding: 40px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0);
  background-image: url("/bg_image2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media print {
    border-radius: 0;
    box-shadow: none;
    backdrop-filter: none;
  }
`;

const HeaderSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 30px;
  border-bottom: 2px solid rgba(102, 126, 234, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const CompanySection = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;
  min-height: 120px; // Ensures consistent height
`;

const CompanyLogo = styled.div`
  width: 120px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const CompanyName = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  background: linear-gradient(135deg, #10a969 0%, #0e5033 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

const ContactText = styled.span`
  font-size: 16px;
  color: #e4bc87;
  font-weight: 500;
  transition: color 0.2s ease;

  ${ContactItem}:hover & {
    color: #10a969;
  }
`;

const CompanyCard = styled.div`
  padding: 24px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;

    ${CompanySection} {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 5px;
      min-height: auto;
    }

    ${CompanyLogo} {
      width: 100px;
      min-width: 100px;
    }

    ${CompanyName} {
      font-size: 28px;
    }

    ${ContactText} {
      font-size: 14px;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ContactIcon = styled.span`
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e4bc87 0%, #e4bc87 100%);
  border-radius: 8px;
  flex-shrink: 0;
  img {
    width: 20px;
    height: 20px;
  }
`;

const TravelerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f7fafc;
`;

const TravelerIcon = styled.div`
  font-size: 24px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10a969 0%, #10a969 100%);
  border-radius: 10px;
  color: white;
  box-shadow: 0 2px 8px rgba(115, 72, 44, 0.2);
  img {
    width: 40px;
    height: 40px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  background: linear-gradient(135deg, #10a969 0%, #10a969 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TravelerContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const TravelerInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #10a969 0%, #10a969 100%);
  }

  &:hover {
    transform: translateX(4px);
    border-color: rgba(115, 72, 44, 0.2);
  }
`;

const TravelerAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10a969 0%, #10a969 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(115, 72, 44, 0.3);
  border: 3px solid white;
`;

const TravelerDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TravelerName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  line-height: 1.2;
`;

const TravelerEmail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #e4bc87;
  font-weight: 500;
  transition: color 0.2s ease;
`;

const TravelerCard = styled.div`
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  height: fit-content;
  min-height: 168px;
  background: rgba(248, 247, 247, 0.25);
  backdrop-filter: blur(15px);

  @media (max-width: 768px) {
    padding: 20px;
    min-height: auto;

    ${SectionHeader} {
      gap: 8px;
    }

    ${TravelerIcon} {
      width: 32px;
      height: 32px;
      font-size: 18px;
    }

    ${SectionTitle} {
      font-size: 20px;
    }

    ${TravelerInfo} {
      flex-direction: column;
      text-align: center;
      gap: 12px;
      padding: 16px;
    }

    ${TravelerAvatar} {
      width: 48px;
      height: 48px;
      font-size: 20px;
    }

    ${TravelerName} {
      font-size: 18px;
    }
  }
`;

const BodySection = styled.div`
  padding: 30px;
`;

const ItineraryHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  background: rgba(248, 247, 247, 0.25);
  backdrop-filter: blur(15px);
  padding: 20px;
  border-radius: 16px;
`;

const ItineraryTitle = styled.h1`
  margin: 0 0 10px 0;
  font-size: 36px;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #0e5033, #0e5033, #0e5033);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #e4bc87;
`;

const TotalCost = styled.div`
  display: inline-block;
  padding: 12px 24px;
  color: #e4bc87;
  font-weight: 500;
  font-size: 18px;
  text-transform: uppercase;
`;

const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const DayCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.68);
  backdrop-filter: blur(10px);
`;

const DayHeader = styled.div`
  background: linear-gradient(135deg, #10a969 0%, #0e5033 100%);
  color: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DayNumber = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
`;

const DayDate = styled.div`
  font-size: 16px;
  opacity: 0.9;
`;

const ActivitiesContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ActivityCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(102, 126, 234, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
  }
`;

const ActivityImageContainer = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
`;

const ActivityImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 15px;
`;

const ActivityName = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  flex: 1;
`;

const ActivityCost = styled.div`
  background: #10a969;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
`;

const ActivityDetails = styled.div``;

const ActivityDescription = styled.p`
  margin: 0 0 12px 0;
  color: #4a5568;
  line-height: 1.6;
`;

const ActivityMeta = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  font-size: 14px;
  color: #0e5134;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FooterSection = styled.div`
  padding: 30px;
`;

const FooterContent = styled.div`
  border-radius: 16px;
  padding: 30px;
  background: rgba(248, 247, 247, 0.33);
  backdrop-filter: blur(30px);
  border-top: 2px solid rgba(102, 126, 234, 0.1);
`;

const FooterTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  text-align: center;
`;

const EmergencyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
`;

const EmergencyCard = styled.div`
  padding: 15px;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  text-align: center;
`;

const EmergencyService = styled.div`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 5px;
`;

const EmergencyNumber = styled.div`
  color: #10a969;
  font-weight: 600;
  font-size: 16px;
`;
