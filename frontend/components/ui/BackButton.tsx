"use client";

import { useRouter } from "next/navigation";
import { IconButton } from "./IconButton";

type BackButtonProps = {
  fallbackHref?: string;
  label?: string;
};

export function BackButton({ fallbackHref = "/home", label = "戻る" }: BackButtonProps) {
  const router = useRouter();

  const onClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return <IconButton icon="back" label={label} onClick={onClick} />;
}
