import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Globe, ChevronDown, Search, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Full list of 100+ languages supported by Google Translate
const LANGUAGES = [
  // --- South Asian ---
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'South Asian' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'South Asian' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'South Asian' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'South Asian' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'South Asian' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'South Asian' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'South Asian' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'South Asian' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'South Asian' },
  { code: 'or', name: 'Odia (Oriya)', nativeName: 'ଓଡ଼ିଆ', region: 'South Asian' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', region: 'South Asian' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', region: 'South Asian' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', region: 'South Asian' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', region: 'South Asian' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', region: 'South Asian' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', region: 'South Asian' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', region: 'South Asian' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', region: 'South Asian' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', region: 'South Asian' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', region: 'South Asian' },
  { code: 'gom', name: 'Konkani', nativeName: 'कोंकणी', region: 'South Asian' },
  { code: 'mni-Mtei', name: 'Meiteilon (Manipuri)', nativeName: 'ꯃꯤꯇꯩꯂꯣꯟ', region: 'South Asian' },
  { code: 'lus', name: 'Mizo', nativeName: 'Mizo ṭawng', region: 'South Asian' },
  { code: 'dv', name: 'Dhivehi', nativeName: 'ދިވެހި', region: 'South Asian' },

  // --- East Asian ---
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文（简体）', region: 'East Asian' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '中文（繁體）', region: 'East Asian' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', region: 'East Asian' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', region: 'East Asian' },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', region: 'East Asian' },

  // --- Southeast Asian ---
  { code: 'th', name: 'Thai', nativeName: 'ไทย', region: 'Southeast Asian' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', region: 'Southeast Asian' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', region: 'Southeast Asian' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', region: 'Southeast Asian' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', region: 'Southeast Asian' },
  { code: 'my', name: 'Myanmar (Burmese)', nativeName: 'ဗမာ', region: 'Southeast Asian' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', region: 'Southeast Asian' },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', region: 'Southeast Asian' },
  { code: 'jw', name: 'Javanese', nativeName: 'Basa Jawa', region: 'Southeast Asian' },
  { code: 'su', name: 'Sundanese', nativeName: 'Basa Sunda', region: 'Southeast Asian' },
  { code: 'ceb', name: 'Cebuano', nativeName: 'Cebuano', region: 'Southeast Asian' },
  { code: 'ilo', name: 'Ilocano', nativeName: 'Ilokano', region: 'Southeast Asian' },
  { code: 'hmn', name: 'Hmong', nativeName: 'Hmong', region: 'Southeast Asian' },

  // --- European (Western) ---
  { code: 'en', name: 'English', nativeName: 'English', region: 'European' },
  { code: 'fr', name: 'French', nativeName: 'Français', region: 'European' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', region: 'European' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', region: 'European' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', region: 'European' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', region: 'European' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', region: 'European' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', region: 'European' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', region: 'European' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', region: 'European' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', region: 'European' },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', region: 'European' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', region: 'European' },
  { code: 'gd', name: 'Scots Gaelic', nativeName: 'Gàidhlig', region: 'European' },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', region: 'European' },
  { code: 'lb', name: 'Luxembourgish', nativeName: 'Lëtzebuergesch', region: 'European' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', region: 'European' },
  { code: 'gl', name: 'Galician', nativeName: 'Galego', region: 'European' },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara', region: 'European' },
  { code: 'co', name: 'Corsican', nativeName: 'Corsu', region: 'European' },
  { code: 'fy', name: 'Frisian', nativeName: 'Frysk', region: 'European' },

  // --- European (Eastern & Central) ---
  { code: 'ru', name: 'Russian', nativeName: 'Русский', region: 'European' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', region: 'European' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', region: 'European' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', region: 'European' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', region: 'European' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', region: 'European' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', region: 'European' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', region: 'European' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', region: 'European' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', region: 'European' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', region: 'European' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', region: 'European' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', region: 'European' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', region: 'European' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', region: 'European' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', region: 'European' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', region: 'European' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', region: 'European' },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская', region: 'European' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', region: 'European' },
  { code: 'la', name: 'Latin', nativeName: 'Latina', region: 'European' },
  { code: 'eo', name: 'Esperanto', nativeName: 'Esperanto', region: 'European' },

  // --- Middle Eastern ---
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: 'Middle Eastern' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', region: 'Middle Eastern' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', region: 'Middle Eastern' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', region: 'Middle Eastern' },
  { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî', region: 'Middle Eastern' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', region: 'Middle Eastern' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', region: 'Middle Eastern' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', region: 'Middle Eastern' },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', region: 'Middle Eastern' },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', region: 'Middle Eastern' },
  { code: 'tk', name: 'Turkmen', nativeName: 'Türkmen', region: 'Middle Eastern' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ', region: 'Middle Eastern' },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча', region: 'Middle Eastern' },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', region: 'Middle Eastern' },
  { code: 'ug', name: 'Uyghur', nativeName: 'ئۇيغۇرچە', region: 'Middle Eastern' },

  // --- African ---
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', region: 'African' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', region: 'African' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', region: 'African' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', region: 'African' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', region: 'African' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', region: 'African' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', region: 'African' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', region: 'African' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', region: 'African' },
  { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy', region: 'African' },
  { code: 'ny', name: 'Chichewa', nativeName: 'Chichewa', region: 'African' },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda', region: 'African' },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho', region: 'African' },
  { code: 'sn', name: 'Shona', nativeName: 'chiShona', region: 'African' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', region: 'African' },
  { code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga', region: 'African' },
  { code: 'ak', name: 'Akan', nativeName: 'Akan', region: 'African' },
  { code: 'bm', name: 'Bambara', nativeName: 'Bamanankan', region: 'African' },
  { code: 'ee', name: 'Ewe', nativeName: 'Eʋegbe', region: 'African' },
  { code: 'lg', name: 'Luganda', nativeName: 'Luganda', region: 'African' },
  { code: 'ln', name: 'Lingala', nativeName: 'Lingála', region: 'African' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo', region: 'African' },
  { code: 'nso', name: 'Sepedi', nativeName: 'Sepedi', region: 'African' },
  { code: 'tw', name: 'Twi', nativeName: 'Twi', region: 'African' },

  // --- Other ---
  { code: 'haw', name: 'Hawaiian', nativeName: 'ʻŌlelo Hawaiʻi', region: 'Pacific' },
  { code: 'sm', name: 'Samoan', nativeName: 'Gagana Samoa', region: 'Pacific' },
  { code: 'mi', name: 'Maori', nativeName: 'Te Reo Māori', region: 'Pacific' },
  { code: 'ht', name: 'Haitian Creole', nativeName: 'Kreyòl Ayisyen', region: 'Americas' },
  { code: 'qu', name: 'Quechua', nativeName: 'Runasimi', region: 'Americas' },
  { code: 'ay', name: 'Aymara', nativeName: 'Aymar aru', region: 'Americas' },
  { code: 'gn', name: 'Guarani', nativeName: 'Avañe\'ẽ', region: 'Americas' },
  { code: 'tt', name: 'Tatar', nativeName: 'Татарча', region: 'Central Asian' },
];

const REGION_ORDER = [
  'South Asian',
  'East Asian',
  'Southeast Asian',
  'European',
  'Middle Eastern',
  'African',
  'Pacific',
  'Americas',
  'Central Asian',
];

const REGION_EMOJIS = {
  'South Asian': '🇮🇳',
  'East Asian': '🏯',
  'Southeast Asian': '🌴',
  'European': '🏰',
  'Middle Eastern': '🕌',
  'African': '🌍',
  'Pacific': '🌊',
  'Americas': '🌎',
  'Central Asian': '🏔️',
};

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedLang = i18n.language || 'en';
  
  const [activeRegion, setActiveRegion] = useState(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Filter languages based on search
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return LANGUAGES;
    const q = searchQuery.toLowerCase();
    return LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q) ||
        lang.region.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Group by region
  const groupedLanguages = useMemo(() => {
    const groups = {};
    filteredLanguages.forEach((lang) => {
      if (!groups[lang.region]) groups[lang.region] = [];
      groups[lang.region].push(lang);
    });
    return groups;
  }, [filteredLanguages]);

  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];
  const totalLanguages = LANGUAGES.length;

  const handleLanguageSelect = (langCode) => {
    const NATIVE_LANGS = ['en', 'hi', 'es', 'bn', 'mr']; // Languages we have curated translations for
    
    setIsOpen(false);
    setSearchQuery('');

    if (NATIVE_LANGS.includes(langCode)) {
      // Use premium i18next translations
      i18n.changeLanguage(langCode);
      
      // Reset Google Translate if it was active
      const translateSelect = document.querySelector('.goog-te-combo');
      if (translateSelect && translateSelect.value !== '') {
        translateSelect.value = '';
        translateSelect.dispatchEvent(new Event('change'));
      }
    } else {
      // Use Google Translate for the 150+ other languages
      // First reset i18next to English so Google has a base to translate from
      i18n.changeLanguage('en');
      
      const translateSelect = document.querySelector('.goog-te-combo');
      if (translateSelect) {
        translateSelect.value = langCode;
        translateSelect.dispatchEvent(new Event('change'));
      }
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Trigger Button */}
      <motion.button
        id="language-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: isOpen ? 'var(--accent-gold-soft)' : 'none',
          border: isOpen ? '1px solid var(--accent-gold)' : '1px solid transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          color: isOpen ? 'var(--accent-gold)' : 'var(--text-secondary)',
          padding: '8px 14px',
          borderRadius: '50px',
          transition: 'all 0.3s ease',
          letterSpacing: '0.5px',
        }}
      >
        <Globe size={16} style={{ color: 'var(--accent-gold)' }} />
        <span style={{ fontWeight: 500 }}>{currentLang.nativeName}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="language-selector-dropdown"
            className="notranslate"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.75rem',
              width: '420px',
              maxHeight: '520px',
              background: 'rgba(253, 251, 247, 0.97)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderRadius: '20px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(197,160,89,0.08)',
              border: '1px solid var(--glass-border)',
              zIndex: 1001,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1.25rem 1.5rem 1rem',
                borderBottom: '1px solid var(--glass-border)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}
              >
                <div>
                  <h3
                    className="serif"
                    style={{
                      fontSize: '1rem',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    {t('nav.selectLanguage')}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-secondary)',
                      marginTop: '2px',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                    }}
                  >
                    {totalLanguages} {t('nav.languagesAvailable')}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    padding: '4px',
                    borderRadius: '50%',
                    display: 'flex',
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Search Bar */}
              <div
                style={{
                  position: 'relative',
                  marginBottom: '1rem',
                }}
              >
                <Search
                  size={15}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--accent-gold)',
                    opacity: 0.7,
                  }}
                />
                <input
                  ref={searchInputRef}
                  id="language-search-input"
                  type="text"
                  placeholder="Search languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.6)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent-gold)';
                    e.target.style.boxShadow = '0 0 0 3px var(--accent-gold-soft)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--glass-border)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'var(--glass-border)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <X size={12} />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Region Tabs */}
            {!searchQuery && (
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  padding: '16px 16px 12px',
                  overflowX: 'auto',
                  flexShrink: 0,
                  borderBottom: '1px solid var(--glass-border)',
                  background: 'rgba(255, 255, 255, 0.6)',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  alignItems: 'center',
                }}
              >
                <button
                  onClick={() => setActiveRegion(null)}
                  style={{
                    background: !activeRegion ? 'var(--accent-gold)' : 'transparent',
                    color: !activeRegion ? 'white' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                    lineHeight: '1.2',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t('nav.all')}
                </button>
                {REGION_ORDER.filter((r) => groupedLanguages[r]).map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region === activeRegion ? null : region)}
                    style={{
                      background: activeRegion === region ? 'var(--accent-gold)' : 'transparent',
                      color: activeRegion === region ? 'white' : 'var(--text-secondary)',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '6px 14px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-sans)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.5px',
                      fontWeight: 500,
                      lineHeight: '1.2',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {REGION_EMOJIS[region]} {region}
                  </button>
                ))}
              </div>
            )}

            {/* Language List */}
            <div
              style={{
                overflowY: 'auto',
                flex: 1,
                padding: '0.5rem',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--glass-border) transparent',
              }}
            >
              {filteredLanguages.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '2rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Globe size={32} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                  <p style={{ fontSize: '0.85rem' }}>No languages found</p>
                  <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    Try a different search term
                  </p>
                </div>
              ) : (
                REGION_ORDER.filter((r) => groupedLanguages[r])
                  .filter((r) => !activeRegion || r === activeRegion)
                  .map((region) => (
                    <div key={region} style={{ marginBottom: '0.5rem' }}>
                      {/* Region Header */}
                      {!searchQuery && !activeRegion && (
                        <div
                          style={{
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.65rem',
                            color: 'var(--accent-gold)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontWeight: 600,
                            fontFamily: 'var(--font-sans)',
                            position: 'sticky',
                            top: 0,
                            background: 'rgba(253, 251, 247, 0.95)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1,
                          }}
                        >
                          {REGION_EMOJIS[region]} {region}
                        </div>
                      )}
                      {/* Language Items */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '2px',
                        }}
                      >
                        {groupedLanguages[region].map((lang) => (
                          <motion.button
                            key={lang.code}
                            whileHover={{ scale: 1.01, backgroundColor: 'rgba(197,160,89,0.08)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleLanguageSelect(lang.code)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 10px',
                              border: 'none',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              fontFamily: 'var(--font-sans)',
                              transition: 'all 0.15s ease',
                              background:
                                selectedLang === lang.code
                                  ? 'var(--accent-gold-soft)'
                                  : 'transparent',
                              textAlign: 'left',
                            }}
                          >
                            <div style={{ overflow: 'hidden' }}>
                              <div
                                style={{
                                  fontSize: '0.8rem',
                                  fontWeight: selectedLang === lang.code ? 600 : 400,
                                  color:
                                    selectedLang === lang.code
                                      ? 'var(--accent-gold)'
                                      : 'var(--text-primary)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {lang.name}
                              </div>
                              <div
                                style={{
                                  fontSize: '0.68rem',
                                  color: 'var(--text-secondary)',
                                  marginTop: '1px',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {lang.nativeName}
                              </div>
                            </div>
                            {selectedLang === lang.code && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{ color: 'var(--accent-gold)', flexShrink: 0 }}
                              >
                                <Check size={14} />
                              </motion.span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '0.6rem 1.25rem',
                borderTop: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.68rem',
                color: 'var(--text-secondary)',
              }}
            >
              <span style={{ letterSpacing: '0.5px' }}>
                {t('hero.luxury')} Dashboard
              </span>
              <span
                style={{
                  background: 'var(--accent-gold-soft)',
                  color: 'var(--accent-gold)',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '0.65rem',
                }}
              >
                {totalLanguages}+ Languages
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
