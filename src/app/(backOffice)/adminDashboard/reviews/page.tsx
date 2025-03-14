"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PencilEdit02Icon, Delete02Icon } from "hugeicons-react";

const Reviews = () => {
  const [reviews, setReviews] = useState<
    { _id: string; name: string; content: string }[]
  >([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("/api/reviews").then((res) => setReviews(res.data));
  }, []);

  const addReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) return alert("Veuillez remplir tous les champs");

    try {
      const { data } = await axios.post("/api/reviews", { name, content });
      setReviews([...reviews, data]);
      setName("");
      setContent("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis", error);
    }
  };

  const deleteReview = async (id: string) => {
    await axios.delete("/api/reviews", { data: { id } });
    setReviews(reviews.filter((review) => review._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Avis de la communauté</h1>

      <h2 className="text-xl font-semi bold mb-4">Ajouter un nouvel avis</h2>
      {/* Form */}
      <form onSubmit={addReview} className="flex flex-col space-y-4">
        <div className="grid flex-1 gap-1">
          <label htmlFor="name">Nom du client</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded"
          />
        </div>
        <div className="grid flex-1 gap-1">
          <label htmlFor="content">Contenu de l'avis</label>
          <textarea
            id="content"
            className="bg-gray-200 px-4 py-2 w-full field-sizing-content min-h-16"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-orange-400 text-white px-4 py-2 w-fit self-end mt-4 rounded"
        >
          Ajouter aux avis
        </button>
      </form>

      <hr className="my-8" />

      <h2 className="text-xl font-semi bold mb-4">Avis existants</h2>
      {/* List of Questions */}
      <ul className="mt-6 grid grid-cols-2 gap-4">
        {reviews.map((review) => (
          <li
            key={review._id}
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
                  onClick={() => deleteReview(review._id)}
                  className="cursor-pointer"
                />
              </div>
              <strong>{review.name}</strong>
            </div>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
