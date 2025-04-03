"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Delete02Icon } from "hugeicons-react";
import { deleteUcareImg } from "@/app/utils/imageManager";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import toast from "react-hot-toast";

interface UploadedImagesGridProps {
  images: { uuid: string; name: string }[];
  deleteHandler: (uuid: string) => void;
  gridCols: string;
  min?: number;
}

const UploadedImagesGrid: FC<UploadedImagesGridProps> = ({
  images,
  deleteHandler,
  gridCols = "md:grid-cols-3",
  min,
}) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleDelete = (uuid: string) => {
    if (min && images.length <= min)
      toast.error(`Il ne peut pas y avoir moins de ${min} images`);
    else {
      setSelectedId(uuid);
      setOpenConfirmation(true);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className={`grid ${gridCols} gap-2 flex-1`}>
        {images.map((img) => (
          <div
            key={img.uuid}
            className="flex items-center justify-between gap-2 bg-gray-100 p-2 h-14 rounded"
          >
            <Image
              src={`https://ucarecdn.com/${img.uuid}/`}
              alt="File icon"
              width={200}
              height={200}
              className="h-full w-auto max-w-[50%]"
            />
            <div className="truncate">{img.name}</div>
            <div
              className="flex items-center"
              onClick={() => handleDelete(img.uuid)}
            >
              <Delete02Icon className="h-6 w-6 text-gray-500 cursor-pointer ml-2" />
            </div>
          </div>
        ))}
      </div>
      <DeleteConfirmationModal
        isOpen={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onConfirm={() => deleteHandler(selectedId)}
        message="Es-tu sûre de vouloir supprimer cette image ?"
      />
    </div>
  );
};

export default UploadedImagesGrid;
