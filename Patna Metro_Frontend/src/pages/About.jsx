import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { MetroTimeline } from "../components/MetroTimeline";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import myImage from "../assets/Rachit.jpg";

export const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-8 px-4 lg:px-8">
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
                <p className="text-gray-600">
                  {t("aboutPage.totalLengthValue")}
                </p>
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
                <p className="text-gray-600">
                  {t("aboutPage.projectCostValue")}
                </p>
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

      {/* About the Developer Section */}
      {/* About the Developer Section */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 max-w-2xl mx-auto flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-48 h-48 rounded-full overflow-hidden border-[6px] border-[#0B3D91] mb-6 shadow-md">
          <img
            src={myImage}
            alt="Rachit Sharma"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Title */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Rachit Sharma
        </h2>
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-gray-500 font-medium">Full Stack Developer</p>
        </div>

        {/* Bio */}
        <p className="text-center text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
          {t("aboutPage.developerCredit")} {t("aboutPage.developerContribution")}
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mb-10">
          <a
            href="https://github.com/rachitsharma300"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black transition-all shadow-sm"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://twitter.com/rachitsharma300"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100 flex items-center justify-center text-[#1DA1F2] transition-all shadow-sm"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.instagram.com/rachitsharma300"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100 flex items-center justify-center text-[#E1306C] transition-all shadow-sm"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com/in/rachitsharma300"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100 flex items-center justify-center text-[#0A66C2] transition-all shadow-sm"
          >
           <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
          </a>
          <a
            href="https://rachitsharma.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100 flex items-center justify-center text-[#4C1D95] transition-all shadow-sm"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.1 212.5 0 233.8 0 256s3.1 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path></svg>
          </a>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between w-full max-w-sm px-4 mb-2">
           <div className="flex flex-col items-center">
              <span className="font-extrabold text-xl text-gray-900">5+</span>
              <span className="text-gray-500 text-sm">Projects</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="font-extrabold text-xl text-gray-900">3+</span>
              <span className="text-gray-500 text-sm">Years</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="font-extrabold text-xl text-gray-900">10+</span>
              <span className="text-gray-500 text-sm">Features</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
