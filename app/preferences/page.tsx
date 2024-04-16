import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Preferences() {
  return (
    <div className="flex justify-center">
      <div className="space-y-4 py-12 w-1/2">
        <h1 className="text-xl font-semibold">How it Works</h1>
        <p>
          To provide more accurate recommendations for you, please rate these
          sample clothes to determine your preferences. Or you can select one of
          our User presets!
        </p>
      </div>

      {/* <div className="flex justify-end mb-4">
        <Select onValueChange={(value) => setSelectedProfile(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Profile" />
          </SelectTrigger>
          <SelectContent>
            {profiles.map((profile) => (
              <SelectItem
                value={profile}
                onSelect={() => {
                  setSelectedProfile(profile);
                }}>
                {profile}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
}
