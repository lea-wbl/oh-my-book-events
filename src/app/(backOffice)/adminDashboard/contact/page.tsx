"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ContactInfo } from "@/interfaces/interfaces";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const initialState: ContactInfo = {
  _id: "",
  email: "",
  tel: "",
  ig: "",
  tiktok: "",
};

const Contact = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [initialInfo, setInitialInfo] = useState<ContactInfo>(initialState);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialState);
  const isEditing = JSON.stringify(initialInfo) === JSON.stringify(contactInfo);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/adminDashboard/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get("/api/contactInfo")
        .then((res) => {
          setInitialInfo(res.data[0]);
          setContactInfo(res.data[0]);
        })
        .catch((error) => {
          console.error(
            "Erreur lors du chargement des informations de contact",
            error
          );
          toast.error("Erreur lors du chargement des informations de contact");
        })
        .finally(() => setIsLoading(false));
    }
  }, [status]);

  const updateInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactInfo.email) return toast.error("L'adresse email est requise");

    try {
      const response = await axios.put("/api/contactInfo", contactInfo);

      if (response.status === 200) {
        setInitialInfo(contactInfo);
        toast.success("Informations de contact mises à jour !");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des informations de contact",
        error
      );
      toast.error("Erreur lors de la mise à jour des informations de contact");
    }
  };

  if (isLoading || status === "loading")
    return <Loader fullWidth={status !== "authenticated"} />;

  return (
    <div>
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-8">Informations de contact</h1>

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
                setContactInfo({
                  ...contactInfo,
                  email: e.target.value.trimStart(),
                })
              }
              className="bg-gray-200 px-4 py-2 rounded"
            />
          </div>

          <div className="grid flex-1 gap-1">
            <label htmlFor="tel">
              Numéro de téléphone{" "}
              <span className="text-gray-500 text-sm">(optionel)</span>
            </label>
            <input
              type="tel"
              id="tel"
              value={contactInfo.tel}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, tel: e.target.value })
              }
              pattern="[0-9]{10}"
              className="bg-gray-200 px-4 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid md:flex gap-4">
          <div className="grid flex-1 gap-1">
            <label htmlFor="ig">
              Lien Instagram{" "}
              <span className="text-gray-500 text-sm">(optionel)</span>
            </label>
            <input
              type="url"
              id="ig"
              value={contactInfo.ig}
              onChange={(e) =>
                setContactInfo({
                  ...contactInfo,
                  ig: e.target.value.trimStart(),
                })
              }
              className="bg-gray-200 px-4 py-2 rounded"
            />
          </div>

          <div className="grid flex-1 gap-1">
            <label htmlFor="tiktok">
              Liens TikTok{" "}
              <span className="text-gray-500 text-sm">(optionel)</span>
            </label>
            <input
              type="url"
              id="tiktok"
              value={contactInfo.tiktok}
              onChange={(e) =>
                setContactInfo({
                  ...contactInfo,
                  tiktok: e.target.value.trimStart(),
                })
              }
              className="bg-gray-200 px-4 py-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              setContactInfo(initialInfo);
            }}
            className={`bg-gray-300 px-4 py-2 rounded font-semibold border-2 border-gray-300 ${
              isEditing ? "opacity-50 cursor-not-allowed" : "hover:bg-white"
            }`}
            disabled={isEditing}
          >
            Annuler
          </button>

          <button
            type="submit"
            className={`bg-orange-400 text-white px-4 py-2 w-fit self-end rounded font-semibold border-2 border-orange-400 ${
              isEditing
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-orange-400 hover:bg-white"
            }`}
            disabled={isEditing}
          >
            Modifier les informations
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
