import React from "react";
import { Link } from "react-router-dom"; // Link component for navigation
import { useTranslation } from "react-i18next"; // To handle Hindi/English translations

function Sitemap() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">{t('nav.sitemap')}</h1>
      
      <p className="mb-8 text-gray-700">
        {t('sitemap.description')}
      </p>

      <ul className="list-disc pl-6 text-blue-600">
        <li className="mb-2">
          <Link to="/" className="hover:underline">{t('nav.home')}</Link>
        </li>
        <li className="mb-2">
          <Link to="/route-finder" className="hover:underline">{t('nav.routeFinder')}</Link>
        </li>
        <li className="mb-2">
          <Link to="/fare-info" className="hover:underline">{t('nav.fareInfo')}</Link>
        </li>
        <li className="mb-2">
          <Link to="/metro-map" className="hover:underline">{t('nav.metroMap')}</Link>
        </li>
        <li className="mb-2">
          <Link to="/about" className="hover:underline">{t('nav.about')}</Link>
        </li>
        <li className="mb-2">
          <Link to="/privacy-policy" className="hover:underline">{t('privacyPolicy.title')}</Link>
        </li>
        <li className="mb-2">
          <Link to="/terms-of-service" className="hover:underline">{t('terms.title')}</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sitemap;