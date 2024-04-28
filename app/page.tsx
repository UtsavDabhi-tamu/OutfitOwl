"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

import * as React from "react";
import ProfileSelector from "@/components/profile-selector";
import { useProfile } from "@/contexts/profileContext";
import { set } from "date-fns";

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [specialPlans, setSpecialPlans] = useState("");

  const { selectedProfile, profiles, profileTypes } = useProfile();

  const [lowerBodyArticle, setLowerBodyArticle] = useState(
    "/images/preferences/Jeans_Solid_2_91.jpg"
  );
  const [upperBodyArticle, setUpperBodyArticle] = useState(
    "/images/preferences/Tee_Cotton_0_175.jpg"
  );
  const [outerArticle, setOuterArticle] = useState(
    "/images/preferences/Blazer_Denim_0_0.jpg"
  );

  const [loading, setLoading] = useState(false);

  const generateOutfit = () => {
    setLoading(true);
    console.log("Generating outfit with the following details:");
    console.log("Zip Code:", zipCode);
    console.log("Special Plans:", specialPlans);
    console.log("Profile:", selectedProfile);
    console.log("Profile Type:", profileTypes.get(selectedProfile));

    fetch("http://127.0.0.1:5328/api/get_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile: selectedProfile,
        clothing_prefs: profileTypes.get(selectedProfile),
        zipcode: zipCode,
        plans: specialPlans,
      }),
    })
      .then((response) => response.json())
      .then((outfit) => {
        console.log(outfit);
        setLowerBodyArticle("/images/wardrobe/" + outfit[0]);
        setUpperBodyArticle("/images/wardrobe/" + outfit[1]);
        if (outfit.length > 2) setOuterArticle("/images/wardrobe/" + outfit[2]);
        else setOuterArticle("");
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
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
        <div className="container flex items-center justify-center h-full p-0">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {outerArticle != "" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex min-w-[200px]">
                    <Image
                      src={upperBodyArticle}
                      alt="Upper Body"
                      width={200}
                      height={200}
                      className="max-h-[250px] min-h-[200px]"
                      style={{
                        width: "auto",
                        margin: "auto",
                      }}
                    />
                  </div>
                  <div className="flex row-start-2 min-w-[200px]">
                    <Image
                      src={lowerBodyArticle}
                      alt="Lower Body"
                      width={200}
                      height={200}
                      className="max-h-[250px] min-h-[200px]"
                      style={{
                        width: "auto",
                        margin: "auto",
                      }}
                    />
                  </div>
                  <div className="flex items-center col-start-2 row-span-2 min-w-[200px]">
                    <Image
                      src={outerArticle}
                      alt="Outer Upper Body Layer"
                      width={200}
                      height={200}
                      className="max-h-[250px] min-h-[200px]"
                      style={{
                        width: "auto",
                        margin: "auto",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="flex items-center">
                    <Image
                      src={upperBodyArticle}
                      alt="Upper Body"
                      width={200}
                      height={200}
                      className="max-h-[250px]  min-h-[200px] justify-self-center"
                      style={{
                        width: "auto",
                        margin: "auto",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center row-start-2">
                    <Image
                      src={lowerBodyArticle}
                      alt="Lower Body"
                      width={200}
                      height={200}
                      className="max-h-[250px] min-h-[200px]"
                      style={{
                        width: "auto",
                        margin: "auto",
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
