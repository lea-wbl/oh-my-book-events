"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PencilEdit02Icon, Delete02Icon } from "hugeicons-react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";
import { deleteUcareImg } from "@/app/utils/imageManager";
import { Event } from "@/interfaces/event.interface";

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
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
  });
  const [eventTypes, setEventTypes] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [uploaderKey, setUploaderKey] = useState(0);

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

  // EVENT TYPES HANDLING **********************************************
  // Retrieve event types name for the select input
  useEffect(() => {
    axios
      .get("/api/eventTypes?field=name")
      .then((res) => setEventTypes(res.data));
  }, []);

  // EVENT HANDLING ****************************************************
  // Retrieve existing events
  useEffect(() => {
    axios.get("/api/events").then((res) => setEvents(res.data));
  }, []);

  // Create a new event
  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasEmptyField = Object.values(newEvent).some(
      (value) => value.length === 0
    );

    if (hasEmptyField) return alert("Veuillez remplir tous les champs");

    try {
      const { data } = await axios.post("/api/events", newEvent);
      setEvents([...events, data]);
      setNewEvent({
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
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'événement", error);
    }
  };

  // Delete an event
  //   const deleteReview = async (id: string) => {
  //     await axios.delete("/api/reviews", { data: { id } });
  //     setReviews(reviews.filter((review) => review._id !== id));
  //   };

  // IMAGE HANDLING ****************************************************
  // Add images to the new event
  const handleNewEventImages = (file: any) => {
    const eventImg = file.successEntries.map((entry: any) => ({
      uuid: entry.uuid,
      name: entry.name,
    }));

    setNewEvent({
      ...newEvent,
      images: eventImg,
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Événements à venir</h1>

      {/* CREATE NEW EVENT */}
      <h2 className="text-xl font-semi bold mb-4">Créer un nouvel événement</h2>
      {/* IMAGES */}
      <div className="mb-4 flex gap-4">
        <div className="grid gap-1">
          <label>
            Images <span>(3 requises)</span>
          </label>
          <FileUploaderRegular
            sourceList="local, camera, gdrive"
            cameraModes="photo"
            classNameUploader="uc-light uc-orange"
            pubkey="1f20d7f5d1614fe8cf9a"
            multiple={true}
            multipleMax={3}
            onChange={(file) => handleNewEventImages(file)}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 flex-1">
          {newEvent.images.map((img) => (
            <div
              key={img.uuid}
              className="flex items-center justify-between gap-2 bg-gray-100 p-2 h-14"
            >
              <Image
                src={`https://ucarecdn.com/${img.uuid}/`}
                alt="File icon"
                width={200}
                height={200}
                className="h-full w-auto"
              />
              <div className="truncate">{img.name}</div>
              <div
                className="flex items-center"
                onClick={() => {
                  deleteUcareImg(img.uuid);
                  setNewEvent({
                    ...newEvent,
                    images: newEvent.images.filter(
                      (image) => image.uuid !== img.uuid
                    ),
                  });
                }}
              >
                <Delete02Icon className="h-6 w-6 text-gray-500 cursor-pointer ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={addEvent} className="flex flex-col gap-4">
        <div className="flex gap-4">
          {/* NOM */}
          <div className="grid flex-1">
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
          <div className="grid flex-1">
            <label htmlFor="eventType">Type d'événement</label>
            <select
              name="eventType"
              id="eventType"
              className="bg-gray-200 px-4 py-2"
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

        <div className="flex gap-4">
          <div className="flex gap-4 flex-1">
            {/* DATE */}
            <div className="grid flex-1">
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
                <div className="flex gap-4 items-baseline">
                  <label htmlFor="timeStart">De:</label>
                  <input
                    type="time"
                    id="timeStart"
                    className="bg-gray-200 px-4 py-2 rounded"
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, timeStart: e.target.value });
                    }}
                  />
                </div>

                <div className="flex gap-4 items-baseline">
                  <label htmlFor="timeEnd">à:</label>
                  <input
                    type="time"
                    id="timeEnd"
                    className="bg-gray-200 px-4 py-2 rounded"
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, timeEnd: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* LIEN VERS LA BILLETERIE */}
          <div className="grid flex-1">
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

        <div className="flex gap-4">
          {/* LIEU */}
          <div className="grid flex-1">
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
          <div className="grid flex-1">
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

        <button
          type="submit"
          className="bg-orange-400 text-white px-4 py-2 w-fit self-end mt-4 rounded"
          onClick={addEvent}
        >
          Ajouter aux événements à venir
        </button>
      </form>

      <hr className="my-8" />

      {/* LIST OF EXISTING EVENTS */}
      <h2 className="text-xl font-semi bold mb-4">Événements existants</h2>
      <ul className="mt-6 grid grid-cols-2 gap-4">
        {events.map((event, index) => (
          <li key={index} className="border flex p-4 rounded-lg shadow">
            <div className="flex-1 space-y-2">
              <div className="text-gray-500 text-sm">
                <div className="flex gap-2 float-right">
                  <PencilEdit02Icon
                    size={24}
                    color={"blue"}
                    className="cursor-pointer"
                  />
                  <Delete02Icon
                    size={24}
                    color={"red"}
                    // onClick={() => deleteReview(review._id)}
                    className="cursor-pointer"
                  />
                </div>
                {event.type}
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
                    <div className="h-full">
                      <Image
                        src={`https://ucarecdn.com/${img.uuid}/`}
                        alt="File icon"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* <button onClick={() => deleteImage(event.images[0])}>
                    delete img
                  </button> */}
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
