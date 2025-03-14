"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircleArrowDown01Icon } from "hugeicons-react";

const FAQ = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answersShown, setAnswersShown] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/questions").then((res) => {
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
    <section className="bg-[#F6838D] custom-bg3 px-6 py-8 md:p-16 min-h-screen-minus-header h-fit w-full">
      <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit mb-8">
        FAQ
      </h1>
      <div className="grid grid-cols-2 gap-16">
        <div className="relative z-10 w-full flex flex-col gap-4">
          <h2 className="font-headline font-medium text-white text-2xl">
            Un titre de section
          </h2>
          {questions.map((q) => (
            <div
              key={q._id}
              className="flex flex-col cursor-pointer"
              onClick={() => showAnswers(q._id)}
            >
              <div className="boxx">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="circlee"></div>
                    <p className="font-semibold">{q.question}</p>
                  </div>
                  <CircleArrowDown01Icon
                    size={28}
                    color="#f6838d"
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
        <div className="relative z-10 w-full flex flex-col gap-4">
          <h2 className="font-headline font-medium text-white text-2xl">
            Ici la deuxième section
          </h2>
          {questions.map((q) => (
            <div
              key={q._id}
              className="flex flex-col cursor-pointer"
              onClick={() => showAnswers(`${q._id}0`)}
            >
              <div className="boxx">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="circlee"></div>
                    <p className="font-semibold">{q.question}</p>
                  </div>
                  <CircleArrowDown01Icon
                    size={28}
                    color="#f6838d"
                    className={`min-w-max transition-transform duration-300 ${
                      answersShown.includes(`${q._id}0`)
                        ? "rotate-180"
                        : "rotate-0"
                    }`}
                  />
                </div>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    answersShown.includes(`${q._id}0`)
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
      </div>
    </section>
  );
};

export default FAQ;
