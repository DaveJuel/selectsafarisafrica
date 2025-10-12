import { useTranslation } from "react-i18next";
import {
  ActivitiesContainer,
  ActivityCard,
  ActivityContent,
  ActivityDescription,
  ActivityDetails,
  ActivityHeader,
  ActivityImage,
  ActivityImageContainer,
  ActivityMeta,
  ActivityName,
  BodySection,
  DayCard,
  DayDate,
  DayHeader,
  DayNumber,
  DaysContainer,
  MetaIcon,
  MetaItem
} from "../../../style/booking.details.styles";
import StyledLongText from "../../Inputs/StyledLongText";

export default function BodySectionView({
  activities,
  activitiesDetails,
  renderedDays,
  getFormattedTripDate,
  bookingData,
  id,
  language
}) {
  const { t } = useTranslation("booking_details");

  return (
    <BodySection id={id}>
      <DaysContainer>
        {activities?.map((activity, index) => {
          if (renderedDays.includes(activity.day)) return null;
          renderedDays.push(activity.day);
          const dailyActivities = activities?.filter(
            (item) => item.day === activity.day
          );

          return (
            <DayCard key={index} className="day-card">
              <DayHeader>
                <DayNumber>{t("day")} {activity.day}</DayNumber>
                <DayDate>
                  {getFormattedTripDate(
                    bookingData.trip_start_date,
                    activity.day,
                    language
                  )}
                </DayDate>
              </DayHeader>

              <ActivitiesContainer>
                {dailyActivities.map((dailyActivity, dailyActivityIndex) => {
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
                          <ActivityName>{activityInfo.name}</ActivityName>
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
                                <img src="/icons/early-bird.png" alt="starts" />
                              </MetaIcon>{" "}
                              {t("start")}: {dailyActivity.time}
                            </MetaItem>
                            <MetaItem>
                              <MetaIcon>
                                <img src="/icons/time.png" alt="starts" />
                              </MetaIcon>
                              {t("lasts")}: {dailyActivity.duration}
                            </MetaItem>
                          </ActivityMeta>
                        </ActivityDetails>
                      </ActivityContent>
                    </ActivityCard>
                  );
                })}
              </ActivitiesContainer>
            </DayCard>
          );
        })}
      </DaysContainer>
    </BodySection>
  );
}
