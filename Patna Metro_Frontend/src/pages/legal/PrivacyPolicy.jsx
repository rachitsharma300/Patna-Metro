import React from "react";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">{t('privacyPolicy.title')}</h1>
      <p className="mb-4 text-gray-700">
        {t('privacyPolicy.intro')}
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacyPolicy.section1Title')}</h2>
      <p className="mb-4 text-gray-700">
        {t('privacyPolicy.section1Text')}
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacyPolicy.section2Title')}</h2>
      <p className="mb-4 text-gray-700">
        {t('privacyPolicy.section2Text')}
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>{t('privacyPolicy.section2List1')}</li>
        <li>{t('privacyPolicy.section2List2')}</li>
        <li>{t('privacyPolicy.section2List3')}</li>
      </ul>
      <p className="mb-4 text-gray-700">
        {t('privacyPolicy.section2Text2')}
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacyPolicy.section3Title')}</h2>
      <p className="mb-4 text-gray-700">
        {t('privacyPolicy.section3Text')}
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">{t('privacyPolicy.section4Title')}</h2>
      <p className="mb-4 text-gray-700">
        {t('privacyPolicy.section4Text')}
      </p>
    </div>
  );
}

export default PrivacyPolicy;