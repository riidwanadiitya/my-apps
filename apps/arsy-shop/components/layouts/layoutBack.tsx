"use client";

import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const LayoutBack = ({ children }: IProps) => {
  const router = useRouter();
  return (
    <div>
      <Button
        className="rounded-full cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </Button>
      <div className="mt-3">{children}</div>
    </div>
  );
};

export default LayoutBack;
