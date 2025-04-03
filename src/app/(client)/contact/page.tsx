"use client";

import axios from "axios";
import { InstagramIcon, TiktokIcon } from "hugeicons-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    tel: "",
    ig: "",
    tiktok: "",
  });
  const [userMessageInfo, setUserMessageInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get("/api/contactInfo").then((res) => {
      setContactInfo(res.data[0]);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "message") console.log(e.target.value);

    setUserMessageInfo({
      ...userMessageInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    try {
      const response = await axios.post("/api/contact", userMessageInfo);
      if (response.status === 200) {
        setStatus("Message envoyé avec succès !");
        setUserMessageInfo({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message : ", error);
      setStatus("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="bg-[#F6838D]">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center bg-[#F6838D] bg-chiant md:h-screen-minus-header h-fit">
        <div className="md:w-1/2">
          <div className="relative">
            <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
              Contactez-nous
            </h1>
            <Image
              src="/arrow2.png"
              alt="arrow"
              width={180}
              height={90}
              className="rotate-[20deg] mr-8 absolute right-[-1rem] bottom-[-6rem] hidden md:block"
            />
          </div>

          <div className="pt-6 md:pt-16 grid gap-4 md:w-4/5 text-white">
            <p className="hidden md:block font-semibold">
              Si notre FAQ n’a pas réussi à répondre à tes questions, pas de
              souci — on est là pour ça ! <br /> Que ce soit pour régler un
              petit problème, poser une question ou même discuter de ton idée
              d’événement, on t’écoute !
            </p>
            <div className="flex justify-between">
              <div className="flex-col gap-4 hidden md:flex">
                <p className="font-semibold">{contactInfo.email}</p>
                {contactInfo.tel && (
                  <p className="font-semibold">
                    {contactInfo.tel.replace(/(.{2})/g, "$1 ")}
                  </p>
                )}
                <div className="flex gap-4 ml-[-2px]">
                  {contactInfo.ig && (
                    <Link
                      href={contactInfo.ig}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link relative"
                    >
                      <InstagramIcon
                        size={32}
                        color="white"
                        className="cursor-pointer"
                      />
                    </Link>
                  )}

                  {contactInfo.tiktok && (
                    <Link
                      href={contactInfo.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link relative"
                    >
                      <TiktokIcon
                        size={32}
                        color="white"
                        className="cursor-pointer"
                      />
                    </Link>
                  )}
                </div>
              </div>

              <Image
                src="/boo2.png"
                alt="Oh My Book"
                width={250}
                height={125}
                className="drop-shadow-lg rotate-[-10deg] mr-8 hidden md:block"
                priority
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 grid content-center shadow-md rounded-xl md:rounded-3xl">
          <form
            className="flex flex-col gap-4 bg-white rounded-xl md:rounded-3xl p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name" className="sr-only">
              Nom
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nom"
              className="border border-stone-200 px-2 py-1 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-200 rounded"
              onChange={handleChange}
              value={userMessageInfo.name}
              required
            />
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="border border-stone-200 px-2 py-1 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-200 rounded"
              onChange={handleChange}
              value={userMessageInfo.email}
              required
            />
            <label htmlFor="subject" className="sr-only">
              Sujet
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Sujet"
              className="border border-stone-200 px-2 py-1 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-200 rounded"
              onChange={handleChange}
              value={userMessageInfo.subject}
              required
            />
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Message"
              rows={8}
              className="border border-stone-200 px-2 py-1 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-200 rounded"
              onChange={handleChange}
              value={userMessageInfo.message}
              required
            ></textarea>
            <button
              type="submit"
              className="rounded-full bg-[#f7a976] text-white px-2 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]"
            >
              Envoyer
            </button>
          </form>
          <p>{status}</p>
        </div>

        <div className="flex flex-col gap-2 text-white text-center md:hidden">
          <p>contact@ohmybook.com</p>
          <p>06 01 02 03 04</p>
          <div className="flex gap-4 ml-[-2px] justify-center">
            <InstagramIcon size={32} color="white" className="cursor-pointer" />
            <TiktokIcon size={32} color="white" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
