import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/navigation/Navbar";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Welcome to Socia-media Manager",
  description: "Max Media Manager",
};

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProviderWrapper>
          <Navbar />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

// RootLayout.js

// import { NextIntlProvider } from "next-intl";

// import { NextIntlClientProvider } from "next-intl";
// import { Geist, Geist_Mono } from "next/font/google";
// import { notFound } from "next/navigation";
// import "./globals.css";
// import Navbar from "./components/ui/navigation/Navbar";
// import SessionProviderWrapper from "./providers/SessionProviderWrapper";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Welcome to Social Media Manager",
//   description: "Max Media Manager",
// };

// export default async function RootLayout({ children, params: { locale } }) {
//   let messages;
//   try {
//     messages = await import(`@/dictionaries/${locale}.json`).then(
//       (module) => module.default
//     );
//   } catch (error) {
//     console.error(`Failed to load messages for locale: ${locale}`, error);
//     notFound();
//   }
//   // const effectiveLocale = locale || "en";

//   // try {
//   //   messages = (await import(`@/locales/${effectiveLocale}.json`)).default;
//   // } catch (error) {
//   //   console.error(
//   //     `Failed to load messages for locale: ${effectiveLocale}`,
//   //     error
//   //   );
//   //   messages = (await import(`@/locales/en.json`)).default; // Fallback to default locale
//   // }

//   return (
//     <html lang={locale}>
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <NextIntlClientProvider locale={locale} messages={messages}>
//           <SessionProviderWrapper>
//             <Navbar />
//             {children}
//           </SessionProviderWrapper>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }
