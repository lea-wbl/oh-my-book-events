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
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Form */}
      <form onSubmit={addReview} className="flex flex-col space-y-4">
        <label htmlFor="question">Nom du client</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-200 px-4 py-2"
        />

        <label htmlFor="answer">Contenu de l'avis</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-200 px-4 py-2"
        />

        <button type="submit" className="bg-orange-400 text-white px-4 py-2">
          Ajouter aux avis
        </button>
      </form>

      {/* List of Questions */}
      <ul className="mt-6 space-y-2 flex flex-wrap gap-4">
        {reviews.map((review) => (
          <li key={review._id} className="border flex w-1/2 p-4 rounded-lg">
            <div className="flex-1">
              <strong>{review.name}</strong> <br />
              <p>{review.content}</p>
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
                onClick={() => deleteReview(review._id)}
                className="cursor-pointer"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
