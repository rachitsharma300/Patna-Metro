import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { MetroTimeline } from "../components/MetroTimeline"; // Ensure this exists

export const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t("aboutPage.title")}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t("aboutPage.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {t("aboutPage.overviewTitle")}
            </h2>
            <p className="mb-4">{t("aboutPage.overviewPara1")}</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
              {t("aboutPage.projectBackgroundTitle")}
            </h2>
            <p className="mb-4">{t("aboutPage.projectBackgroundPara1")}</p>
            <p>{t("aboutPage.projectBackgroundPara2")}</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {t("aboutPage.keyFactsTitle")}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                {/* Icon */}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {t("aboutPage.totalLength")}
                </h3>
                <p className="text-gray-600">{t("aboutPage.totalLengthValue")}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                {/* Icon */}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {t("aboutPage.lines")}
                </h3>
                <p className="text-gray-600">{t("aboutPage.linesValue")}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                {/* Icon */}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {t("aboutPage.projectCost")}
                </h3>
                <p className="text-gray-600">{t("aboutPage.projectCostValue")}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                {/* Icon */}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {t("aboutPage.expectedCompletion")}
                </h3>
                <p className="text-gray-600">
                  {t("aboutPage.expectedCompletionValue")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {t("aboutPage.networkDetailsTitle")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              {t("aboutPage.blueLineTitle")}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {t("aboutPage.blueLineDetails", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-red-600">
              {t("aboutPage.redLineTitle")}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {t("aboutPage.redLineDetails", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {t("aboutPage.projectTimelineTitle")}
        </h2>
        <MetroTimeline />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {t("aboutPage.implementationFundingTitle")}
        </h2>
        <p className="mb-4">{t("aboutPage.implementationFundingPara1")}</p>
        <p className="mb-4">{t("aboutPage.implementationFundingPara2")}</p>
      </div>

      <div className="text-center mt-12">
        <Button
          variant="primary"
          onClick={() => window.open("https://patnametro.in", "_blank")}
          className="px-8 py-3 text-lg"
        >
          {t("aboutPage.officialWebsiteButton")}
        </Button>
      </div>
    </div>
  );
};

export default About;
