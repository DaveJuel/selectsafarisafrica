import styled from "styled-components";

const HtmlContainer = styled.div`
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #ffffff;
`;

export default function HtmlContainerView({content}) {
  return (
    <HtmlContainer
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
