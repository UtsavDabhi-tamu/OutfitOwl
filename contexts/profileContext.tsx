"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileContextType {
  selectedProfile: string | undefined;
  setSelectedProfile: (profile: string | undefined) => void;
  profiles: string[];
  setProfiles: (profiles: string[]) => void;
  profileTypes: Map<string, string>;
  setProfileTypes: (profileTypes: Map<string, string>) => void;
  profileLikes: Map<string, number[]>;
  setProfileLikes: (profileTypes: Map<string, number[]>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<string | undefined>("Basic");
  const [profiles, setProfiles] = useState<string[]>([
    "Basic",
    "Goth",
    "Preppy",
    "Sporty",
    "Casual",
    "Formal",
  ]);
  const [profileTypes, setProfileTypes] = useState<Map<string, string>>(
    new Map([
      ["Basic", "All"],
      ["Goth", "Feminine"],
      ["Preppy", "Masculine"],
      ["Sporty", "Feminine"],
      ["Casual", "Masculine"],
      ["Formal", "Masculine"],
    ])
  );
  const [profileLikes, setProfileLikes] = useState<Map<string, number[]>>(
    new Map([
      [
        "Basic",
        [
          1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
          0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0,
          0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
          1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0,
          1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0,
          0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0,
          1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1,
          0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0,
          1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
        ],
      ],
      ["Goth", Array(221).fill(0)],
      ["Preppy", Array(221).fill(0)],
      ["Sporty", Array(221).fill(0)],
      ["Casual", Array(221).fill(0)],
      ["Formal", Array(221).fill(0)],
    ])
  );

  return (
    <ProfileContext.Provider
      value={{
        selectedProfile,
        setSelectedProfile,
        profiles,
        setProfiles,
        profileTypes,
        setProfileTypes,
        profileLikes,
        setProfileLikes,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
