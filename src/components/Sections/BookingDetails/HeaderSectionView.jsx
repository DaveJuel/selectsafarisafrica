import LogoComponent from "../../../assets/svg/Logo";
import {
  CompanyCard,
  CompanyInfo,
  CompanyLogo,
  CompanySection,
  ContactIcon,
  ContactInfo,
  ContactItem,
  ContactText,
  HeaderSection,
  HeaderSubSection,
  ItineraryHeader,
  ItineraryTitle,
  SectionHeader,
  SectionTitle,
  TravelerCard,
  TravelerContent,
  TravelerDetails,
  TravelerEmail,
  TravelerIcon,
  TravelerSection,
} from "../../../style/booking.details.styles";
import { SidebarTitle } from "../../../style/sidebar.view.styles";

export default function HeaderSectionView({ itinerary, goHome, bookingData, id }) {
  return (
    <div id={id}>
      <HeaderSection>
        <CompanyCard>
          <CompanySection>
            <CompanyLogo onClick={goHome}>
              <LogoComponent />
            </CompanyLogo>
            <CompanyInfo>
              <SidebarTitle onClick={goHome}>
                SELECT SAFARIS AFRICA
              </SidebarTitle>
              <ContactInfo>
                <ContactItem>
                  <ContactIcon>
                    <img src="/icons/whatsapp.png" alt="Contact" />
                  </ContactIcon>
                  <ContactText>+1 (480) 716-9630</ContactText>
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
                <img src="/icons/tourist2.png" alt="Email" />
              </TravelerIcon>
              <SectionTitle>{bookingData?.client_name || ""}</SectionTitle>
            </SectionHeader>
            <TravelerContent>
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
            </TravelerContent>
          </TravelerSection>
        </TravelerCard>
      </HeaderSection>
      <HeaderSubSection>
        <ItineraryHeader>
          <ItineraryTitle>{itinerary?.name}</ItineraryTitle>
        </ItineraryHeader>
      </HeaderSubSection>
    </div>
  );
}
