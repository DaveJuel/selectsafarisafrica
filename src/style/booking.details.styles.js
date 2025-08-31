import styled from "styled-components";


export const  ContentContainer = styled.div`
  padding: 40px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0);
  background-image: url("/bg_image2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: 15px;
    background-position: top center; // keep important parts of image visible
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 480px) {
    padding: 5px 0px;
    background-position: top center;
    background-size: cover;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }

  @media print {
    border-radius: 0;
    box-shadow: none;
    backdrop-filter: none;
  }
`;


export const  HeaderSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 30px;
  border-bottom: 2px solid rgba(102, 126, 234, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const  CompanySection = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;
  min-height: 120px; // Ensures consistent height
`;

export const  CompanyLogo = styled.div`
  width: 120px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
`;

export const  CompanyInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

export const  CompanyName = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  background: linear-gradient(135deg, #10a969 0%, #0e5033 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

export const  ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

export const  ContactText = styled.span`
  font-size: 16px;
  color: #e4bc87;
  font-weight: 500;
  transition: color 0.2s ease;

  ${ContactItem}:hover & {
    color: #10a969;
  }
`;

export const  CompanyCard = styled.div`
  padding: 24px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;

    ${CompanySection} {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 5px;
      min-height: auto;
    }

    ${CompanyLogo} {
      width: 100px;
      min-width: 100px;
    }

    ${CompanyName} {
      font-size: 28px;
    }

    ${ContactText} {
      font-size: 14px;
    }
  }
`;

export const  ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const  ContactIcon = styled.span`
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e4bc87 0%, #e4bc87 100%);
  border-radius: 8px;
  flex-shrink: 0;
  img {
    width: 20px;
    height: 20px;
  }
`;

export const  TravelerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

export const  SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f7fafc;
`;

export const  TravelerIcon = styled.div`
  font-size: 24px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10a969 0%, #10a969 100%);
  border-radius: 10px;
  color: white;
  box-shadow: 0 2px 8px rgba(115, 72, 44, 0.2);
  img {
    width: 40px;
    height: 40px;
  }
`;

export const  SectionTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  background: linear-gradient(135deg, #10a969 0%, #10a969 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const  TravelerContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const  TravelerInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #10a969 0%, #10a969 100%);
  }

  &:hover {
    transform: translateX(4px);
    border-color: rgba(115, 72, 44, 0.2);
  }
`;

export const  TravelerAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10a969 0%, #10a969 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(115, 72, 44, 0.3);
  border: 3px solid white;
`;

export const  TravelerDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const  TravelerName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  line-height: 1.2;
`;

export const  TravelerEmail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #e4bc87;
  font-weight: 500;
  transition: color 0.2s ease;
`;

export const  TravelerCard = styled.div`
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  height: fit-content;
  min-height: 168px;
  background: rgba(248, 247, 247, 0.25);
  backdrop-filter: blur(15px);

  @media (max-width: 768px) {
    padding: 20px;
    min-height: auto;

    ${SectionHeader} {
      gap: 8px;
    }

    ${TravelerIcon} {
      width: 32px;
      height: 32px;
      font-size: 18px;
    }

    ${SectionTitle} {
      font-size: 20px;
    }

    ${TravelerInfo} {
      flex-direction: column;
      text-align: center;
      gap: 12px;
      padding: 16px;
    }

    ${TravelerAvatar} {
      width: 48px;
      height: 48px;
      font-size: 20px;
    }

    ${TravelerName} {
      font-size: 18px;
    }
  }
`;

export const BodySection = styled.div`
  padding: 30px;

  @media (max-width: 1024px) {
    padding: 25px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const ItineraryHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  background: rgba(248, 247, 247, 0.25);
  backdrop-filter: blur(15px);
  padding: 20px;
  border-radius: 16px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
    padding: 16px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
    padding: 12px;
    border-radius: 10px;
  }
`;

export const ItineraryTitle = styled.h1`
  margin: 0 0 10px 0;
  font-size: 36px;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #0e5033, #0e5033, #0e5033);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #e4bc87;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 6px;
  }
`;

export const TotalCost = styled.div`
  display: inline-block;
  padding: 12px 24px;
  color: #e4bc87;
  font-weight: 500;
  font-size: 18px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;


export const  DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const DayCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.68);
  backdrop-filter: blur(10px);
`;

export const DayHeader = styled.div`
  background: linear-gradient(135deg, #10a969 0%, #0e5033 100%);
  color: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 15px 20px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
  }
`;

export const DayNumber = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const  DayDate = styled.div`
  font-size: 16px;
  opacity: 0.9;
`;

export const ActivitiesContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ActivityCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(102, 126, 234, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const ActivityImageContainer = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

export const ActivityImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
`;

export const ActivityName = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #000000ff;
  flex: 1;
`;

export const ActivityCost = styled.div`
  background: #10a969;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
`;

export const ActivityDetails = styled.div`
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const ActivityDescription = styled.p`
  margin: 0 0 12px 0;
  color: #4a5568;
  line-height: 1.6;
`;

export const ActivityMeta = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const MetaItem = styled.div`
  font-size: 14px;
  color: #0e5134;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const FooterSection = styled.div`
  padding: 20px;

  @media (min-width: 768px) {
    padding: 30px; /* restore default padding on medium+ screens */
  }
`;

export const FooterContent = styled.div`
  border-radius: 16px;
  padding: 20px;
  background: rgba(248, 247, 247, 0.33);
  backdrop-filter: blur(30px);
  border-top: 2px solid rgba(102, 126, 234, 0.1);

  @media (min-width: 768px) {
    padding: 30px; /* more space on larger screens */
  }
`;

export const FooterTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 24px; /* bigger headline on larger screens */
    margin-bottom: 20px;
  }
`;

export const EmergencyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* single column by default */
  gap: 15px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

export const EmergencyCard = styled.div`
  padding: 12px;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  text-align: center;

  @media (min-width: 768px) {
    padding: 15px; /* restore padding on larger screens */
  }
`;

export const EmergencyService = styled.div`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export const EmergencyNumber = styled.div`
  color: #10a969;
  font-weight: 600;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export const ExportButton = styled.button`
  background: #0e5435;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin: 0 auto 16px auto;
  display: block;
  transition: background-color 0.2s;

  &:hover {
    background: #10a969;
  }

  @media (min-width: 768px) {
    padding: 12px 24px; /* bigger button on larger screens */
    margin-bottom: 20px;
  }

  @media print {
    display: none;
  }
`;

