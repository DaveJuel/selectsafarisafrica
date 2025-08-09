import styled from "styled-components";
import { useTranslation } from "react-i18next";

export default function AboutUsView({ toggleView }) {
  const { t } = useTranslation("about_us");

  return (
    <ViewWrapper>
      <Header>
        <HeaderTitle>{t("who_we_are")}</HeaderTitle>
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
`;

const HeaderTitle = styled.h2`
  color: #0e5033;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #0e5033, #0e5033, #0e5033);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #e4bc87;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h3`
  color: #E4BC87;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;

`;

const SectionText = styled.p`
  color: #E4BC87;
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
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
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

const ReachOutBtn = styled.h3`
  color: #e4bc87;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    font-size: 22px;
    font-weight: 600;
    color: #e4bc87;
    text-decoration: underline;
  }
`;
