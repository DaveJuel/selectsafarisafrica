import { EmergencyCard, EmergencyGrid, EmergencyNumber, EmergencyService, FooterContent, FooterSection, FooterTitle } from "../../../style/booking.details.styles";

export default function FooterSectionView({
    itinerary,
    getEmergencyContacts
}) {
  return (
    <FooterSection id="footer-section">
      <FooterContent>
        <FooterTitle >Emergency Contacts</FooterTitle>
        <EmergencyGrid>
          {getEmergencyContacts(itinerary.country)?.map((contact, index) => (
            <EmergencyCard key={index}>
              <EmergencyService>{contact.service}</EmergencyService>
              <EmergencyNumber >{contact.number}</EmergencyNumber>
            </EmergencyCard>
          ))}
        </EmergencyGrid>
      </FooterContent>
    </FooterSection>
  );
}
