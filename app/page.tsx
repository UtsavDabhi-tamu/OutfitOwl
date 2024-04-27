"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

import * as React from "react";
import ProfileSelector from "@/components/profile-selector";
import { useProfile } from "@/contexts/profileContext";

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [specialPlans, setSpecialPlans] = useState("");

  const { selectedProfile, profiles, profileTypes } =
    useProfile();

  const [isOuterLayer, setIsOuterLayer] = useState(true);

  const generateOutfit = () => {
    console.log("Generating outfit with the following details:");
    console.log("Zip Code:", zipCode);
    console.log("Special Plans:", specialPlans);
    console.log("Profile:", selectedProfile);
    console.log("Profile Type:", profileTypes.get(selectedProfile));

    fetch('http://127.0.0.1:5328/api/get_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile: selectedProfile,
        clothing_prefs: profileTypes.get(selectedProfile),
        zipcode: zipCode,
        plans: specialPlans
      })
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        setIsOuterLayer(!isOuterLayer);
      })
      .catch(err => {
        console.log(err)
      });
  };

  return (
    <div className="flex w-full h-[550px] bg-white shadow-lg rounded-lg my-6">
      <div className="w-7/12">
        <div className="container h-full p-4">
          <div className="flex items-center w-full h-full p-12 mb-4">
            <div className="w-full">
              {/* Dropdown Upper right*/}
              <div className="flex justify-end mb-4">
                <ProfileSelector />
              </div>

              {/* Zip Code Form */}
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="zip-code"
                >
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

              {/* Special Plans Form */}
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="special-plans"
                >
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
                <Button onClick={generateOutfit}>Generate Outfit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" className="my-auto h-5/6" />
      <div className="w-5/12">
        <div className="container flex items-center justify-center h-full p-4">
          {isOuterLayer ? (
            <div className="grid h-full grid-cols-2 gap-4">
              <div className="flex justify-center">
                <Image
                  src="/images/shirt.jfif"
                  alt="Upper Body"
                  width={200}
                  height={200}
                  className="max-h-[250px]"
                  style={{
                    width: "auto",
                  }}
                />
              </div>
              <div className="flex justify-center row-start-2">
                <Image
                  src="/images/pants.jfif"
                  alt="Lower Body"
                  width={200}
                  height={200}
                  className="max-h-[250px]"
                  style={{
                    width: "auto",
                  }}
                />
              </div>
              <div className="flex items-center col-start-2 row-span-2">
                <Image
                  src="/images/jacket.jpg"
                  alt="Outer Upper Body Layer"
                  width={200}
                  height={200}
                  className="max-h-[250px]"
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center">
                <Image
                  src="/images/shirt.jfif"
                  alt="Upper Body"
                  width={200}
                  height={200}
                  className="max-h-[250px]"
                  style={{
                    width: "auto",
                  }}
                />
              </div>
              <div className="flex items-center justify-center row-start-2">
                <Image
                  src="/images/pants.jfif"
                  alt="Lower Body"
                  width={200}
                  height={200}
                  className="max-h-[250px]"
                  style={{
                    width: "auto",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
