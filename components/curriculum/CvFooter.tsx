"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export default function CvFooter() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="container">{t(dictionary.curriculum.footer.copyright)}</div>
    </footer>
  );
}
