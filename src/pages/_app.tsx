import { type AppType } from "next/app";
import "~/styles/globals.css";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="font-sans">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
