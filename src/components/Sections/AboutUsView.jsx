import { useTranslation } from "react-i18next";
import { Card, CardIcon, CardText, CardTitle, Content, GridSection, Header, HeaderTitle, Section, SectionText, SectionTitle, ViewWrapper } from "../../style/about.us.view.styles";

export default function AboutUsView() {
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
      </Content>
    </ViewWrapper>
  );
}
