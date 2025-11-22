import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import MainLayout from "./components/Layouts/MainLayout.js";
// Screens
import Landing from "./screens/Landing.jsx";
import BookingDetails from "./screens/BookingDetails.jsx";
import InvoiceDownloadPage from "./screens/InvoiceDownload.jsx";
import TermsAndConditions from "./screens/policies/TermsAndCondition.jsx";
import CancellationPolicy from "./screens/policies/CancellationAndReturn.jsx";
import PrivacyPolicy from "./screens/policies/PrivacyPolicy.jsx";

export default function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/booking/:bookingCode" element={<BookingDetails />} />
          <Route path="/invoice/:bookingCode" element={<InvoiceDownloadPage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/cancellation" element={<CancellationPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </>
  );
}

