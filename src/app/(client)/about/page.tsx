"use client";
import React, { useEffect, useState } from "react";
import { CircleArrowDown01Icon } from "hugeicons-react";
import axios from "axios";

const faq = [
  {
    id: 1,
    question: "Voici une première question ?",
    answer:
      "Voici la super réponse à cette super question ! En espérant qu'elle apporte les informations nécessaires voire peut-être plus.",
  },
  {
    id: 2,
    question:
      "Et maintenant j'ai besoin d'une question plus longue pour évaluer le comportement du saut de ligne ?",
    answer:
      "Sem facilisis tempus feugiat parturient praesent potenti nec magnis. Venenatis nulla dolor vitae mauris malesuada congue potenti nec. Feugiat nec nascetur duis ipsum pretium tortor.",
  },
];

const About = () => {
  const [answersShown, setAnswersShown] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/about").then((res) => {
      console.log(res.data);

      setQuestions(res.data);
    });
  }, []);

  const showAnswers = (id: string) => {
    if (answersShown.includes(id))
      setAnswersShown(answersShown.filter((answerId) => answerId !== id));
    else setAnswersShown([...answersShown, id]);
  };

  return (
    <div>
      {/* FAQ */}
      <section className="px-6 py-8 md:px-12 md:py-6 h-screen-minus-header w-full">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit mb-8">
          FAQ
        </h1>
        <div className="relative z-10 w-full">
          {questions.map((q) => (
            <div
              key={q._id}
              className="mb-10 w-1/3 flex flex-col cursor-pointer "
              onClick={() => showAnswers(q._id)}
            >
              <div className="boxx">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="circlee"></div>
                    <p className="font-semibold">{q.question}</p>
                  </div>
                  <CircleArrowDown01Icon
                    size={28}
                    color="rgba(47, 79, 79, .6)"
                    className={`min-w-max transition-transform duration-300 ${
                      answersShown.includes(q._id) ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    answersShown.includes(q._id)
                      ? "max-h-40 opacity-100 pt-4"
                      : "max-h-0 opacity-0 pt-0"
                  }`}
                >
                  {q.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
