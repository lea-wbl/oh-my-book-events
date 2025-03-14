"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PencilEdit02Icon, Delete02Icon } from "hugeicons-react";

const EventTypes = () => {
  const [types, setTypes] = useState<
    {
      _id: string;
      name: string;
      summary: string;
      leading: string;
      description: string;
    }[]
  >([]);
  const [newType, setNewType] = useState({
    name: "",
    summary: "",
    leading: "",
    description: "",
  });

  useEffect(() => {
    axios.get("/api/eventTypes").then((res) => setTypes(res.data));
  }, []);

  const addType = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasEmptyField = Object.values(newType).some(
      (value) => value.length === 0
    );

    if (hasEmptyField) return alert("Veuillez remplir tous les champs");

    try {
      const { data } = await axios.post("/api/eventTypes", newType);
      setTypes([...types, data]);
      setNewType({ name: "", summary: "", leading: "", description: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout du type d'événement", error);
    }
  };

  const deleteType = async (id: string) => {
    await axios.delete("/api/eventTypes", { data: { id } });
    setTypes(types.filter((type) => type._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Types d'événements proposés</h1>

      <h2 className="text-xl font-semi bold mb-4">
        Ajouter un nouveau type d'événement
      </h2>
      {/* Form */}
      <form onSubmit={addType} className="flex flex-col gap-4">
        <div className="grid flex-1 gap-1">
          <label htmlFor="name">Nom du type d'événement</label>
          <input
            type="text"
            id="name"
            value={newType.name}
            onChange={(e) => setNewType({ ...newType, name: e.target.value })}
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
            className="bg-gray-200 px-4 py-2 w-full field-sizing-content min-h-16"
            value={newType.summary}
            onChange={(e) =>
              setNewType({ ...newType, summary: e.target.value })
            }
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
              setNewType({ ...newType, leading: e.target.value })
            }
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
            className="bg-gray-200 px-4 py-2 w-full field-sizing-content min-h-16"
            value={newType.description}
            onChange={(e) =>
              setNewType({ ...newType, description: e.target.value })
            }
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-orange-400 text-white px-4 py-2 w-fit self-end mt-4 rounded"
        >
          Ajouter aux types d'événements
        </button>
      </form>

      <hr className="my-8" />

      <h2 className="text-xl font-semi bold mb-4">
        Types d'événement existants
      </h2>
      {/* List of Questions */}
      <ul className="mt-6 grid grid-cols-2 gap-4">
        {types.map((type) => (
          <li
            key={type._id}
            className="border grid gap-4 p-4 rounded-lg shadow"
          >
            <div className="flex-1">
              <div className="flex gap-2 float-right">
                <PencilEdit02Icon
                  size={24}
                  color={"blue"}
                  className="cursor-pointer"
                />
                <Delete02Icon
                  size={24}
                  color={"red"}
                  onClick={() => deleteType(type._id)}
                  className="cursor-pointer"
                />
              </div>
              <strong className="text-lg">{type.name}</strong>
            </div>
            <p className="italic">{type.summary}</p>
            <p className="font-semibold">{type.leading}</p>
            <p>{type.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventTypes;
