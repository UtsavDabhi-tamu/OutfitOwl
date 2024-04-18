"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ProfileSelector from "@/components/profile-selector";
import AddProfilePopover from "@/components/add-profile-popover";
import { useProfile } from "@/contexts/profileContext";

export default function Preferences() {
  const { selectedProfile, setSelectedProfile, profiles, setProfiles } =
    useProfile();

  return (
    <div className="flex flex-col justify-center">
      <div className="w-1/2 py-12 mx-auto space-y-4">
        <h1 className="text-xl font-semibold">How it Works</h1>
        <p className="">
          To provide more accurate recommendations for you, please rate these
          sample clothes to determine your preferences. Or you can select one of
          our User presets!
        </p>
      </div>

      <div className="flex justify-end w-3/4 gap-4 mx-auto mb-4">
        <ProfileSelector />
        <AddProfilePopover />
      </div>
      <div className="flex w-3/4 mx-auto bg-white rounded-lg shadow-lg"></div>
    </div>
  );
}
