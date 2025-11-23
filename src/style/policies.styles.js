import styled from "styled-components";

export const ContentContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px;
  margin: 0 auto;
  background: #f8f7f7; /* light neutral paper background */
  font-family: 'Times New Roman', Times, serif;
  color: #1e1e1e;
  line-height: 1.6;

  @media (max-width: 1024px) { padding: 30px; }
  @media (max-width: 768px) { padding: 20px; }
  @media (max-width: 480px) { padding: 10px; }

  @media print {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: #fff;
    box-shadow: none;
  }
`;

export const Section = styled.section`
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 10px;
  page-break-inside: avoid;
`;

export const FileTitle = styled.h1`
  font-size: 26px;
  font-weight: 800;
  text-align: center;
  color: #000000ff; /* eye-catching red highlight */
  margin: 30px 0 25px 0;
  padding: 12px 0;

  background: rgba(255, 145, 0, 0.08); /* soft red highlight background */
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #111;
  text-transform: uppercase;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
`;

export const SectionText = styled.p`
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 12px;
  white-space: pre-line;
  color: #2d2d2d;
`;

export const SubSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;
  color: #1a1a1a;
`;

export const List = styled.ul`
  margin: 8px 0 12px 20px;
  padding: 0;
  list-style-type: disc;
  color: #2d2d2d;

  li {
    margin-bottom: 6px;
  }
`;

export const LegalFooter = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #ccc;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: center;
`;
