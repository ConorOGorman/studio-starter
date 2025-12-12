import React from "react";
import { Container } from "@/components/Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
};

export function Section({ children, className = "", containerClassName = "", bleed = false }: SectionProps) {
  return (
    <section className={className}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
