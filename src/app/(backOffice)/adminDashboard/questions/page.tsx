"use client";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { PencilEdit02Icon, Delete02Icon } from "hugeicons-react";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { Toaster, toast } from "react-hot-toast";
import { Question } from "@/interfaces/interfaces";

const initialState = {
  question: "",
  answer: "",
};

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<Question>(initialState);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const reversedQuestions = useMemo(
    () => [...questions].reverse(),
    [questions]
  );

  useEffect(() => {
    axios
      .get("/api/questions")
      .then((res) => setQuestions(res.data))
      .catch((error) => {
        console.error("Erreur lors du chargement des questions", error);
        toast.error("Erreur lors du chargement des questions");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.question || !newQuestion.answer)
      return toast.error("Tous les champs doivent être remplis");
    try {
      if (isEditing) {
        const response = await axios.put("/api/questions", {
          id: selectedId,
          ...newQuestion,
        });
        if (response.status === 200) {
          setQuestions((prev) =>
            prev.map((question) =>
              question._id === selectedId ? response.data : question
            )
          );
          setIsEditing(false);
          setNewQuestion(initialState);
          toast.success("Question mise à jour !", {
            duration: 4000,
          });
        }
      } else {
        const response = await axios.post("/api/questions", newQuestion);
        if (response.status === 201) {
          setQuestions((prev) => [...prev, response.data]);
          setNewQuestion(initialState);
          toast.success("Question ajoutée !", {
            duration: 4000,
          });
        }
      }
    } catch (error) {
      if (isEditing) {
        toast.error("Erreur lors de la mise à jour de la question");
      } else {
        toast.error("Erreur lors de l'ajout de la question");
      }
    }
  };

  const deleteQuestion = async () => {
    try {
      const response = await axios.delete("/api/questions", {
        data: { id: selectedId },
      });

      if (response.status === 200) {
        setQuestions((prev) =>
          prev.filter((question) => question._id !== selectedId)
        );
        toast.success("Question supprimée !", {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de la question");
    }
  };

  const handleOpenConfirmation = (id: string) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const startEditing = (question: Question) => {
    setIsEditing(true);
    setNewQuestion({
      question: question.question,
      answer: question.answer,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if (question._id) {
        setSelectedId(question._id);
      }
    }, 1000);
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setSelectedId("");
    }
    setNewQuestion(initialState);
  };

  return (
    <div>
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-8">FAQ</h1>

      <h2 className="text-xl mb-4">
        {isEditing ? "Modifier une question" : "Ajouter une nouvelle question"}
      </h2>
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid flex-1 gap-1">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
            className="bg-gray-200 px-4 py-2 rounded"
          />
        </div>

        <div className="grid flex-1 gap-1">
          <label htmlFor="answer">Réponse</label>
          <textarea
            id="answer"
            value={newQuestion.answer}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, answer: e.target.value })
            }
            className="bg-gray-200 px-4 py-2 rounded field-sizing-content min-h-16"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className={`bg-gray-300 px-4 py-2 rounded font-semibold border-2 border-gray-300 ${
              JSON.stringify(newQuestion) === JSON.stringify(initialState)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white"
            }`}
            disabled={
              JSON.stringify(newQuestion) === JSON.stringify(initialState)
            }
          >
            Annuler
          </button>
          <button
            type="submit"
            className={`bg-orange-400 text-white px-4 py-2 w-fit self-end rounded font-semibold border-2 border-orange-400 ${
              JSON.stringify(newQuestion) === JSON.stringify(initialState)
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-orange-400 hover:bg-white"
            }`}
            disabled={
              JSON.stringify(newQuestion) === JSON.stringify(initialState)
            }
          >
            {isEditing ? "Modifier la question" : "Ajouter à la FAQ"}
          </button>
        </div>
      </form>

      <hr className="my-8" />

      <h2 className="text-xl mb-4">Questions existantes</h2>
      {/* List of Questions */}
      {questions.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucune question n'a été ajouté pour le moment
        </p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {reversedQuestions.map((q) => (
            <li
              key={q._id}
              className={
                isEditing && selectedId === q._id
                  ? "text-gray-500 border grid gap-4 p-4 rounded-lg shadow bg-gray-100 cursor-not-allowed"
                  : "border grid gap-4 p-4 rounded-lg shadow"
              }
            >
              <div className="flex-1">
                <div className="flex gap-2 float-right">
                  <button
                    className={
                      isEditing && selectedId === q._id
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    onClick={() => startEditing(q)}
                    disabled={isEditing && selectedId === q._id}
                  >
                    <PencilEdit02Icon
                      size={24}
                      color={
                        isEditing && selectedId === q._id ? "gray" : "blue"
                      }
                    />
                  </button>
                  <button
                    className={
                      isEditing && selectedId === q._id
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    onClick={() => q._id && handleOpenConfirmation(q._id)}
                    disabled={isEditing && selectedId === q._id}
                  >
                    <Delete02Icon
                      size={24}
                      color={isEditing && selectedId === q._id ? "gray" : "red"}
                    />
                  </button>
                </div>
                <strong>{q.question}</strong>
              </div>
              <p className="whitespace-pre-line">{q.answer}</p>
            </li>
          ))}
        </ul>
      )}

      <DeleteConfirmationModal
        isOpen={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onConfirm={deleteQuestion}
        message="Es-tu sûre de vouloir supprimer cette question ?"
      />
    </div>
  );
};

export default Questions;
