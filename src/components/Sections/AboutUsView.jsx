import styled from "styled-components";

export default function AboutUsView({ toggleView }) {
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
        <HeaderTitle>Who We Are</HeaderTitle>
        <HeaderSubtitle>
          Get to know: Our Story, Principles and Partners.
        </HeaderSubtitle>
      </Header>

      <Content>
        <Section>
          <SectionTitle>
            Unforgettable Adventures & Empowering in East Africa (Since 2018)
          </SectionTitle>
          <SectionText>
            Born from a passion for service and a love for East Africa, Select
            Safaris Africa was founded in 2018 by its founder. Recognizing a
            talent for creating exceptional experiences for international
            travelers, the founder envisioned a company that not only crafted
            unforgettable adventures but also served back to the communities.
            This is why 20% of the company profits directly support vulnerable
            mothers struggling financially across East Africa. We believe in
            sustainable tourism that enriches both travelers and the local
            people.
          </SectionText>
        </Section>

        <GridSection>
          <Card>
            <CardIcon>
              <img src="/icons/mountain.png" alt="Mountain" />
            </CardIcon>
            <CardTitle>Our mission</CardTitle>
            <CardText>
              We purpose to design and deliver unforgettable adventures that
              immerse our guests in local cultures, and create memories that
              last a lifetime.
            </CardText>
          </Card>

          <Card>
            <CardIcon>
              <img src="/icons/vision.png" alt="Vision" />
            </CardIcon>
            <CardTitle>Our vision</CardTitle>
            <CardText>
              We aim to be the leading force in crafting transformative travel
              experiences that ignite a passion for exploration of Africa's
              mysterious nature.
            </CardText>
          </Card>

          <Card>
            <CardIcon>
              <img src="/icons/values.png" alt="Values" />
            </CardIcon>
            <CardTitle>Our values</CardTitle>
            <CardText>
              Building success and trust starts with our core values which are:
              Guest Centricity, Authenticity, Integrity, and Sustainability.
            </CardText>
          </Card>
        </GridSection>
        <Section>
          <SectionTitle>Our Impact</SectionTitle>
          <GridSection>
            
            <Card>
              <CardIcon>
                <img src="/icons/mother.png" alt="Community Support" />
              </CardIcon>
              <CardTitle>Empowering Mothers</CardTitle>
              <CardText>
                Through our 20% profit commitment, we provide microfinance
                support and skills training to vulnerable mothers across East
                Africa, helping them establish sustainable income-generating
                activities and achieve financial independence.
              </CardText>
            </Card>
            <Card>
              <CardIcon>
                <img src="/icons/literature.png" alt="Education" />
              </CardIcon>
              <CardTitle>Education for All</CardTitle>
              <CardText>
                We fund basic education programs for children in underserved
                communities, providing school supplies, uniforms, and learning
                materials to ensure every child has access to quality education
                and brighter future opportunities.
              </CardText>
            </Card>
            <Card>
              <CardIcon>
                <img src="/icons/stats.png" alt="Impact" />
              </CardIcon>
              <CardTitle>Measurable Change</CardTitle>
              <CardText>
                Since 2018, we have supported over 500 mothers in starting small
                businesses and sponsored education for 1,200+ children, creating
                lasting positive change in East African communities through
                sustainable tourism.
              </CardText>
            </Card>
          </GridSection>
        </Section>

        <PartnersSection>
          <SectionTitle>Our Partners</SectionTitle>
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
            Contact Us
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
