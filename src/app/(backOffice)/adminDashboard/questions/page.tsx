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
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Form */}
      <form onSubmit={addQuestion} className="flex flex-col space-y-4">
        <label htmlFor="question">Question</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-gray-200 px-4 py-2"
        />

        <label htmlFor="answer">Réponse</label>
        <input
          type="text"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="bg-gray-200 px-4 py-2"
        />

        <button type="submit" className="bg-orange-400 text-white px-4 py-2">
          Ajouter à la FAQ
        </button>
      </form>

      {/* List of Questions */}
      <ul className="mt-6 space-y-2 flex flex-wrap gap-4">
        {questions.map((q) => (
          <li key={q._id} className="border flex w-1/2 p-4 rounded-lg">
            <div className="flex-1">
              <strong>{q.question}</strong> <br />
              <p>{q.answer}</p>
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
                onClick={() => deleteUser(q._id)}
                className="cursor-pointer"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
