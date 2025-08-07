import styled, { keyframes } from "styled-components";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Styled Components
const InfoSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px 30px;

  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(14, 80, 51, 0.08),
    0 8px 16px rgba(14, 80, 51, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(14, 80, 51, 0.1);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #0e5033, #16a085, #27ae60, #0e5033);
    background-size: 200% 100%;
    animation: ${shimmer} 3s linear infinite;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
    gap: 20px;
  }
`;

const ContactCard = styled.div`
  padding: 5px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(248, 251, 249, 0.95) 100%
  );
  border-radius: 16px;
  border: 1px solid rgba(14, 80, 51, 0.08);
  box-shadow: 0 8px 16px rgba(14, 80, 51, 0.06);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(14, 80, 51, 0.12);
    border-color: rgba(14, 80, 51, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #0e5033, #16a085);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #0e5033, #16a085);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(14, 80, 51, 0.2);

  img {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1); // Makes icons white
  }
`;

const CardText = styled.p`
  color: #4b5563;
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
`;

const ContactLink = styled.a`
  color: #0e5033;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-block;

  &:hover {
    color: #16a085;
    transform: translateX(2px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(14, 80, 51, 0.1);
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(14, 80, 51, 0.1),
    rgba(22, 160, 133, 0.1)
  );
  color: #ffffffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.33);

  &:hover {
    background: linear-gradient(135deg, #0e5033, #16a085);
    color: white;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 16px rgba(14, 80, 51, 0.3);
  }
`;

// Usage Example Component
const ContactInfoSection = () => {
  return (
    <InfoSection>
      {/* Email Us */}
      <ContactCard>
        <CardHeader>
          <CardIcon>
            <img src="/icons/mail.png" alt="WhatsApp" />
          </CardIcon>
          <CardText>
            <ContactLink href="mailto:info@selectsafarisafrica.com">
              info@selectsafarisafrica.com
            </ContactLink>
          </CardText>
        </CardHeader>
      </ContactCard>

      {/* Call Us */}
      <ContactCard>
        <CardHeader>
          <CardIcon>
            <img src="/icons/whatsapp.png" alt="WhatsApp" />
          </CardIcon>
          <CardText>
            <ContactLink
              href="https://wa.me/250788123456?text=Hello, I'd like to get in touch with you."
              target="_blank"
            >
              +250 788 373 709
            </ContactLink>
          </CardText>
        </CardHeader>
      </ContactCard>

      {/* Visit Us */}
      <ContactCard>
        <CardHeader>
          <CardIcon>
            <img src="/icons/map.png" alt="WhatsApp" />
          </CardIcon>
          <CardText>Kigali, Rwanda</CardText>
        </CardHeader>
      </ContactCard>

      {/* Social Links */}
      <SocialLinks>
        <SocialLink href="#" target="_blank" title="Facebook">
          f
        </SocialLink>
        <SocialLink href="#" target="_blank" title="x">
          𝕏
        </SocialLink>
        <SocialLink href="#" target="_blank" title="LinkedIn">
          in
        </SocialLink>
      </SocialLinks>
    </InfoSection>
  );
};

export default ContactInfoSection;
