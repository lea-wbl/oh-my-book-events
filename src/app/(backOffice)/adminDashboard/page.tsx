"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import UploadedImagesGrid from "@/components/UploadedImagesGrid";
import { Toaster, toast } from "react-hot-toast";
import { deleteUcareImg } from "@/app/utils/imageManager";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<{ uuid: string; name: string }[]>([]);
  const [newImages, setNewImages] = useState<{ uuid: string; name: string }[]>(
    []
  );
  const [uploaderKey, setUploaderKey] = useState(0);
  const remainingImages = 20 - images.length;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/adminDashboard/login");
    }
  }, [status, router]);

  // get existing images from database
  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get("/api/gallery")
        .then((res) => setImages(res.data))
        .catch((error) => {
          console.error("Erreur lors du chargement des images", error);
          toast.error("Erreur lors du chargement des images");
        })
        .finally(() => setIsLoading(false));
    }
  }, [status]);

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
        setNewImages((prev) => prev.filter((img) => img.uuid !== uuid));
        toast.success("Image supprimée !", {
          duration: 4000,
        });
      }
      if (type === "initial") {
        const response = await axios.delete("/api/gallery", { data: { uuid } });
        if (response.status === 200) {
          setImages((prev) => prev.filter((img) => img.uuid !== uuid));
          toast.success("Image supprimée !", {
            duration: 4000,
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image", error);
      toast.error("Erreur lors de la suppression de l'image");
    }
  };

  // updating images in database (adding new and deleting existing that were deleted)
  const updateGallery = async () => {
    try {
      const response = await axios.post("/api/gallery", {
        newImages: newImages,
      });

      if (response.status === 201) {
        setUploaderKey((prevKey) => prevKey + 1);
        setImages((prevImages) => [...prevImages, ...newImages]);
        setNewImages([]);
      }

      toast.success("Gallerie d'images mise à jour !", {
        duration: 4000,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la gallerie d'images",
        error
      );
      toast.error("Erreur lors de la mise à jour de la gallerie d'images");
    }
  };

  const handleCancel = async () => {
    try {
      await Promise.all(newImages.map((img) => deleteUcareImg(img.uuid)));
      setNewImages([]);
      setUploaderKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Erreur lors de l'annulation de l'ajout d'images", error);
      toast.error("Erreur lors de l'annulation de l'ajout d'images");
    }
  };

  if (isLoading || status === "loading")
    return <Loader fullWidth={status !== "authenticated"} />;

  return (
    <div>
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-8">Gallerie photos</h1>

      {/* ADDING NEW IMAGES */}
      <h2 className="text-xl mb-4">Ajouter de nouvelles images</h2>

      <div className="flex flex-col gap-4">
        <span className="text-sm text-gray-500">
          TIPS: Alterner les formats d&apos;images (portrait, paysage, carré)
          pour un meilleur rendu.
        </span>
        {remainingImages === 0 ? (
          <p className="text-lg font-bold mb-4">
            Nombre maximum d'images atteint.
          </p>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <FileUploaderRegular
                key={uploaderKey}
                sourceList="local, camera, gdrive"
                cameraModes="photo"
                classNameUploader="uc-light uc-orange"
                multiple={true}
                multipleMax={remainingImages}
                pubkey="1f20d7f5d1614fe8cf9a"
                onChange={(file) => handleImages(file)}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold mb-2">
                {newImages.length} nouvelle{newImages.length > 1 && "s"} image
                {newImages.length > 1 && "s"}
              </p>
              {newImages.length > 0 && (
                <UploadedImagesGrid
                  images={newImages}
                  deleteHandler={(uuid) => {
                    deleteImage(uuid, "new");
                  }}
                  gridCols={"md:grid-cols-3 lg:grid-cols-4"}
                />
              )}

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className={`bg-gray-300 px-4 py-2 rounded font-semibold border-2 border-gray-300 ${
                    newImages.length <= 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-white"
                  }`}
                  disabled={newImages.length <= 0}
                >
                  Annuler
                </button>

                <button
                  onClick={updateGallery}
                  className={`bg-orange-400 text-white px-4 py-2 w-fit self-end rounded font-semibold border-2 border-orange-400 ${
                    newImages.length <= 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-orange-400 hover:bg-white"
                  }`}
                  disabled={newImages.length <= 0}
                >
                  Valider la sélection
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <hr className="my-8" />

      {/* DISPLAYING EXISTING IMAGES */}
      <h2 className="text-xl font-semi bold mb-4">Images existantes</h2>

      <div>
        {images.length > 0 ? (
          <div className="flex items-baseline gap-2 mb-2">
            <h2 className="text-lg font-bold">
              {images.length} images existantes
            </h2>
            <span>(min. 10 - max. 20)</span>
          </div>
        ) : (
          <h2 className="text-lg font-bold mb-4">
            Aucune images existantes pour le moment
          </h2>
        )}
        {images.length > 0 && (
          <UploadedImagesGrid
            images={images}
            deleteHandler={(uuid) => {
              deleteImage(uuid, "initial");
            }}
            gridCols={"md:grid-cols-3 lg:grid-cols-4"}
            min={10}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
