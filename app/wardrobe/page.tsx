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
  const totalImages = 1007; // Total number of images, from 0.jpg to 1006.jpg
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = Array.from(
    { length: imagesPerPage },
    (_, i) => i + indexOfFirstImage
  ).filter((index) => index < totalImages);

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
          <div key={index} className="w-[200px] h-[200px] relative">
            <Image
              src={imagePath + `${index}.jpg`}
              alt={`Loaded Image ${index}`}
              fill={true}
              object-fit="contain"
              className="rounded-md shadow-sm bg-white z-[-1]"
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
