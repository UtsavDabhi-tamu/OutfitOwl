import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProfile } from "../contexts/profileContext";
import { useState } from "react";

const AddProfilePopover = () => {
  const { selectedProfile, setSelectedProfile, profiles, setProfiles } =
    useProfile();

  const [clothingType, setClothingType] = useState("");
  const [profileName, setProfileName] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverSubmit = () => {
    console.log("Submitting new profile with the following details:");
    console.log("Name:", profileName);
    console.log("Clothing Type:", clothingType);
    setProfiles([...profiles, profileName]);
  };

  return (
    <div className="flex justify-end mb-4">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button>Add New Profile</Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Add New Profile</h4>
              <p className="text-sm text-muted-foreground">
                Enter your info to create a custom profile.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid items-center grid-cols-3 gap-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Profile Name"
                  className="h-8 col-span-2"
                  onChange={(e) => setProfileName(e.target.value)}
                />
              </div>
              <div className="grid items-center h-full grid-cols-3 gap-4">
                <Label htmlFor="clothType">Clothing Type</Label>
                <Select
                  onValueChange={(value) => setClothingType(value)}
                  defaultValue={"Select Type"}
                  value={clothingType ?? ""}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Masculine">Masculine</SelectItem>
                    <SelectItem value="Feminine">Feminine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid items-center grid-cols-3 gap-4">
                <Button
                  className="col-start-3"
                  onClick={() => {
                    handlePopoverSubmit();
                    setPopoverOpen(false);
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddProfilePopover;
