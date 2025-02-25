import { IBM_Plex_Mono } from "next/font/google";
import { type AppType } from "next/app";

import "~/styles/globals.css";

const IBM = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={IBM.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
