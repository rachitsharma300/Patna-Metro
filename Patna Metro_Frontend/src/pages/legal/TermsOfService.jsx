import React from "react";
import { useTranslation } from "react-i18next";

function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">{t('terms.title')}</h1>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">{t('terms.section1Title')}</h2>
      <p className="mb-4 text-gray-700">
        {t('terms.section1Text')}
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">{t('terms.section2Title')}</h2>
      <p className="mb-4 text-gray-700">
        {t('terms.section2Text')}
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">{t('terms.section3Title')}</h2>
      <p className="mb-4 text-gray-700">
        {t('terms.section3Text')}
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">{t('terms.section4Title')}</h2>
      <p className="mb-4 text-gray-700">
        {t('terms.section4Text')}
      </p>
    </div>
  );
}

export default TermsOfService;