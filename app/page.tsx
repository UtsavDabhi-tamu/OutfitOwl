"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const profiles = ["Basic", "Goth", "Preppy", "Sporty", "Casual", "Formal"];

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [specialPlans, setSpecialPlans] = useState("");

  const [value, setValue] = useState("");

  const [isOuterLayer, setIsOuterLayer] = useState(true);

  const generateOutfit = () => {
    console.log("Generating outfit with the following details:");
    console.log("Zip Code:", zipCode);
    console.log("Special Plans:", specialPlans);
    console.log("val:", value);
    setIsOuterLayer(!isOuterLayer);
  };

  return (
    <div className="flex w-full max-h-[600px]">
      <div className="w-3/5">
        <div className="container mx-auto p-4 h-full">
          <div className="flex items-center bg-white shadow-lg rounded p-20 mb-4 h-full w-full">
            <div className="w-full">
              {/* Dropdown Upper right*/}
              <div className="flex justify-end mb-4">
                <Select onValueChange={(value) => setValue(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Profile" />
                  </SelectTrigger>
                  <SelectContent>
                    {profiles.map((profile) => (
                      <SelectItem
                        value={profile}
                        onSelect={() => {
                          console.log(
                            "Profile before setting state: ",
                            profile
                          );
                          setValue(profile);
                          console.log("State after setting: ", value);
                        }}>
                        {profile}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="zip-code">
                  What zip code do you live in?
                </label>
                <Input
                  id="zip-code"
                  type="text"
                  placeholder="Enter your zip code"
                  value={zipCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setZipCode(e.target.value)
                  }
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="special-plans">
                  Any special plans today?
                </label>
                <Input
                  id="special-plans"
                  type="text"
                  placeholder="What are your plans?"
                  value={specialPlans}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSpecialPlans(e.target.value)
                  }
                />
              </div>

              <div className="flex items-center justify-center">
                <Button color="primary" onClick={generateOutfit}>
                  Generate Outfit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/5">
        <div className="container mx-auto p-4 flex items-center justify-center h-full">
          {isOuterLayer ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <Image
                  src="/shirt.jfif"
                  alt="Upper Body"
                  width={200}
                  height={200}
                />
              </div>
              <div className="row-start-2">
                <Image
                  src="/pants.jfif"
                  alt="Lower Body"
                  width={200}
                  height={200}
                />
              </div>
              <div className="row-span-2 col-start-2 flex items-center">
                <Image
                  src="/jacket.jpg"
                  alt="Outer Upper Body Layer"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="">
                <Image
                  src="/shirt.jfif"
                  alt="Upper Body"
                  width={200}
                  height={200}
                />
              </div>
              <div className="row-start-2">
                <Image
                  src="/pants.jfif"
                  alt="Lower Body"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
