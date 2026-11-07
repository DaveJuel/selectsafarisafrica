import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout.jsx";
// Screens
import Landing from "./screens/Landing.jsx";
import BookingDetails from "./screens/BookingDetails.jsx";
import InvoiceDownloadPage from "./screens/InvoiceDownload.jsx";
import TermsAndConditions from "./screens/policies/TermsAndCondition.jsx";
import CancellationPolicy from "./screens/policies/CancellationAndReturn.jsx";
import PrivacyPolicy from "./screens/policies/PrivacyPolicy.jsx";
import Itineraries from "./screens/Itineraries.jsx";
import AboutUs from "./screens/AboutUs.jsx";
import ContactUs from "./screens/ContactUs.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/booking/:bookingCode" element={<BookingDetails />} />
        <Route path="/invoice/:bookingCode" element={<InvoiceDownloadPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Route>
    </Routes>

  );
}

