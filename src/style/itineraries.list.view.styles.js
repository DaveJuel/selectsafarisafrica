import styled from "styled-components";

// Styled Components
export const ItinerariesGrid = styled.div`
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

export const ItineraryCard = styled.div`
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

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const ItineraryName = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  flex: 1;
`;

export const SeasonBadge = styled.span`
  background: linear-gradient(135deg, #10A969 0%, #0E5033 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DurationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 25px;
  padding: 12px 16px;
  background: #f8f9ff;
  border-radius: 8px;
  border-left: 4px solid #10A969;
`;

export const DurationIcon = styled.span`
  font-size: 18px;
`;

export const DurationText = styled.span`
  color: #333;
  font-size: 16px;
  font-weight: 600;
`;

export const ActivitiesSection = styled.div`
  margin-bottom: 20px;
`;

export const ActivitiesTitle = styled.h3`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const ActivitiesList = styled.div`
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

export const ActivityItem = styled.div`
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

// export const ActivityIcon = styled.span`
//   font-size: 16px;
//   flex-shrink: 0;
//   margin-top: 2px;
// `;

export const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const DayBadge = styled.span`
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

export const TimeTag = styled.span`
  background: #e8f5e8;
  color: #2d5a2d;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #c8e6c8;
`;

export const ActivityDescription = styled.span`
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
`;

export const CardFooter = styled.div`
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

export const ActionBtn = styled.div`
  color: #0E5033;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  ${CardFooter}:hover & {
    color: #10A969;
    font-weight: 600;
  }
`;