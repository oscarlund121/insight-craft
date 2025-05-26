import Image from "next/image";
import Head from "next/head";
import Hero from "./components/Hero";
import About from "./components/About";
import Audience from "./components/Audience";
import Examples from "./components/Examples";
import Pricing from "./components/Pricing";
import NewsletterForm from "./components/NewsletterForm";
import Footer from "./components/Footer";
import CookieNotice from "./components/CookieNotice";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";


export default function Home() {
  return (
    <>
      <Head>
        <title>InsightCraft – AI-redskaber til selvstændige</title>
        <meta name="description" content="Få adgang til AI-genererede skabeloner, rapporter og værktøjer til freelancere og små virksomheder." />
        <meta property="og:title" content="InsightCraft" />
        <meta property="og:description" content="AI-redskaber til freelancere og små virksomheder" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://insightcraft.dk" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <script defer data-domain="insightcraft.dk" src="https://plausible.io/js/script.js"></script>
      </Head>
      <Hero />
      <About />
      <Audience />
      <Examples />
      <Pricing />
      <NewsletterForm />
      <Footer />
      <CookieNotice />
    </>
  );
}