import { ReactNode } from "react";

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

const ContentSection = ({ children, className = "", centered = false }: ContentSectionProps) => {
  return (
    <section className={`py-16 md:py-24 px-6 md:px-8 ${className}`}>
      <div className={`max-w-5xl mx-auto ${centered ? "text-center" : ""}`}>
        {children}
      </div>
    </section>
  );
};

export default ContentSection;
