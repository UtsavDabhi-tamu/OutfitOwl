"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "../context/profileContext";

const ProfileSelector = () => {
  const { selectedProfile, setSelectedProfile, profiles, setProfiles } = useProfile();

  return (
    <div className="">
      <Select
        onValueChange={(value) => setSelectedProfile(value)}
        defaultValue={"Select Profile"}
        value={selectedProfile ?? ''}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Profile" />
        </SelectTrigger>
        <SelectContent>
          {profiles.map((profile: string) => (
            <SelectItem
              key={profile}
              value={profile}
              onSelect={() => {
                setSelectedProfile(profile);
              }}
            >
              {profile}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProfileSelector;
