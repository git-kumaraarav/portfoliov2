"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const LOADING_DURATION = 2500;

function Loader({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DURATION);

    return () => window.clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex h-screen w-full items-center justify-center bg-bg",
          className,
        )}
      >
        <Image
          src="/logos/cat_loading.svg"
          alt="Loading"
          height={400}
          width={400}
        />
      </div>
    );
  }

  return children;
}

export default Loader;