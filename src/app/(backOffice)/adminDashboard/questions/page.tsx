"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PencilEdit02Icon, Delete02Icon } from "hugeicons-react";

const Questions = () => {
  const [questions, setQuestions] = useState<
    { _id: string; question: string; answer: string }[]
  >([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    axios.get("/api/questions").then((res) => setQuestions(res.data));
  }, []);

  const addQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return alert("Veuillez remplir tous les champs");

    try {
      const { data } = await axios.post("/api/questions", { question, answer });
      setQuestions([...questions, data]); // Update state with new question
      setQuestion(""); // Clear input
      setAnswer("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la question", error);
    }
  };

  const deleteUser = async (id: string) => {
    await axios.delete("/api/questions", { data: { id } });
    setQuestions(questions.filter((question) => question._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">FAQ</h1>

      <h2 className="text-xl font-semi bold mb-4">
        Ajouter une nouvelle question
      </h2>
      {/* Form */}
      <form onSubmit={addQuestion} className="flex flex-col gap-4">
        <div className="grid flex-1 gap-1">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded"
          />
        </div>
        <div className="grid flex-1 gap-1">
          <label htmlFor="answer">Réponse</label>
          <textarea
            id="answer"
            className="bg-gray-200 px-4 py-2 w-full field-sizing-content min-h-16 rounded"
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-orange-400 text-white px-4 py-2 w-fit self-end mt-4 rounded"
        >
          Ajouter à la FAQ
        </button>
      </form>

      <hr className="my-8" />

      <h2 className="text-xl font-semi bold mb-4">Questions existantes</h2>

      {/* List of Questions */}
      <ul className="mt-6 grid md:grid-cols-2 gap-4">
        {questions.map((q) => (
          <li key={q._id} className="border grid gap-4 p-4 rounded-lg shadow">
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
                  onClick={() => deleteUser(q._id)}
                  className="cursor-pointer"
                />
              </div>
              <strong>{q.question}</strong>
            </div>
            <p>{q.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
