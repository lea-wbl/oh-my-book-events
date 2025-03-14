"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Delete02Icon } from "hugeicons-react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";

const AdminDashboard = () => {
  const [images, setImages] = useState<{ uuid: ""; name: "" }[]>([]);
  const [newImages, setNewImages] = useState<{ uuid: ""; name: "" }[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  // get existging images from database
  useEffect(() => {
    axios.get("/api/gallery").then((res) => {
      console.log(res.data);
      setImages(res.data);
    });
  }, []);

  // adding new images to the state
  const handleImages = (file: any) => {
    setNewImages(
      file.successEntries.map((entry: any) => ({
        uuid: entry.uuid,
        name: entry.name,
      }))
    );
  };

  // deleting images (existing or new)
  const deleteImage = async (uuid: string, type: "new" | "initial") => {
    try {
      await axios.delete(`https://api.uploadcare.com/files/${uuid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Uploadcare.Simple ${process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY}`,
        },
      });
      if (type === "new") {
        setNewImages(newImages.filter((image) => image.uuid !== uuid));
      }
      if (type === "initial") {
        await axios.delete("/api/gallery", { data: { uuid } });
        setImages(images.filter((image) => image.uuid !== uuid));
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // updating images in database (adding new and deleting existing)
  const updateGallery = async () => {
    try {
      await axios.post("/api/gallery", {
        newImages: newImages,
        deletedImages: deletedImages,
      });
      setImages([...images, ...newImages]);
      setNewImages([]);
    } catch (error) {
      console.error("Error updating gallery:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gallerie photos</h1>

      {/* ADDING NEW IMAGES */}
      <h2 className="text-xl font-semi bold mb-4">
        Ajouter de nouvelles images
      </h2>

      <div className="flex flex-col gap-4">
        <span className="text-sm text-gray-500">
          TIPS: Alterner les formats d'images (portrait, paysage, carré) pour un
          meilleur rendu.
        </span>
        <div className="flex items-center gap-4">
          <FileUploaderRegular
            sourceList="local, camera, gdrive"
            cameraModes="photo"
            classNameUploader="uc-light uc-orange"
            pubkey="1f20d7f5d1614fe8cf9a"
            onChange={(file) => handleImages(file)}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold">
            {newImages.length} nouvelle{newImages.length > 1 && "s"} image
            {newImages.length > 1 && "s"}
          </p>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {newImages.length > 0 &&
              newImages.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 bg-gray-100 p-2 mb-2 h-14"
                >
                  <Image
                    src={`https://ucarecdn.com/${image.uuid}/`}
                    alt="File icon"
                    width={200}
                    height={200}
                    className="h-full w-auto"
                  />
                  <div className="truncate">{image.name}</div>
                  <div
                    className="flex items-center"
                    onClick={() => deleteImage(image.uuid, "new")}
                  >
                    <Delete02Icon className="h-6 w-6 text-gray-500 cursor-pointer ml-2" />
                  </div>
                </div>
              ))}
          </div>
          {newImages.length > 0 && (
            <button
              onClick={updateGallery}
              className="bg-orange-400 text-white px-4 py-2 w-fit self-end mt-4 rounded"
            >
              Valider la sélection
            </button>
          )}
        </div>
      </div>

      <hr className="my-8" />

      {/* DISPLAYING EXISTING IMAGES */}
      <h2 className="text-xl font-semi bold mb-4">Images existantes</h2>

      <div>
        {images.length > 0 ? (
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="text-lg font-bold">
              {images.length} images existantes
            </h2>
            <span>(min. 10 - max. 20)</span>
          </div>
        ) : (
          <h2 className="text-xl font-bold mb-4">
            Aucune images existantes pour le moment
          </h2>
        )}
        <div className="grid grid-cols-4 gap-2">
          {images.length > 0 &&
            images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 bg-gray-100 p-2 mb-2 h-14"
              >
                <Image
                  src={`https://ucarecdn.com/${image.uuid}/`}
                  alt="File icon"
                  width={200}
                  height={200}
                  className="h-full w-auto"
                />
                <div className="truncate">{image.name}</div>
                <div
                  className="flex items-center"
                  onClick={() => deleteImage(image.uuid, "initial")}
                >
                  <Delete02Icon className="h-6 w-6 text-gray-500 cursor-pointer ml-2" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
