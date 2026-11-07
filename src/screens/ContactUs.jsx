import PageSeo from "../components/Elements/PageSeo";
import ContactUsView from "../components/Sections/ContactUsView";

export default function ContactUs() {
    return (
        <>
            <PageSeo
                path="/contact-us/"
                title="Contact Us | Plan Your East Africa Safari | Select Safaris Africa"
                description="Contact Select Safaris Africa to plan a safari, gorilla trek, visa assistance or a custom trip across Rwanda, Uganda, Tanzania and Burundi."
            />
            <ContactUsView />
        </>);
}