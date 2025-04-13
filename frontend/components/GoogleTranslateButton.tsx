import React, { useEffect } from "react";

const GoogleTranslateButton: React.FC = () => {
  // Dynamically adding Google Translate script
  useEffect(() => {
    const addScript = () => {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // Default page language
          includedLanguages: "en,hi,gu", // Add more languages if needed
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    window.googleTranslateElementInit = googleTranslateElementInit;
    addScript();
  }, []);

  return (
    <div>
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        onClick={() => {
          const translateElement = document.getElementById("google_translate_element");
          translateElement?.classList.toggle("hidden");
        }}
      >
        Translate
      </button>
      <div
        id="google_translate_element"
        className="hidden mt-4"
        style={{ position: "fixed", top: "10px", right: "10px", zIndex: 1000 }}
      />
    </div>
  );
};

export default GoogleTranslateButton;
