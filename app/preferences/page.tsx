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

  const emptyArray = Array.from({ length: 200 }, () => false);
  const [likedImages, setLikedImages] = useState<boolean[]>(emptyArray);

  const imagePath = "/images/preferences/";
  const totalImages = 95; // Total number of images, from 0.jpg to 94.jpg
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = Array.from(
    { length: imagesPerPage },
    (_, i) => i + indexOfFirstImage
  ).filter((index) => index < totalImages);

  const handleLike = (index: number) => {
    setLikedImages((prev) => {
      const newLikedImages = [...prev];
      newLikedImages[index] = !newLikedImages[index];
      return newLikedImages;
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

    // First page
    if (currentPage > 4) {
      items.push(<PaginationEllipsis key="ellipsis1" />);
    }

    // Page numbers around the current page
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    for (let page = startPage; page <= endPage; page++) {
      items.push(createPageItem(page));
    }

    // Last page
    if (currentPage < totalPages - 2) {
      items.push(<PaginationEllipsis key="ellipsis2" />);
      items.push(createPageItem(totalPages));
    }

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
        <div className="flex justify-end w-full col-span-4 gap-4 mb-4 xl:col-span-5">
          <ProfileSelector />
          <AddProfilePopover />
        </div>

        {currentImages.map((index) => (
          <div
            key={index}
            className="w-[200px] h-[200px] relative rounded-md shadow-sm bg-white flex items-center overflow-hidden"
          >
            <Button
              onClick={() => handleLike(index)}
              style={{
                color: likedImages[index] ? "red" : "grey",
              }}
              variant="heart"
              className="absolute top-0 right-0 p-2 m-2 text-3xl rounded-md shadow-md"
            >
              ♥
            </Button>
            <Image
              src={imagePath + `${index}.jpg`}
              alt={`Loaded Image ${index}`}
              width={200}
              height={200}
              object-fit="contain"
              className="max-w-[200px] max-h-[200px] mx-auto"
              style={{
                width: "auto",
              }}
            />
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
