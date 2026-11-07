// src/screens/AboutUs.jsx
import PageSeo from "../components/Elements/PageSeo";
import AboutUsView from "../components/Sections/AboutUsView";

export default function AboutUs() {
  return (
    <>
      <PageSeo
        path="/about-us/"
        title="About Us | Select Safaris Africa, East Africa Safari Experts"
        description="Meet Select Safaris Africa, local safari and travel experts in Rwanda, Uganda, Tanzania and Burundi. Our story, mission, vision and values."
      />
      <AboutUsView />
    </>
  );
}