"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Delete02Icon } from "hugeicons-react";
import { deleteUcareImg } from "@/app/utils/imageManager";

interface UploadedImagesGridProps {
  images: { uuid: string; name: string }[];
  deleteHandler: (uuid: string) => void;
  gridCols: string;
}

const UploadedImagesGrid: FC<UploadedImagesGridProps> = ({
  images,
  deleteHandler,
  gridCols = "md:grid-cols-3",
}) => {
  if (!images || images.length === 0) return null;

  return (
    <div className={`grid ${gridCols} gap-2 flex-1`}>
      {images.map((img) => (
        <div
          key={img.uuid}
          className="flex items-center justify-between gap-2 bg-gray-100 p-2 h-14"
        >
          <Image
            src={`https://ucarecdn.com/${img.uuid}/`}
            alt="File icon"
            width={200}
            height={200}
            className="h-full w-auto"
          />
          <div className="truncate">{img.name}</div>
          <div
            className="flex items-center"
            onClick={() => {
              deleteUcareImg(img.uuid);
              deleteHandler(img.uuid);
            }}
          >
            <Delete02Icon className="h-6 w-6 text-gray-500 cursor-pointer ml-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadedImagesGrid;
