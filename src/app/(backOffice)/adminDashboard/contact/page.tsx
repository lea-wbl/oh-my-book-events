"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<{
    _id: string;
    email: string;
    tel: string;
    ig: string;
    tiktok: string;
  }>({ _id: "", email: "", tel: "", ig: "", tiktok: "" });

  useEffect(() => {
    axios.get("/api/contactInfo").then((res) => {
      setContactInfo(res.data[0]);
    });
  }, []);

  const updateInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactInfo.email) return alert("Veuillez renseigner l'adresse email");

    try {
      const { data } = await axios.put("/api/contactInfo", contactInfo);
    } catch (error) {
      console.error(
        "Erreur lors de la modification des informations de contact",
        error
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Informations de contact</h1>

      {/* Form */}
      <form onSubmit={updateInfo} className="flex flex-col gap-4">
        <div className="grid md:flex gap-4">
          <div className="grid flex-1 gap-1">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              id="email"
              value={contactInfo.email}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, email: e.target.value })
              }
              className="bg-gray-200 px-4 py-2 rounded"
            />
          </div>

          <div className="grid flex-1 gap-1">
            <label htmlFor="tel">
              Numéro de téléphone <span>(optionel)</span>
            </label>
            <input
              type="tel"
              id="tel"
              value={contactInfo.tel}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, tel: e.target.value })
              }
              className="bg-gray-200 px-4 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid md:flex gap-4">
          <div className="grid flex-1 gap-1">
            <label htmlFor="ig">
              Lien Instagram <span>(optionel)</span>
            </label>
            <input
              type="url"
              id="ig"
              value={contactInfo.ig}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, ig: e.target.value })
              }
              className="bg-gray-200 px-4 py-2"
            />
          </div>

          <div className="grid flex-1 gap-1">
            <label htmlFor="tiktok">
              Liens TikTok <span>(optionel)</span>
            </label>
            <input
              type="url"
              id="tiktok"
              value={contactInfo.tiktok}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, tiktok: e.target.value })
              }
              className="bg-gray-200 px-4 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-400 text-white px-4 py-2 w-fit self-end mt-4 rounded"
        >
          Modifier les informations de contact
        </button>
      </form>
    </div>
  );
};

export default Contact;
