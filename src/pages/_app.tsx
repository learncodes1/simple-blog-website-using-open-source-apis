import "../styles/global.css";

import type { AppProps } from "next/app";

import Navbar from "@/components/Navbar";

import { wrapper } from "../../store";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Navbar />
    <Component {...pageProps} />
  </>
);

export default wrapper.withRedux(MyApp);
