import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export function Container({ children, className = "", as = "div" }: ContainerProps) {
  const Tag = as as any;
  const base = "mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-[100px]";
  return <Tag className={`${base} ${className}`.trim()}>{children}</Tag>;
}
