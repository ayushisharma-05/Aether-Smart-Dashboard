import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      nav: {
        auraReader: 'Aura Reader',
        selectLanguage: 'Select Language',
        all: 'All',
        languagesAvailable: 'languages available'
      },
      hero: {
        luxury: 'Luxury',
        defines: 'Defines',
        aether: 'Aether',
        tagline: "Elegance is not about being noticed, it's about being remembered. Welcome to the most exquisite dashboard experience ever crafted.",
        cta: 'Discover the Collection'
      },
      analytics: {
        title: 'Live Analytics',
        globalReach: 'Global Reach',
        brandValue: 'Brand Value',
        engagement: 'Engagement'
      },
      footer: {
        rights: 'All Rights Reserved.'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        auraReader: 'आभामंडल पाठक',
        selectLanguage: 'भाषा चुनें',
        all: 'सभी',
        languagesAvailable: 'भाषाएं उपलब्ध हैं'
      },
      hero: {
        luxury: 'विलासिता',
        defines: 'परिभाषित करती है',
        aether: 'ईथर',
        tagline: 'लालित्य ध्यान आकर्षित करने के बारे में नहीं है, बल्कि याद रखे जाने के बारे में है। अब तक के सबसे उत्कृष्ट डैशबोर्ड अनुभव में आपका स्वागत है।',
        cta: 'संग्रह देखें'
      },
      analytics: {
        title: 'लाइव एनालिटिक्स',
        globalReach: 'वैश्विक पहुंच',
        brandValue: 'ब्रांड मूल्य',
        engagement: 'भागीदारी'
      },
      footer: {
        rights: 'सर्वाधिकार सुरक्षित।'
      }
    }
  },
  es: {
    translation: {
      nav: {
        auraReader: 'Lector de Aura',
        selectLanguage: 'Seleccionar Idioma',
        all: 'Todos',
        languagesAvailable: 'idiomas disponibles'
      },
      hero: {
        luxury: 'El Lujo',
        defines: 'Define',
        aether: 'Aether',
        tagline: 'La elegancia no se trata de ser notado, se trata de ser recordado. Bienvenido a la experiencia de tablero más exquisita jamás creada.',
        cta: 'Descubre la Colección'
      },
      analytics: {
        title: 'Analítica en Vivo',
        globalReach: 'Alcance Global',
        brandValue: 'Valor de Marca',
        engagement: 'Compromiso'
      },
      footer: {
        rights: 'Todos los derechos reservados.'
      }
    }
  },
  bn: {
    translation: {
      nav: { auraReader: 'আভামণ্ডল পাঠক', selectLanguage: 'ভাষা চয়ন করুন', all: 'সব', languagesAvailable: 'ভাষা উপলব্ধ' },
      hero: { luxury: 'বিলাসিতা', defines: 'সংজ্ঞায়িত করে', aether: 'Aether', tagline: 'আভিজাত্য শুধু নজরে আসার জন্য নয়, এটি মনে রাখার বিষয়। সর্বকালের সবচেয়ে চমৎকার ড্যাশবোর্ডে স্বাগতম।', cta: 'সংগ্রহ দেখুন' },
      analytics: { title: 'লাইভ বিশ্লেষণ', globalReach: 'বৈশ্বিক বিস্তার', brandValue: 'ব্র্যান্ড মূল্য', engagement: 'ব্যস্ততা' },
      footer: { rights: 'সর্বস্বত্ব সংরক্ষিত।' }
    }
  },
  mr: {
    translation: {
      nav: { auraReader: 'आभामंडल वाचक', selectLanguage: 'भाषा निवडा', all: 'सर्व', languagesAvailable: 'भाषा उपलब्ध' },
      hero: { luxury: 'ऐश्वर्य', defines: 'व्याख्या करते', aether: 'Aether', tagline: 'मोहकता म्हणजे केवळ लक्ष वेधून घेणे नव्हे, तर लक्षात राहणे होय. आतापर्यंतच्या सर्वात उत्कृष्ट ड्याशबोर्डवर आपले स्वागत आहे।', cta: 'संग्रह पहा' },
      analytics: { title: 'थेट विश्लेषण', globalReach: 'जागतिक पोहोच', brandValue: 'ब्रँड मूल्य', engagement: 'सहभाग' },
      footer: { rights: 'सर्व हक्क राखीव।' }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
    }
  });

export default i18n;
