"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PencilEdit02Icon, Delete02Icon } from "hugeicons-react";

const EventTypes = () => {
  const [types, setTypes] = useState<
    { _id: string; name: string; desc: string; events: string[] }[]
  >([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    axios.get("/api/eventTypes").then((res) => setTypes(res.data));
  }, []);

  const addType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !desc) return alert("Veuillez remplir tous les champs");

    try {
      const { data } = await axios.post("/api/eventTypes", {
        name,
        desc,
        events: [],
      });
      setTypes([...types, data]);
      setName("");
      setDesc("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du type d'événement", error);
    }
  };

  const deleteType = async (id: string) => {
    await axios.delete("/api/eventTypes", { data: { id } });
    setTypes(types.filter((type) => type._id !== id));
  };

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Form */}
      <form onSubmit={addType} className="flex flex-col space-y-4">
        <label htmlFor="question">Nom du type d'événement</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-200 px-4 py-2"
        />

        <label htmlFor="answer">Description du type d'événement</label>
        <input
          type="text"
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="bg-gray-200 px-4 py-2"
        />

        <button type="submit" className="bg-orange-400 text-white px-4 py-2">
          Ajouter aux types d'événements
        </button>
      </form>

      {/* List of Questions */}
      <ul className="mt-6 space-y-2 flex flex-wrap gap-4">
        {types.map((type) => (
          <li key={type._id} className="border flex w-1/2 p-4 rounded-lg">
            <div className="flex-1">
              <strong>{type.name}</strong> <br />
              <p>{type.desc}</p>
            </div>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventTypes;
