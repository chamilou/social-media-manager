"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [integrationsOpen, setIntegrationsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out without automatic redirection
    router.push("/"); // Redirect to the home page after logout
  };
  const changeLanguage = (lang) => {
    setLanguage(lang);
    // router.push(`/${lang}`); // Redirect to the language route
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <span className={styles.companyName}>
          <Link href="/">🚀 SocialManager</Link>
        </span>
        <ul className={styles.menu}>
          <li
            className={styles.dropdown}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <span>Solutions ▼</span>
            {solutionsOpen && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link href="#">For Company</Link>
                </li>
                <li>
                  <Link href="#">For Individual</Link>
                </li>
                <li>
                  <Link href="#">Analytics</Link>
                </li>
              </ul>
            )}
          </li>

          <li
            className={styles.dropdown}
            onMouseEnter={() => setIntegrationsOpen(true)}
            onMouseLeave={() => setIntegrationsOpen(false)}
          >
            <span>Integrations ▼</span>
            {integrationsOpen && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link href="#">Instagram</Link>
                </li>
                <li>
                  <Link href="#">Facebook</Link>
                </li>
                <li>
                  <Link href="#">TikTok</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="#">Pricing Plan</Link>
          </li>
          <li>
            <Link href="#">Blog</Link>
          </li>
        </ul>
      </div>

      <div className={styles.right}>
        {session ? (
          <>
            <Link href="/dashboard" className={styles.button}>
              Dashboard
            </Link>
            <span>Welcome {session.user.email}</span>
            <button onClick={() => handleLogout()} className={styles.logout}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className={styles.login}>
            Login
          </button>
        )}
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className={styles.languageSelector}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="ru">Русский</option>
          <option value="es">Español</option>
          <option value="ar">العربية</option>
        </select>
      </div>
    </nav>
  );
}
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useLocale, useTranslations } from "next-intl";
// import styles from "./Navbar.module.css";

// export default function Navbar() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   // const t = useTranslations(); // Get translations
//   // const locale = useLocale();
//   // const [language, setLanguage] = useState(locale);

//   const handleLogout = async () => {
//     await signOut({ redirect: false });
//     router.push("/");
//   };

//   const changeLanguage = (lang) => {
//     setLanguage(lang);
//     router.push(`/${lang}`); // Redirect to the language route
//   };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.left}>
//         <span className={styles.companyName}>
//           <Link href="/">🚀 SocialManager</Link>
//         </span>
//         <ul className={styles.menu}>
//           <li>
//             <Link href="/pricing">{t("pricingPlan")}</Link>
//           </li>
//           <li>
//             <Link href="/blog">{t("blog")}</Link>
//           </li>
//         </ul>
//       </div>

//       <div className={styles.right}>
//         <select
//           value={language}
//           onChange={(e) => changeLanguage(e.target.value)}
//           className={styles.languageSelector}
//         >
//           <option value="en">English</option>
//           <option value="fr">Français</option>
//           <option value="de">Deutsch</option>
//           <option value="ru">Русский</option>
//           <option value="es">Español</option>
//           <option value="ar">العربية</option>
//         </select>

//         {session ? (
//           <>
//             <Link href="/dashboard">{t("dashboard")}</Link>
//             <button onClick={handleLogout}>{t("logout")}</button>
//           </>
//         ) : (
//           <button onClick={() => signIn()}>{t("login")}</button>
//         )}
//       </div>
//     </nav>
//   );
// }
