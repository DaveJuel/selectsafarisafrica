import styled from "styled-components";
import React, { useState } from "react";
import ContactUsForm from "./ContactUsForm";
import ContactInfoSection from "./ContactInfoSection";
import { useTranslation } from "react-i18next";

export default function ContactUsView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { t } = useTranslation("contact_us");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <ViewWrapper>
      <Header>
        <HeaderTitle>{t("reach_out")}</HeaderTitle>
      </Header>

      <Content>
        <ContactInfoSection />
        <ContactUsForm
          onSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          formData={formData}
        />
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;
