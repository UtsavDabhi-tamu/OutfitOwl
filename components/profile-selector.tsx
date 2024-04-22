"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "../contexts/profileContext";

const ProfileSelector = () => {
  const { selectedProfile, setSelectedProfile, profiles, profileTypes } =
    useProfile();

  const logProfile = () => {
    console.log(selectedProfile);
  };

  return (
    <div className="">
      <Select
        onValueChange={(value) => setSelectedProfile(value)}
        defaultValue={"Select Profile"}
        value={selectedProfile ?? ""}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Profile">
            {selectedProfile}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {profiles.map((profile: string) => (
            <SelectItem
              key={profile}
              value={profile}
              onSelect={() => {
                setSelectedProfile(profile);
                logProfile();
              }}
            >
              <div className="font-medium">{profile}</div>
              <div className="ps-2 font-normal">
                -{profileTypes.get(profile)} Clothes
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProfileSelector;
