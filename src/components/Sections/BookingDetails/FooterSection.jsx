import { useTranslation } from "react-i18next";
import {
  EmergencyCard,
  EmergencyGrid,
  EmergencyNumber,
  EmergencyService,
  FooterContent,
  FooterSection,
  FooterTitle,
} from "../../../style/booking.details.styles";

export default function FooterSectionView({
  itinerary,
  getEmergencyContacts,
  id,
}) {
  const { t } = useTranslation("booking_details");
  return (
    <FooterSection id={id}>
      <FooterContent>
        <FooterTitle>{t("emergency_contact")}</FooterTitle>
        <EmergencyGrid>
          {getEmergencyContacts(itinerary.country)?.map((contact, index) => (
            <EmergencyCard key={index}>
              <EmergencyService>{t(contact.service)}</EmergencyService>
              <EmergencyNumber>{contact.number}</EmergencyNumber>
            </EmergencyCard>
          ))}
        </EmergencyGrid>
      </FooterContent>
    </FooterSection>
  );
}
