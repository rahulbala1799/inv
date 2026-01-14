import { Navbar } from "@/components/homepage/Navbar";
import { Hero } from "@/components/homepage/Hero";
import { WhatThisIs } from "@/components/homepage/WhatThisIs";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Speed } from "@/components/homepage/Speed";
import { MobileApps } from "@/components/homepage/MobileApps";
import { Testimonials } from "@/components/homepage/Testimonials";
import { ComingSoon } from "@/components/homepage/ComingSoon";
import { Pricing } from "@/components/homepage/Pricing";
import { WhoFor } from "@/components/homepage/WhoFor";
import { Footer } from "@/components/homepage/Footer";

export default function Home() {
  return (
    <div className="bg-white antialiased">
      <Navbar />
      <Hero />
      <WhatThisIs />
      <HowItWorks />
      <Speed />
      <MobileApps />
      <Testimonials />
      <ComingSoon />
      <Pricing />
      <WhoFor />
      <Footer />
    </div>
  );
}
