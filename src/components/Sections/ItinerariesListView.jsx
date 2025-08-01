import styled from "styled-components";
import { sortItineraryActivities } from "../../utils/DataHandler";

const ItinerariesListView = ({
  itineraries,
  itinerariesActivities,
  openBookTripModal,
}) => {
  return (
    <ItinerariesGrid>
      {itineraries?.map((itinerary) => {
        const activities = sortItineraryActivities(itinerary, itinerariesActivities);
        return (
          <ItineraryCard key={itinerary.id}>
            <CardHeader>
              <ItineraryName>{itinerary.name}</ItineraryName>
              <SeasonBadge>{itinerary.season}</SeasonBadge>
            </CardHeader>

            <DurationInfo>
              <DurationIcon>📅</DurationIcon>
              <DurationText>{itinerary.days} Days</DurationText>
            </DurationInfo>

            <ActivitiesSection>
              <ActivitiesTitle>What You'll Do</ActivitiesTitle>
              <ActivitiesList>
                {activities.map((item, index) => (
                  <ActivityItem key={index}>
                    <ActivityContent>
                      <ActivityHeader>
                        <DayBadge>Day {item.day}</DayBadge>
                        <TimeTag>{item.time}</TimeTag>
                      </ActivityHeader>
                      <ActivityDescription>{item.activity}</ActivityDescription>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </ActivitiesList>
            </ActivitiesSection>

            <CardFooter onClick={() => openBookTripModal(itinerary, activities)}>
              <ActionBtn>BOOK NOW</ActionBtn>
            </CardFooter>
          </ItineraryCard>
        );
      })}
    </ItinerariesGrid>
  );
};

// Styled Components
const ItinerariesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ItineraryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const ItineraryName = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  flex: 1;
`;

const SeasonBadge = styled.span`
  background: linear-gradient(135deg, #10A969 0%, #0E5033 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DurationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 25px;
  padding: 12px 16px;
  background: #f8f9ff;
  border-radius: 8px;
  border-left: 4px solid #10A969;
`;

const DurationIcon = styled.span`
  font-size: 18px;
`;

const DurationText = styled.span`
  color: #333;
  font-size: 16px;
  font-weight: 600;
`;

const ActivitiesSection = styled.div`
  margin-bottom: 20px;
`;

const ActivitiesTitle = styled.h3`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #fafbfc;
  border-radius: 8px;
  border: 1px solid #e8eaed;
  transition: all 0.2s ease;
  &:hover {
    background: #f0f2f5;
    border-color: #dadce0;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

// const ActivityIcon = styled.span`
//   font-size: 16px;
//   flex-shrink: 0;
//   margin-top: 2px;
// `;

const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const DayBadge = styled.span`
  background: linear-gradient(135deg, #10A969 0%, #0E5033 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
`;

const TimeTag = styled.span`
  background: #e8f5e8;
  color: #2d5a2d;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #c8e6c8;
`;

const ActivityDescription = styled.span`
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  border-top: 1px solid #e1e5e9;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9ff;
    border-top-color: #10A969;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ActionBtn = styled.div`
  color: #0E5033;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  ${CardFooter}:hover & {
    color: #10A969;
    font-weight: 600;
  }
`;

export default ItinerariesListView;
