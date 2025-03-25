import { type AppType } from "next/app";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div style={{ fontFamily: "'Segoe UI Mono', monospace" }}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
