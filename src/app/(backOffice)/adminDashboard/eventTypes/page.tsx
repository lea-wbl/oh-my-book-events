"use client";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { PencilEdit02Icon, Delete02Icon } from "hugeicons-react";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { Toaster, toast } from "react-hot-toast";
import { EventType } from "@/interfaces/interfaces";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const initialState = {
  name: "",
  summary: "",
  leading: "",
  description: "",
};

const EventTypes = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState<EventType[]>([]);
  const [newType, setNewType] = useState(initialState);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const reversedTypes = useMemo(() => [...types].reverse(), [types]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/adminDashboard/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get("/api/eventTypes")
        .then((res) => setTypes(res.data))
        .catch((error) => {
          console.error(
            "Erreur lors du chargement des types d'événement",
            error
          );
          toast.error("Erreur lors du chargement des types d'événement");
        })
        .finally(() => setIsLoading(false));
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasEmptyField = Object.values(newType).some(
      (value) => value.length === 0
    );

    if (hasEmptyField)
      return toast.error("Tous les champs doivent être remplis");

    try {
      if (isEditing) {
        const response = await axios.put("/api/eventTypes", {
          id: selectedId,
          ...newType,
        });
        if (response.status === 200) {
          setTypes((prev) =>
            prev.map((type) => (type._id === selectedId ? response.data : type))
          );
          setIsEditing(false);
          setNewType(initialState);
          toast.success("Type d'événement mis à jour !", {
            duration: 4000,
          });
        }
      } else {
        const response = await axios.post("/api/eventTypes", newType);
        if (response.status === 201) {
          setTypes((prev) => [...prev, response.data]);
          setNewType(initialState);
          toast.success("Type d'événement ajouté !", {
            duration: 4000,
          });
        }
      }
    } catch (error) {
      if (isEditing) {
        console.error(
          "Erreur lors de la mise à jour du type d'événement",
          error
        );
        toast.error("Erreur lors de la mise à jour du type d'événement");
      } else {
        console.error("Erreur lors de l'ajout du type d'événement", error);
        toast.error("Erreur lors de l'ajout du type d'événement");
      }
    }
  };

  const deleteType = async () => {
    try {
      const response = await axios.delete("/api/eventTypes", {
        data: { id: selectedId },
      });

      if (response.status === 200) {
        setTypes((prev) => prev.filter((type) => type._id !== selectedId));
        toast.success("Type d'événement supprimé !", {
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du type d'événement", error);
      toast.error("Erreur lors de la suppression du type d'événement");
    }
  };

  const handleOpenConfirmation = (id: string) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const startEditing = (type: EventType) => {
    setIsEditing(true);
    setNewType({
      name: type.name,
      summary: type.summary,
      leading: type.leading,
      description: type.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if (type._id) {
        setSelectedId(type._id);
      }
    }, 1000);
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setSelectedId(null);
    }
    setNewType(initialState);
  };

  if (isLoading || status === "loading")
    return <Loader fullWidth={status !== "authenticated"} />;

  return (
    <div>
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-8">Types d'événements proposés</h1>

      <h2 className="text-xl mb-4">
        {isEditing
          ? "Modifier un type d'événement"
          : "Ajouter un nouveau type d'événement"}
      </h2>
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid flex-1 gap-1">
          <label htmlFor="name">Nom du type d'événement</label>
          <input
            type="text"
            id="name"
            value={newType.name}
            onChange={(e) =>
              setNewType({ ...newType, name: e.target.value.trimStart() })
            }
            minLength={2}
            className="bg-gray-200 px-4 py-2 rounded"
          />
        </div>

        <div className="grid flex-1 gap-1">
          <label htmlFor="summary">
            Résumé{" "}
            <span className="text-gray-500 text-sm">
              (pour carte cliquable)
            </span>
          </label>
          <textarea
            id="summary"
            value={newType.summary}
            onChange={(e) =>
              setNewType({ ...newType, summary: e.target.value.trimStart() })
            }
            minLength={2}
            className="bg-gray-200 px-4 py-2 rounded field-sizing-content min-h-16"
          ></textarea>
        </div>

        <div className="grid flex-1 gap-1">
          <label htmlFor="leading">
            Phrase d'accroche{" "}
            <span className="text-gray-500 text-sm">(pour page détail)</span>
          </label>
          <input
            type="text"
            id="leading"
            value={newType.leading}
            onChange={(e) =>
              setNewType({ ...newType, leading: e.target.value.trimStart() })
            }
            minLength={2}
            className="bg-gray-200 px-4 py-2 rounded"
          />
        </div>

        <div className="grid flex-1 gap-1">
          <label htmlFor="description">
            Description{" "}
            <span className="text-gray-500 text-sm">(pour page détail)</span>
          </label>
          <textarea
            id="description"
            value={newType.description}
            onChange={(e) =>
              setNewType({
                ...newType,
                description: e.target.value.trimStart(),
              })
            }
            minLength={2}
            className="bg-gray-200 px-4 py-2 rounded field-sizing-content min-h-16"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className={`bg-gray-300 px-4 py-2 rounded font-semibold border-2 border-gray-300 ${
              JSON.stringify(newType) === JSON.stringify(initialState)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white"
            }`}
            disabled={JSON.stringify(newType) === JSON.stringify(initialState)}
          >
            Annuler
          </button>
          <button
            type="submit"
            className={`bg-orange-400 text-white px-4 py-2 w-fit self-end rounded font-semibold border-2 border-orange-400 ${
              JSON.stringify(newType) === JSON.stringify(initialState)
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-orange-400 hover:bg-white"
            }`}
            disabled={JSON.stringify(newType) === JSON.stringify(initialState)}
          >
            {isEditing
              ? "Modifier le type d'événement"
              : "Ajouter aux types d'événements"}
          </button>
        </div>
      </form>

      <hr className="my-8" />

      <h2 className="text-xl mb-4">Types d'événement existants</h2>
      {/* List of event types */}
      {types.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucun type d'événement n'a été ajouté pour le moment
        </p>
      ) : (
        <ul className="grid lg:grid-cols-2 gap-4">
          {reversedTypes.map((type) => (
            <li
              key={type._id}
              className={
                isEditing && selectedId === type._id
                  ? "text-gray-500 border grid gap-4 p-4 rounded-lg shadow bg-gray-100 cursor-not-allowed"
                  : "border grid gap-4 p-4 rounded-lg shadow"
              }
            >
              <div className="flex-1">
                <div className="flex gap-2 float-right">
                  <button
                    className={
                      isEditing && selectedId === type._id
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    onClick={() => startEditing(type)}
                    disabled={isEditing && selectedId === type._id}
                  >
                    <PencilEdit02Icon
                      size={24}
                      color={
                        isEditing && selectedId === type._id ? "gray" : "blue"
                      }
                    />
                  </button>
                  <button
                    className={
                      isEditing && selectedId === type._id
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    onClick={() => type._id && handleOpenConfirmation(type._id)}
                    disabled={isEditing && selectedId === type._id}
                  >
                    <Delete02Icon
                      size={24}
                      color={
                        isEditing && selectedId === type._id ? "gray" : "red"
                      }
                    />
                  </button>
                </div>
                <strong className="text-lg">{type.name}</strong>
              </div>
              <p className="whitespace-pre-line italic">{type.summary}</p>
              <p className="whitespace-pre-line font-semibold">
                {type.leading}
              </p>
              <p className="whitespace-pre-line">{type.description}</p>
            </li>
          ))}
        </ul>
      )}

      <DeleteConfirmationModal
        isOpen={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onConfirm={deleteType}
        message="Es-tu sûre de vouloir supprimer ce type d'événement ?"
      />
    </div>
  );
};

export default EventTypes;
