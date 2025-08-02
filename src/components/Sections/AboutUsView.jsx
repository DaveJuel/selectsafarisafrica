import styled from "styled-components";
import { useTranslation } from "react-i18next";

export default function AboutUsView({ toggleView }) {
  const { t } = useTranslation("about_us");

  const partners = [
    {
      id: 1,
      name: "BRAC",
      logo: "/partners/brac.webp",
    },
    {
      id: 2,
      name: "Alpha Tours",
      logo: "/partners/alpha-tours.webp",
    },
    {
      id: 3,
      name: "Clinton Foundation",
      logo: "/partners/clinton-foundation.webp",
    },
    {
      id: 4,
      name: "ea-agro",
      logo: "/partners/ea-agro.webp",
    },
    {
      id: 5,
      name: "kumudini cares",
      logo: "/partners/kumudini-cares.webp",
    },
    {
      id: 6,
      name: "RaahQ",
      logo: "/partners/raahq.webp",
    },
    {
      id: 7,
      name: "Satguru",
      logo: "/partners/satguru.webp",
    },
    {
      id: 8,
      name: "Practical Action",
      logo: "/partners/practical-action.webp",
    },
    {
      id: 9,
      name: "Waheguru",
      logo: "/partners/waheguru-travels.webp",
    },
  ];

  return (
    <ViewWrapper>
      <Header>
        <HeaderTitle>{t("who_we_are")}</HeaderTitle>
        <HeaderSubtitle>{t("get_to_know_us")}</HeaderSubtitle>
      </Header>

      <Content>
        <Section>
          <SectionTitle>{t("unforgetable_adventures")}</SectionTitle>
          <SectionText>{t("our_story")}</SectionText>
        </Section>

        <GridSection>
          <Card>
            <CardIcon>
              <img src="/icons/mountain.png" alt="Mountain" />
            </CardIcon>
            <CardTitle>{t("our_mission")}</CardTitle>
            <CardText>{t("mission")}</CardText>
          </Card>

          <Card>
            <CardIcon>
              <img src="/icons/vision.png" alt="Vision" />
            </CardIcon>
            <CardTitle>{t("our_vision")}</CardTitle>
            <CardText>{t("vision")}</CardText>
          </Card>

          <Card>
            <CardIcon>
              <img src="/icons/values.png" alt="Values" />
            </CardIcon>
            <CardTitle>{t("our_values")}</CardTitle>
            <CardText>{t("values")}</CardText>
          </Card>
        </GridSection>
        <Section>
          <SectionTitle>{t("our_impact")}</SectionTitle>
          <GridSection>
            <Card>
              <CardIcon>
                <img src="/icons/mother.png" alt="Community Support" />
              </CardIcon>
              <CardTitle>{t("empower_mothers")}</CardTitle>
              <CardText>{t("empower_mothers_impact")}</CardText>
            </Card>
            <Card>
              <CardIcon>
                <img src="/icons/literature.png" alt="Education" />
              </CardIcon>
              <CardTitle>{t("education_for_all")}</CardTitle>
              <CardText>{t("education_for_all_impact")}</CardText>
            </Card>
            <Card>
              <CardIcon>
                <img src="/icons/stats.png" alt="Impact" />
              </CardIcon>
              <CardTitle>{t("measurable_change")}</CardTitle>
              <CardText>{t("measurable_change_impact")}</CardText>
            </Card>
          </GridSection>
        </Section>

        <PartnersSection>
          <SectionTitle>{t("our_partners")}</SectionTitle>
          <PartnerGrid>
            {partners.map((partner) => (
              <Partner key={partner.id}>
                <PartnerLogo src={partner.logo} alt={`${partner.name} logo`} />
              </Partner>
            ))}
          </PartnerGrid>
        </PartnersSection>
        <Section>
          <ReachOutBtn onClick={() => toggleView("contact-us")}>
            {t("contact_us")}
          </ReachOutBtn>
        </Section>
      </Content>
    </ViewWrapper>
  );
}

const ViewWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
`;

const HeaderTitle = styled.h2`
  color: #0e5033;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const HeaderSubtitle = styled.p`
  color: #0e5033;
  font-size: 16px;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h3`
  color: #0e5033;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
`;

const SectionText = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  padding: 25px;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #eee;
`;

const CardIcon = styled.div`
  font-size: 40px;
  margin-bottom: 15px;
  img {
    width: 40px;
    height: 40px;
  }
`;

const CardTitle = styled.h4`
  color: #0e5033;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const PartnersSection = styled.div`
  margin: 50px 0;
`;

const PartnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Partner = styled.div`
  padding: 30px 20px;
  background: #ffffff;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const PartnerLogo = styled.img`
  width: 120px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 15px;
  filter: grayscale(100%);
  transition: filter 0.3s ease;

  ${Partner}:hover & {
    filter: grayscale(0%);
  }
`;

const ReachOutBtn = styled.h3`
  color: #0e5033;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    font-size: 22px;
    font-weight: 600;
    color: #0b3e29;
    text-decoration: underline;
  }
`;
