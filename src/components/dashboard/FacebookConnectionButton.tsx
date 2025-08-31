'use client';

import { Button } from "@/components/ui/button";
import { initiateFacebookOAuth } from "@/app/(dashboard)/actions";
import { Facebook, Instagram } from "lucide-react";

export function FacebookConnectionButton() {
  return (
    <Button 
      onClick={() => initiateFacebookOAuth()}
      className="w-full sm:w-auto"
      size="lg"
    >
      <Facebook className="h-5 w-5 mr-2" />
      <Instagram className="h-5 w-5 mr-2" />
      Connect Facebook & Instagram
    </Button>
  );
}
