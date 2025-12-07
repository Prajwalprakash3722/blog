import "../styles/index.css";

import { AppProps } from "next/app";
import CursorTrail from "../components/CursorTrail";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CursorTrail />
      <Component {...pageProps} />
    </>
  );
}
