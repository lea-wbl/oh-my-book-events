"use client";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { PencilEdit02Icon, Delete02Icon } from "hugeicons-react";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { Toaster, toast } from "react-hot-toast";
import { Review } from "@/interfaces/interfaces";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const initialState = {
  name: "",
  content: "",
};

const Reviews = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>(initialState);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const reversedReviews = useMemo(() => [...reviews].reverse(), [reviews]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/adminDashboard/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get("/api/reviews")
        .then((res) => setReviews(res.data))
        .catch((error) => {
          console.error("Erreur lors du chargement des avis", error);
          toast.error("Erreur lors du chargement des avis");
        })
        .finally(() => setIsLoading(false));
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.content)
      return toast.error("Tous les champs doivent être remplis");
    try {
      if (isEditing) {
        const response = await axios.put("/api/reviews", {
          id: selectedId,
          ...newReview,
        });
        if (response.status === 200) {
          setReviews((prev) =>
            prev.map((review) =>
              review._id === selectedId ? response.data : review
            )
          );
          setIsEditing(false);
          setNewReview(initialState);
          toast.success("Avis mis à jour !", {
            duration: 4000,
          });
        }
      } else {
        const response = await axios.post("/api/reviews", newReview);
        if (response.status === 201) {
          setReviews((prev) => [...prev, response.data]);
          setNewReview(initialState);
          toast.success("Avis ajouté !", {
            duration: 4000,
          });
        }
      }
    } catch (error) {
      if (isEditing) {
        console.error("Erreur lors de la mise à jour de l'avis", error);
        toast.error("Erreur lors de la mise à jour de l'avis");
      } else {
        console.error("Erreur lors de l'ajout de l'avis", error);
        toast.error("Erreur lors de l'ajout de l'avis");
      }
    }
  };

  const deleteReview = async () => {
    try {
      const response = await axios.delete("/api/reviews", {
        data: { id: selectedId },
      });

      if (response.status === 200) {
        setReviews((prev) =>
          prev.filter((review) => review._id !== selectedId)
        );
        toast.success("Avis supprimé !", {
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis", error);
      toast.error("Erreur lors de la suppression de l'avis");
    }
  };

  const handleOpenConfirmation = (id: string) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const startEditing = (review: Review) => {
    setIsEditing(true);
    setNewReview({
      name: review.name,
      content: review.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if (review._id) {
        setSelectedId(review._id);
      }
    }, 1000);
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setSelectedId(null);
    }
    setNewReview(initialState);
  };

  if (isLoading || status === "loading")
    return <Loader fullWidth={status !== "authenticated"} />;

  return (
    <div>
      <Toaster />

      <h1 className="text-2xl font-bold mb-8">Avis de la communauté</h1>

      <h2 className="text-xl mb-4">
        {isEditing ? "Modifier un avis" : "Ajouter un nouvel avis"}
      </h2>
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid flex-1 gap-1">
          <label htmlFor="name">Nom du client</label>
          <input
            type="text"
            id="name"
            value={newReview.name}
            onChange={(e) =>
              setNewReview({ ...newReview, name: e.target.value.trimStart() })
            }
            minLength={2}
            className="bg-gray-200 px-4 py-2 rounded"
          />
        </div>

        <div className="grid flex-1 gap-1">
          <label htmlFor="content">Contenu de l'avis</label>
          <textarea
            id="content"
            value={newReview.content}
            onChange={(e) =>
              setNewReview({
                ...newReview,
                content: e.target.value.trimStart(),
              })
            }
            minLength={3}
            className="bg-gray-200 px-4 py-2 rounded field-sizing-content min-h-16"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className={`bg-gray-300 px-4 py-2 rounded font-semibold border-2 border-gray-300 ${
              JSON.stringify(newReview) === JSON.stringify(initialState)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white"
            }`}
            disabled={
              JSON.stringify(newReview) === JSON.stringify(initialState)
            }
          >
            Annuler
          </button>
          <button
            type="submit"
            className={`bg-orange-400 text-white px-4 py-2 w-fit self-end rounded font-semibold border-2 border-orange-400 ${
              JSON.stringify(newReview) === JSON.stringify(initialState)
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-orange-400 hover:bg-white"
            }`}
            disabled={
              JSON.stringify(newReview) === JSON.stringify(initialState)
            }
          >
            {isEditing ? "Modifier l'avis" : "Ajouter aux avis"}
          </button>
        </div>
      </form>

      <hr className="my-8" />

      <h2 className="text-xl mb-4">Avis existants</h2>
      {/* List of reviews */}
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucun avis n'a été ajouté pour le moment
        </p>
      ) : (
        <ul className="grid lg:grid-cols-2 gap-4">
          {reversedReviews.map((review) => (
            <li
              key={review._id}
              className={
                isEditing && selectedId === review._id
                  ? "text-gray-500 border grid gap-4 p-4 rounded-lg shadow bg-gray-100 cursor-not-allowed"
                  : "border grid gap-4 p-4 rounded-lg shadow"
              }
            >
              <div className="flex-1">
                <div className="flex gap-2 float-right">
                  <button
                    className={
                      isEditing && selectedId === review._id
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    onClick={() => startEditing(review)}
                    disabled={isEditing && selectedId === review._id}
                  >
                    <PencilEdit02Icon
                      size={24}
                      color={
                        isEditing && selectedId === review._id ? "gray" : "blue"
                      }
                    />
                  </button>
                  <button
                    className={
                      isEditing && selectedId === review._id
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    onClick={() =>
                      review._id && handleOpenConfirmation(review._id)
                    }
                    disabled={isEditing && selectedId === review._id}
                  >
                    <Delete02Icon
                      size={24}
                      color={
                        isEditing && selectedId === review._id ? "gray" : "red"
                      }
                    />
                  </button>
                </div>
                <strong>{review.name}</strong>
              </div>
              <p className="whitespace-pre-line">{review.content}</p>
            </li>
          ))}
        </ul>
      )}

      <DeleteConfirmationModal
        isOpen={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onConfirm={deleteReview}
        message="Es-tu sûre de vouloir supprimer cet avis ?"
      />
    </div>
  );
};

export default Reviews;
