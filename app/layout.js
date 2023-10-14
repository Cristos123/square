import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "easymde/dist/easymde.min.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import Head from "next/head";
import { Partytown } from "@builder.io/partytown/react";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Square CRM",
  description: "We connect carowners and passengers to move at half the cost.",
  themeColor: "#000",
  appleWebApp: {
    title: "Square CRM",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/box-logo.jpg",
      {
        url: "/box-logo.jpg",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  icons: {
    icon: "/box-logo.jpg",
    shortcut: "/box-logo.jpg",
    apple: "/box-logo.jpg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "supply chain & logistics",
  openGraph: {
    title: "Square CRM",
    description:
      "We connect carowners and passengers to move at half the cost.",
    url: "https://drop.instadrop.com.ng",
    siteName: "Drop",
    images: [
      {
        url: "/box-logo.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "/box-logo.jpg",
        width: 1800,
        height: 1600,
        alt: "",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drop - Your Uber & Bolt Re-Imagined",
    description:
      "We connect carowners and passengers to move at half the cost.",
    // siteId: '1467726470533754880',
    creator: "@iatobi",
    // creatorId: '1467726470533754880',
    images: ["/box-logo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <Partytown debug={false} forward={["dataLayer.push"]} />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        {/* <!-- App Manifest --> */}
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Drop" />
        <meta name="description" content="Your Uber & Bolt Re-Imagined." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        {/* <!-- Primary Meta Tags --> */}
        <title>Drop - Your Uber & Bolt Re-Imagined</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Drop - Your Uber & Bolt Re-Imagined" />
        <meta
          name="description"
          content="We connect carowners and passengers to move at half the cost."
        />

        {/* <!-- Open Graph / Facebook --/> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drop.instadrop.com.ng/" />
        <meta
          property="og:title"
          content="Drop - Your Uber & Bolt Re-Imagined."
        />
        <meta
          property="og:description"
          content="We connect carowners and passengers to move at half the cost."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/neonatar-media/image/upload/v1681477071/Screenshot_2023-04-14_122512_w4gx3w.png"
        />

        {/* <!-- Twitter --/> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://drop.instadrop.com.ng/" />
        <meta
          property="twitter:title"
          content="Drop - Your Uber & Bolt Re-Imagined."
        />
        <meta
          property="twitter:description"
          content="We connect carowners and passengers to move at half the cost."
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/neonatar-media/image/upload/v1681477071/Screenshot_2023-04-14_122512_w4gx3w.png"
        />
      </Head>

      <body className={inter.className}>{children}</body>
      {/* <Script id='script' type="text/partytown"  custom-element="script" src="https://notix.io/ent/current/enot.min.js" onLoad={(sdk) => {
        sdk.startInstall(
          {
            "appId": "1005cea57649e9dc19149623b33df15",
            "loadSettings": true
          }

        )
        console.log('Notix has loaded')
      }} strategy={'worker'} /> */}

      <Script
        custom-element="storyly-web"
        src="https://web-story.storyly.io/v2/storyly-web.js"
      />
    </html>
  );
}
