"use client";

import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";

export default function Wardrobe() {
  const imagePath = "/images/wardrobe/";
  const totalImages = 1000; // Total number of images, from 0.jpg to 1006.jpg
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = Array.from(
    { length: imagesPerPage },
    (_, i) => i + indexOfFirstImage
  ).filter((index) => index < totalImages);

  const [imageFilenames, setImageFilenames] = useState<string[]>([]);

  // fetch img file names
  useEffect(() => {
    const fetchImageFilenames = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5328/api/ward_img_filenames"
        );
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
    <div className="flex flex-col justify-center min-h-screen">
      {/* Header */}
      <div className="w-1/2 py-12 mx-auto space-y-4">
        <h1 className="text-xl font-semibold">Your Wardrobe</h1>
        <p className="">
          These are the clothes we can recommend for you to wear. Upload your
          own pictures or use these default clothes for now.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid w-full grid-cols-4 gap-4 mx-auto justify-items-center xl:grid-cols-5">
        {currentImages.map((index) => (
          <div
            key={index}
            className="w-[200px] h-[200px] relative rounded-md shadow-sm bg-white flex items-center overflow-hidden"
          >
            <Image
              src={imagePath + `${imageFilenames[index]}`}
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
