import styled from 'styled-components';

const ActivitiesListView = ({ itinerariesActivities, itineraryName }) => {
  
  const groupedActivities = itinerariesActivities.reduce((groups, activity) => {
      const day = activity.day;
      const time = activity.time || 'morning';
      
      if (!groups[day]) {
        groups[day] = {};
      }
      if (!groups[day][time]) {
        groups[day][time] = [];
      }
      groups[day][time].push(activity);
      return groups;
    }, {});

  const sortedDays = Object.keys(groupedActivities).sort((a, b) => Number(a) - Number(b));
  
  const timeOrder = ['morning', 'afternoon', 'evening', 'night'];

  return (
    <ActivitiesContainer>
      {sortedDays.map((day, dayIndex) => (
        <DayGroup key={day}>
          <DayHeader>
            <DayBadge>
              <DayNumber>Day {day}</DayNumber>
            </DayBadge>
            <DayLine />
          </DayHeader>
          
          <DayContent>
            {timeOrder.map((timeSlot) => {
              if (!groupedActivities[day][timeSlot]) return null;
              
              return (
                <TimeSlot key={`${day}-${timeSlot}`}>
                  <TimeHeader>
                    <TimeIcon>{getTimeIcon(timeSlot)}</TimeIcon>
                    <TimeLabel>{capitalizeFirst(timeSlot)}</TimeLabel>
                  </TimeHeader>
                  
                  <TimeActivities>
                    {groupedActivities[day][timeSlot].map((item, activityIndex) => (
                      <ActivityCard key={`${day}-${timeSlot}-${activityIndex}`}>
                        <ActivityIcon>
                          {getActivityIcon(item.activity)}
                        </ActivityIcon>
                        <ActivityContent>
                          <ActivityText>{item.activity}</ActivityText>
                          {item.duration && (
                            <ActivityDuration>
                              <ClockIcon>⏱️</ClockIcon>
                              {item.duration}
                            </ActivityDuration>
                          )}
                        </ActivityContent>
                        <ActivityNumber>
                          {String(activityIndex + 1).padStart(2, '0')}
                        </ActivityNumber>
                      </ActivityCard>
                    ))}
                  </TimeActivities>
                </TimeSlot>
              );
            })}
          </DayContent>
          
          {dayIndex < sortedDays.length - 1 && <DayConnector />}
        </DayGroup>
      ))}
    </ActivitiesContainer>
  );
};

// Helper functions
const getTimeIcon = (time) => {
  const timeIcons = {
    morning: '🌅',
    afternoon: '☀️',
    evening: '🌆',
    night: '🌙'
  };
  return timeIcons[time] || '⏰';
};

const getActivityIcon = (activity) => {
  const activityLower = activity.toLowerCase();
  if (activityLower.includes('temple') || activityLower.includes('church') || activityLower.includes('cathedral')) return '⛩️';
  if (activityLower.includes('museum') || activityLower.includes('gallery')) return '🏛️';
  if (activityLower.includes('food') || activityLower.includes('restaurant') || activityLower.includes('cooking')) return '🍽️';
  if (activityLower.includes('beach') || activityLower.includes('ocean') || activityLower.includes('sea')) return '🏖️';
  if (activityLower.includes('mountain') || activityLower.includes('hike') || activityLower.includes('trek')) return '🏔️';
  if (activityLower.includes('shopping') || activityLower.includes('market')) return '🛍️';
  if (activityLower.includes('spa') || activityLower.includes('wellness')) return '🧘';
  if (activityLower.includes('cruise') || activityLower.includes('boat') || activityLower.includes('ferry')) return '⛵';
  if (activityLower.includes('tower') || activityLower.includes('viewpoint') || activityLower.includes('observation')) return '🗼';
  if (activityLower.includes('park') || activityLower.includes('garden')) return '🌳';
  return '📍';
};

const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Styled Components
const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const DayGroup = styled.div`
  position: relative;
`;

const DayHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
`;

const DayBadge = styled.div`
  background: linear-gradient(135deg, #10A969 0%, #0E5033 100%);
  border-radius: 20px;
  padding: 10px 18px;
  box-shadow: 0 3px 12px rgba(102, 126, 234, 0.3);
  flex-shrink: 0;
`;

const DayNumber = styled.span`
  color: white;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const DayLine = styled.div`
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, #10A969 0%, transparent 100%);
  border-radius: 1px;
`;

const DayContent = styled.div`
  margin-left: 20px;
  padding-left: 20px;
  border-left: 2px solid #e8ecf0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TimeSlot = styled.div`
  position: relative;
`;

const TimeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: #f8f9ff;
  border-radius: 8px;
  border-left: 3px solid #10A969;
`;

const TimeLabel = styled.span`
  color: #4a5568;
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
`;

const TimeActivities = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 16px;
`;

const ActivityCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: white;
  border-radius: 10px;
  border: 1px solid #e8ecf0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #10A969;
  }

  &:hover::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(135deg, #10A969 0%, #0E5033 100%);
    border-radius: 0 10px 10px 0;
  }
`;

const ActivityIcon = styled.div`
  font-size: 18px;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9ff;
  border-radius: 8px;
`;

const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ActivityText = styled.span`
  color: #2d3748;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

const ActivityDuration = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #718096;
  font-size: 11px;
`;

const ClockIcon = styled.span`
  font-size: 10px;
`;

const ActivityNumber = styled.div`
  background: #f7fafc;
  color: #4a5568;
  border-radius: 6px;
  padding: 3px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
`;

const DayConnector = styled.div`
  width: 2px;
  height: 24px;
  background: #e8ecf0;
  margin: 16px 0 16px 29px;
`;

const TimeIcon = styled.span`
  font-size: 16px;
`;

export default ActivitiesListView;
