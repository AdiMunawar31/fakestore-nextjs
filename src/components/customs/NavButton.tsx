"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  href?: string;
  back?: boolean;
  children: ReactNode;
  className?: string;
}

export default function NavButton({ href, back, children, className }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (back) router.back();
    else if (href) router.push(href);
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
