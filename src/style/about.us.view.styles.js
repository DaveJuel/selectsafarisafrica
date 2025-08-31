import styled from "styled-components";

export const ViewWrapper = styled.div`
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    padding-bottom: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 15px;
    padding-bottom: 10px;
  }
`;

export const HeaderTitle = styled.h2`
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

  @media (max-width: 1024px) {
    font-size: 40px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
    -webkit-text-stroke-width: 0.8px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    -webkit-text-stroke-width: 0.5px;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 95%;
  }
`;

export const Section = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
    background: rgba(0, 0, 0, 0.4); /* semi-dark overlay */
    border-radius: 8px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
    background: rgba(0, 0, 0, 0.5); /* slightly stronger for smaller screens */
    border-radius: 8px;
    padding: 12px;
  }
`;


export const SectionTitle = styled.h3`
  color: #e4bc87;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const SectionText = styled.p`
  color: #e4bc87;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 15px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    max-width: 100%;
  }
`;

export const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    gap: 20px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    gap: 15px;
    margin-bottom: 20px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Card = styled.div`
  padding: 25px;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #eee;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

export const CardIcon = styled.div`
  font-size: 40px;
  margin-bottom: 15px;

  img {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 768px) {
    font-size: 32px;

    img {
      width: 32px;
      height: 32px;
    }
  }

  @media (max-width: 480px) {
    font-size: 28px;

    img {
      width: 28px;
      height: 28px;
    }
  }
`;

export const CardTitle = styled.h4`
  color: #0e5033;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const CardText = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const ReachOutBtn = styled.h3`
  color: #e4bc87;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    font-size: 20px;
    font-weight: 600;
    color: #e4bc87;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 16px;

    &:hover {
      font-size: 18px; /* smaller jump to avoid layout shift on mobile */
    }
  }
`;