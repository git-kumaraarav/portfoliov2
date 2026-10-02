"use client";

import { CalendlyCarousel } from "@/components/ui/crousel";
import info from "./Info.json";

export default function ScrollableCardStackDemo() {
  const certifications = info.certifications.map((certification) => ({
    id: certification.title,
    quote: certification.title,
    org: certification.issuer,
    role: "Certification",
    link: certification.link,
    defaultImage: certification.defaultImage,
    selectedImage: certification.selectedImage,
    alt: certification.title,
  }));

  return (
    <CalendlyCarousel items={certifications} />
  );
}
