import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MdTranslate } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const langNames: { [key: string]: string } = {
  EN: "English",
  PT: "Português",
  ES: "Español",
  DE: "Deutsch",
  FR: "Français",
};

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const initialLang = i18n.language.toUpperCase() || "PT";
  const [currentLang, setCurrentLang] = useState(langNames[initialLang] || "Português");

  const handleSelectLang = (langCode: string) => {
    setCurrentLang(langNames[langCode]);
    setOpen(false);
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="flex items-center justify-center font-mono">
      <motion.div animate={open ? "open" : "closed"} className="relative">

        <motion.button
          onClick={() => setOpen((pv) => !pv)}
          whileTap={{ scale: 0.95 }}
          style={{ padding: '10px 18px', borderRadius: '12px', gap: '8px' }}
          className="flex items-center font-semibold transition-all cursor-pointer text-slate-200 hover:text-white"
        >
          <MdTranslate style={{ fontSize: '22px' }} />
          <motion.span variants={iconVariants} style={{ fontSize: '16px', display: 'flex' }}>
            <FiChevronDown />
          </motion.span>
        </motion.button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%", padding: '10px', gap: '4px', borderRadius: '14px' }}
          className="flex flex-col shadow-2xl absolute top-[120%] left-[50%] w-auto overflow-hidden z-50 whitespace-nowrap bg-slate-800 border border-slate-700"
        >
          {Object.entries(langNames).map(([code, name]) => (
            <Option key={code} text={name} langCode={code} handleSelect={handleSelectLang} currentLang={currentLang} />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, langCode, handleSelect, currentLang }: any) => {
  const isSelected = currentLang === text;

  return (
    <motion.li
      variants={itemVariants}
      onClick={() => handleSelect(langCode)}
      style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '15px' }}
      className={`flex items-center w-full font-semibold cursor-pointer transition-all
        ${isSelected
          ? 'bg-slate-700 text-white'
          : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'}`}
    >
      {text}
    </motion.li>
  );
};

export const LanguageSwitcher = LanguageDropdown;

const wrapperVariants = {
  open: { scaleY: 1, transition: { when: "beforeChildren", staggerChildren: 0.05 } },
  closed: { scaleY: 0, transition: { when: "afterChildren", staggerChildren: 0.05 } },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -10 },
};
