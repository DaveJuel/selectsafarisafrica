import { useTranslation } from "react-i18next";
import { Card, CardIcon, CardText, CardTitle, Content, GridSection, Header, HeaderTitle, ReachOutBtn, Section, SectionText, SectionTitle, ViewWrapper } from "../../style/about.us.view.styles";

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
