import React from "react";
import { useLanguage } from "../utils/LanguageContext";
import { Button } from "../components/ui/Button";

export const About = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{t("aboutPatnaMetro")}</h1>

      <div className="prose prose-lg">
        <p>{t("aboutContent1")}</p>
        <p>{t("aboutContent2")}</p>
      </div>

      <div className="mt-8">
        <Button variant="primary" onClick={() => window.open("#", "_blank")}>
          {t("learnMore")}
        </Button>
      </div>
    </div>
  );
};

export default About;
