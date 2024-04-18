"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileContextType {
  selectedProfile: string | undefined;
  setSelectedProfile: (profile: string | undefined) => void;
  profiles: string[];
  setProfiles: (profiles: string[]) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<string | undefined>();
  const [profiles, setProfiles] = useState<string[]>([
    "Basic",
    "Goth",
    "Preppy",
    "Sporty",
    "Casual",
    "Formal",
  ]);

  return (
    <ProfileContext.Provider
      value={{ selectedProfile, setSelectedProfile, profiles, setProfiles }}
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
