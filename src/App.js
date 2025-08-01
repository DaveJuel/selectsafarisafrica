import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import MainLayout from "./components/Layouts/MainLayout.js";
// Screens
import Landing from "./screens/Landing.jsx";
import { useEffect } from "react";
export default function App() {
   useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.weglot.com/weglot.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Weglot) {
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0];
        const supportedLanguages = ['en', 'zh'];
        const redirectLang = supportedLanguages.includes(shortLang) ? shortLang : 'en';
        window.Weglot.initialize({
          api_key: process.env.REACT_APP_WEGLOT_API_KEY,
          originalLanguage: 'en',
          destinationLanguages: supportedLanguages.filter(lang => lang !== 'en'),
          language: redirectLang,
          switcher: {
            style: 'dropdown',
            position: 'bottom-right',
          },
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      </Helmet>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Landing />} />
        </Route>
      </Routes>
    </>
  );
}

