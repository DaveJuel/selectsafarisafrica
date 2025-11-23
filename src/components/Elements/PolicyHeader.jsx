import styled from "styled-components";
import { useTranslation } from "react-i18next";

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  @media (max-width: 768px) {
    padding: 24px;
    margin-bottom: 24px;
  }
`;

const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  background: rgba(248, 247, 247, 0.24);
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 20px;
  }
`;

const BrandInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandName = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1e1e1e;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const OwnerName = styled.div`
  font-size: 16px;
  color: #555;
  margin-top: 6px;

  strong {
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContactLine = styled.div`
  font-size: 16px;
  color: #333;
  margin-top: 4px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Logo = styled.img`
  height: 70px;
  width: auto;
  object-fit: contain;
  border-radius: 8px;

  @media (max-width: 768px) {
    height: 55px;
  }
`;
export default function PolicyHeader() {
 const { t } = useTranslation();
  return (
    <HeaderWrapper>
      <HeaderCard>
        <BrandInfo>
          <BrandName>SELECT SAFARIS AFRICA</BrandName>
          <OwnerName>
           {t("product_of")} <strong>Peak Ventures Ltd</strong>
          </OwnerName>

          <ContactLine>{t("whatsapp_label")}: +1 (480) 716-9630</ContactLine>
          <ContactLine>{t("email_label")}: info@selectsafarisafrica.com</ContactLine>
        </BrandInfo>
        <Logo
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Company Logo"
        />
      </HeaderCard>
    </HeaderWrapper>
  );
}
