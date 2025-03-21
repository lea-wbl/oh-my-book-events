"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PencilEdit02Icon, Delete02Icon } from "hugeicons-react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";
import { deleteUcareImg } from "@/app/utils/imageManager";
import { Event } from "@/interfaces/interfaces";
import { Toaster, toast } from "react-hot-toast";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import UploadedImagesGrid from "@/components/UploadedImagesGrid";

const initialState = {
  images: [],
  name: "",
  type: "",
  typeId: "",
  date: "",
  timeStart: "",
  timeEnd: "",
  location: "",
  address: "",
  ticketLink: "",
  partners: [],
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>(initialState);
  const [eventTypes, setEventTypes] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [uploaderKey, setUploaderKey] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // EVENT TYPES HANDLING **********************************************
  // Retrieve event types name for the select input
  useEffect(() => {
    axios
      .get("/api/eventTypes?field=name")
      .then((res) => setEventTypes(res.data))
      .catch((error) => {
        console.error("Erreur lors du chargement des types d'événement", error);
        toast.error("Erreur lors du chargement des types d'événement");
      });
  }, []);

  // Adding the first event type as default
  useEffect(() => {
    if (eventTypes.length > 0) {
      setNewEvent({
        ...newEvent,
        type: eventTypes[0].name,
        typeId: eventTypes[0]._id,
      });
    }
  }, [eventTypes]);

  // EVENT HANDLING ****************************************************
  // Retrieve existing events
  useEffect(() => {
    axios
      .get("/api/events")
      .then((res) => setEvents(res.data))
      .catch((error) => {
        console.error("Erreur lors du chargement des événements", error);
        toast.error("Erreur lors du chargement des événements");
      });
  }, []);

  // Create or update an event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emptyFields = Object.entries(newEvent)
      .filter(([key, value]) => value.length === 0) // Find empty fields
      .map(([key]) => key); // Extract field names

    if (emptyFields.length > 0) {
      toast.error(
        `Les champs suivants sont requis : ${emptyFields.join(", ")}`
      );
      return;
    }

    try {
      if (isEditing) {
        const response = await axios.put("/api/events", newEvent);
        if (response.status === 200) {
          setEvents((prev) =>
            prev.map((event) =>
              event._id === selectedId ? response.data : event
            )
          );
          setIsEditing(false);
          setNewEvent(initialState);
          toast.success("Événement mis à jour !", {
            duration: 4000,
          });
        }
      } else {
        const response = await axios.post("/api/reviews", newEvent);

        if (response.status === 201) {
          setEvents([response.data, ...events]);
          setNewEvent(initialState);
          setUploaderKey((prevKey) => prevKey + 1);
          toast.success("Événement ajouté !", {
            duration: 4000,
          });
        }
      }
    } catch (error) {
      if (isEditing) {
        toast.error("Erreur lors de la mise à jour de l'événement");
      } else {
        toast.error("Erreur lors de l'ajout de l'événement");
      }
    }
  };

  // Delete an event
  const deleteEvent = async () => {
    try {
      const response = await axios.delete("/api/events", {
        data: { id: selectedId },
      });

      if (response.status === 200) {
        setEvents((prev) => prev.filter((event) => event._id !== selectedId));
        toast.success("Événement supprimé !", {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'événement");
    }
  };

  // IMAGE HANDLING ****************************************************
  // Add images to the new event
  const handleNewEventImages = (file: any, type: string) => {
    const eventImg = file.successEntries.map((entry: any) => ({
      uuid: entry.uuid,
      name: entry.name,
    }));

    setNewEvent({
      ...newEvent,
      [type]: eventImg,
    });
  };

  const deleteImage = async (uuid: string) => {
    try {
      const response = await axios.delete(
        `https://api.uploadcare.com/files/${uuid}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Uploadcare.Simple ${process.env.UPLOADCARE_PUBLIC_KEY}:${process.env.UPLOADCARE_SECRET_KEY}`,
          },
        }
      );

      return Response.json({
        success: true,
        message: "Image deleted successfully",
        data: response.data,
      });
    } catch (error: any) {
      return Response.json(
        { success: false, error: error.response?.data || error.message },
        { status: 500 }
      );
    }
  };

  const handleOpenConfirmation = (id: string) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const startEditing = (event: Event) => {
    setIsEditing(true);
    setNewEvent({
      ...event,
      images: event.images.map((img) => ({ ...img })),
      partners: event.partners.map((partner) => ({ ...partner })),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if (event._id) {
        setSelectedId(event._id);
      }
    }, 1000);
  };

  return (
    <div>
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-8">Événements à venir</h1>

      {/* CREATE NEW EVENT */}
      <h2 className="text-xl mb-4">
        {isEditing ? "Modifier un événement" : "Ajouter un nouvel événement"}
      </h2>
      {/* IMAGES */}
      <div className="mb-4 grid md:flex gap-4">
        <div className="grid gap-1">
          <label>
            Images de présentation <span>(3 requises)</span>
          </label>
          <FileUploaderRegular
            key={uploaderKey}
            sourceList="local, camera, gdrive"
            cameraModes="photo"
            classNameUploader="uc-light uc-orange"
            pubkey="1f20d7f5d1614fe8cf9a"
            multiple={true}
            multipleMax={3}
            onChange={(file) => handleNewEventImages(file, "images")}
          />
        </div>
        <UploadedImagesGrid
          images={newEvent.images}
          deleteHandler={(uuid) => {
            deleteUcareImg(uuid);
            setNewEvent({
              ...newEvent,
              images: newEvent.images.filter((img) => img.uuid !== uuid),
            });
          }}
          gridCols={"md:grid-cols-3"}
        />
      </div>
      {/* FORM */}
      <form className="flex flex-col gap-4">
        <div className="grid md:flex gap-4">
          {/* NOM */}
          <div className="grid flex-1 gap-1">
            <label htmlFor="name">Nom de l'événement</label>
            <input
              type="text"
              id="name"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              className="bg-gray-200 px-4 py-2 rounded"
            />
          </div>

          {/* EVENT TYPE */}
          <div className="grid flex-1 gap-1">
            <label htmlFor="eventType">Type d'événement</label>
            <select
              name="eventType"
              id="eventType"
              className="bg-gray-200 px-4 py-2 rounded"
              value={newEvent.type}
              onChange={(e) => {
                const selectedType = eventTypes.find(
                  (type) => type.name === e.target.value
                );
                if (selectedType) {
                  setNewEvent({
                    ...newEvent,
                    type: e.target.value,
                    typeId: selectedType._id,
                  });
                }
              }}
            >
              {eventTypes.map((type) => (
                <option key={type._id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:flex gap-4">
          <div className="flex gap-4 flex-1">
            {/* DATE */}
            <div className="grid flex-1 gap-1">
              <label htmlFor="date">Date de l'événement</label>
              <input
                type="date"
                id="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="bg-gray-200 px-4 py-2 rounded"
              />
            </div>

            {/* HORAIRES */}
            <div className="flex flex-col">
              <span>Horaires de l'événement</span>
              <div className="flex gap-4">
                <div className="flex gap-4 items-baseline flex-1 md:flex-0">
                  <label htmlFor="timeStart">De:</label>
                  <input
                    type="time"
                    id="timeStart"
                    className="bg-gray-200 px-4 py-2 rounded flex-1 md:flex-0"
                    value={newEvent.timeStart}
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, timeStart: e.target.value });
                    }}
                  />
                </div>

                <div className="flex gap-4 items-baseline flex-1 md:flex-0">
                  <label htmlFor="timeEnd">à:</label>
                  <input
                    type="time"
                    id="timeEnd"
                    className="bg-gray-200 px-4 py-2 rounded flex-1 md:flex-0"
                    value={newEvent.timeEnd}
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, timeEnd: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* LIEN VERS LA BILLETERIE */}
          <div className="grid flex-1 gap-1">
            <label htmlFor="ticketLink">Lien vers la billetterie</label>
            <input
              type="url"
              id="ticketLink"
              value={newEvent.ticketLink}
              onChange={(e) =>
                setNewEvent({ ...newEvent, ticketLink: e.target.value })
              }
              className="bg-gray-200 px-4 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid md:flex gap-4">
          {/* LIEU */}
          <div className="grid flex-1 gap-1">
            <label htmlFor="location">Lieu de l'événement</label>
            <input
              type="text"
              id="location"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
              className="bg-gray-200 px-4 py-2 rounded"
            />
          </div>
          <div className="grid flex-1 gap-1">
            <label htmlFor="location">Adresse du lieu</label>
            <input
              type="text"
              id="location"
              value={newEvent.address}
              onChange={(e) =>
                setNewEvent({ ...newEvent, address: e.target.value })
              }
              className="bg-gray-200 px-4 py-2 rounded"
            />
          </div>
        </div>
      </form>

      {/* PARTNERSHIPS */}
      <div className="mt-4 grid gap-4">
        <div className="grid gap-1">
          <label>Logos des partenaires</label>
          <FileUploaderRegular
            key={uploaderKey + 1}
            sourceList="local, camera, gdrive"
            cameraModes="photo"
            classNameUploader="uc-light uc-orange"
            pubkey="1f20d7f5d1614fe8cf9a"
            multiple={true}
            onChange={(file) => handleNewEventImages(file, "partners")}
          />
        </div>
        <UploadedImagesGrid
          images={newEvent.partners}
          deleteHandler={(uuid) => {
            deleteUcareImg(uuid);
            setNewEvent({
              ...newEvent,
              partners: newEvent.partners.filter(
                (partner) => partner.uuid !== uuid
              ),
            });
          }}
          gridCols={"md:grid-cols-4"}
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setNewEvent(initialState);
              setSelectedId("");
            }}
            className="bg-gray-300 px-4 py-2 rounded font-semibold hover:bg-white border-2 border-gray-300"
          >
            Annuler
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="bg-orange-400 text-white px-4 py-2 w-fit self-end rounded font-semibold hover:text-orange-400 hover:bg-white border-2 border-orange-400"
        >
          {isEditing
            ? "Modifier l'événement"
            : "Ajouter aux événements à venir"}
        </button>
      </div>

      <hr className="my-8" />

      {/* LIST OF EXISTING EVENTS */}
      <h2 className="text-xl mb-4">Événements existants</h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucun événement à venir n'a été ajouté pour le moment
        </p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {events.map((event, index) => (
            <li
              key={index}
              className={
                isEditing && selectedId === event._id
                  ? "text-gray-500 border grid gap-4 p-4 rounded-lg shadow bg-gray-100 cursor-not-allowed"
                  : "border grid gap-4 p-4 rounded-lg shadow"
              }
            >
              <div className="flex-1">
                <div className="flex gap-2 float-right">
                  <button
                    className={
                      isEditing && selectedId === event._id
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    onClick={() => startEditing(event)}
                    disabled={isEditing && selectedId === event._id}
                  >
                    <PencilEdit02Icon
                      size={24}
                      color={
                        isEditing && selectedId === event._id ? "gray" : "blue"
                      }
                    />
                  </button>
                  <button
                    className={
                      isEditing && selectedId === event._id
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    onClick={() =>
                      event._id && handleOpenConfirmation(event._id)
                    }
                    disabled={isEditing && selectedId === event._id}
                  >
                    <Delete02Icon
                      size={24}
                      color={
                        isEditing && selectedId === event._id ? "gray" : "red"
                      }
                    />
                  </button>
                </div>
                <span className="text-gray-500 text-sm">{event.type}</span>
              </div>
              <h1 className="font-bold text-lg">{event.name}</h1>
              <p>
                {new Date(event.date).toLocaleDateString()} de {event.timeStart}{" "}
                à {event.timeEnd}
              </p>
              <p className="italic">
                <span className="font-semibold not-italic">
                  {event.location}
                </span>
                , {event.address}
              </p>
              <p>{event.ticketLink}</p>
              <div className="grid grid-cols-3 gap-4">
                {event.images.map((img, index) => (
                  <div key={index} className="aspect-square">
                    <div
                      className={`h-full ${
                        isEditing && selectedId === event._id
                          ? "grayscale opacity-50"
                          : ""
                      }`}
                    >
                      <Image
                        src={`https://ucarecdn.com/${img.uuid}/`}
                        alt="File icon"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {event.partners.map((img, index) => (
                  <div key={index} className="h-8">
                    <div
                      className={`h-full ${
                        isEditing && selectedId === event._id
                          ? "grayscale opacity-50"
                          : ""
                      }`}
                    >
                      <Image
                        src={`https://ucarecdn.com/${img.uuid}/`}
                        alt="File icon"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      <DeleteConfirmationModal
        isOpen={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onConfirm={deleteEvent}
        message="Es-tu sûre de vouloir supprimer cet événement ?"
      />
    </div>
  );
};

export default UpcomingEvents;
