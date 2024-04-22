"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import ProfileSelector from "@/components/profile-selector";
import AddProfilePopover from "@/components/add-profile-popover";
import { useProfile } from "@/contexts/profileContext";
import { useState, useEffect } from "react";

export default function Preferences() {
  const { selectedProfile, setSelectedProfile, profiles, setProfiles } =
    useProfile();

  const categories = [
    "Blazer",
    "Blouse",
    "Hoodie",
    "Jacket",
    "Sweater",
    "Tee",
    "Top",
    "Cutoffs",
    "Jeans",
    "Leggings",
    "Shorts",
    "Skirt",
    "Sweatpants",
    "Coat",
  ];

  const subCategories = [
    ["Floral", "Denim", "Leather", "Knit"],
    ["Floral", "Striped", "Embroidered", "Sleeveless", "Leather", "Knit"],
    ["Floral", "Graphic", "Striped", "Sleeveless", "Denim", "Leather", "Knit"],
    ["Floral", "Striped", "Embroidered", "Denim", "Leather", "Knit"],
    ["Floral", "Graphic", "Striped", "Solid", "Sleeveless", "Knit", "Loose"],
    [
      "Floral",
      "Graphic",
      "Striped",
      "Embroidered",
      "Denim",
      "Cotton",
      "Leather",
      "Knit",
      "Loose",
    ],
    [
      "Floral",
      "Graphic",
      "Striped",
      "Embroidered",
      "Long_sleeve",
      "Denim",
      "Leather",
      "Knit",
      "Loose",
    ],
    ["Floral", "Embroidered", "Solid", "Denim"],
    ["Solid", "Denim", "Leather"],
    ["Floral", "Striped", "Solid", "Leather", "Knit"],
    [
      "Floral",
      "Graphic",
      "Striped",
      "Embroidered",
      "Denim",
      "Cotton",
      "Leather",
      "Knit",
    ],
    ["Floral", "Graphic", "Striped", "Embroidered", "Denim", "Leather", "Knit"],
    ["Floral", "Graphic", "Striped", "Leather", "Knit"],
    ["Denim", "Cotton", "Leather", "Knit"],
  ];

  const [imageFilenames, setImageFilenames] = useState<string[]>([]);
  const [likedImages, setLikedImages] = useState<{
    categoryCount: number;
    images: Set<string>;
  }>({
    categoryCount: 0,
    images: new Set<string>(),
  });

  const imagePath = "/images/preferences";
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = categories.length;
  const currCategory = categories[currentPage - 1];
  const currSubCategories = subCategories[currentPage - 1];

  useEffect(() => {
    const fetchImageFilenames = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5328/api/img_filenames"); // Adjust the URL to your Flask endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setImageFilenames(data);
      } catch (error) {
        console.error("Failed to fetch image filenames:", error);
      }
    };

    fetchImageFilenames();
  }, []);

  const currImages = imageFilenames.filter((path: string) =>
    currSubCategories.some((subCategory: string) =>
      path.includes(`${currCategory}_${subCategory}`)
    )
  );

  const handleLike = (subPath: string) => {
    setLikedImages((prev) => {
      const newLikedImages = {
        categoryCount: 0,
        images: new Set<string>(prev.images),
      };
      if (newLikedImages["images"].has(subPath)) {
        newLikedImages["images"].delete(subPath);
      } else {
        newLikedImages["images"].add(subPath);
      }
      newLikedImages["categoryCount"] = new Set(
        Array.from(newLikedImages.images).map((path) => path.split("/")[0])
      ).size;
      return newLikedImages;
    });
  };

  const sendPreferences = () => {
    console.log(likedImages);
    fetch("http://127.0.0.1:5328/api/store_preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        outfit_ids: Array.from(likedImages["images"]),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paginationItems = () => {
    let items = [];

    // Helper to create a PaginationItem for a page number
    const createPageItem = (page: number) => (
      <PaginationItem key={page} className="pagination-list-style-none">
        <PaginationLink
          onClick={() => setCurrentPage(page)}
          isActive={currentPage === page}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    );

    // Previous page button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => setCurrentPage(currentPage - 1)}
          aria-disabled={currentPage <= 1}
          tabIndex={currentPage <= 1 ? -1 : undefined}
          className={
            currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
          }
        />
      </PaginationItem>
    );
    items.push(createPageItem(1));

    // Second page edge case
    if (currentPage === 5) {
      items.push(createPageItem(2));
    }

    // First ellipsis
    if (currentPage > 5) {
      items.push(<PaginationEllipsis key="ellipsis1" />);
    }

    // Page numbers around the current page
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);
    for (let page = startPage; page <= endPage; page++) {
      items.push(createPageItem(page));
    }

    // Second page to last edge case
    if (currentPage === totalPages - 4) {
      items.push(createPageItem(totalPages - 1));
    }

    // Last ellipsis
    if (currentPage < totalPages - 4) {
      items.push(<PaginationEllipsis key="ellipsis2" />);
    }

    // Last page
    items.push(createPageItem(totalPages));

    // Next page button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => setCurrentPage(currentPage + 1)}
          aria-disabled={currentPage === totalPages}
          tabIndex={currentPage === totalPages ? -1 : undefined}
          className={
            currentPage === totalPages
              ? "pointer-events-none opacity-50"
              : undefined
          }
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <div className="flex flex-col justify-center">
      {/* Header */}
      <div className="w-1/2 py-12 mx-auto space-y-4">
        <h1 className="text-xl font-semibold">How it Works</h1>
        <p className="">
          To provide more accurate recommendations for you, please like some of
          these sample clothes to help us determine your preferences. Or you can
          select one of our preset profiles!
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-4 gap-4 mx-auto justify-items-center xl:grid-cols-5">
        {/* <div className="flex justify-end w-full col-span-4 gap-4 mb-4 xl:col-span-5">
        </div> */}
        <div className="flex justify-between w-full col-span-4 mb-4 xl:col-span-5">
          <h3 className="font-semibold text-xl my-auto">
            {categories[currentPage - 1]}
            {categories[currentPage - 1][
              categories[currentPage - 1].length - 1
            ] == "s"
              ? ""
              : "s"}
          </h3>
          <div className="flex gap-4">
            <ProfileSelector />
            {/* <AddProfilePopover /> */}
            <Button
              onClick={() => sendPreferences()}
              disabled={likedImages["categoryCount"] !== categories.length}
            >
              Submit
            </Button>
          </div>
        </div>

        {currImages.map((subPath, index) => (
          <div
            key={index}
            className="w-[200px] h-[200px] relative rounded-md shadow-sm bg-white flex items-center overflow-hidden"
          >
            <Button
              onClick={() => handleLike(subPath)}
              style={{
                color: likedImages["images"].has(subPath) ? "red" : "grey",
              }}
              variant="heart"
              className="absolute top-0 right-0 p-2 m-2 text-3xl rounded-md shadow-md"
            >
              ♥
            </Button>
            <Image
              src={`${imagePath}/${subPath}`}
              alt={`Loaded Image ${index}`}
              width={200}
              height={200}
              object-fit="contain"
              className="max-w-[200px] max-h-[200px] mx-auto"
              style={{
                width: "auto",
              }}
            />
            {/* <p>{subPath.split('/')[1]}</p> */}
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="h-[72px]"> </div>

      {/* Pagination */}
      <div className="fixed inset-x-0 bottom-0 py-4 bg-zinc-200">
        <Pagination>
          <PaginationContent>{paginationItems()}</PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
