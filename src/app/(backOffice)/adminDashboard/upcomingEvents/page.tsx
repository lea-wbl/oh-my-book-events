"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PencilEdit02Icon, Delete02Icon } from "hugeicons-react";

interface ProgramCard {
  title: string;
  content: string;
}

interface Event {
  _id?: string;
  name: string;
  type: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  ticketLink: string;
  tagline: string;
  description: string;
  programCards: ProgramCard[];
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    name: "",
    type: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    location: "",
    ticketLink: "",
    tagline: "",
    description: "",
    programCards: [],
  });
  const [newCard, setNewCard] = useState<ProgramCard>({
    title: "",
    content: "",
  });
  const [eventTypes, setEventTypes] = useState<{ _id: string; name: string }[]>(
    []
  );

  // EVENT TYPES HANDLING ****************************************************
  useEffect(() => {
    axios
      .get("/api/eventTypes?field=name")
      .then((res) => setEventTypes(res.data));
  }, []);

  // PROGRAM CARDS HANDLING ****************************************************
  // Create a new program card
  const addNewCard = (e: React.FormEvent) => {
    e.preventDefault();
    // setCards([...cards, newCard]);
    setNewEvent({
      ...newEvent,
      programCards: [...newEvent.programCards, newCard],
    });
    setNewCard({ title: "", content: "" });
  };

  // Delete a program card
  const deleteCard = (index: number) => {
    // setCards(cards.splice(index, 1));
    setNewEvent({
      ...newEvent,
      programCards: newEvent.programCards.splice(index, 1),
    });
  };

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
        name: "",
        type: "",
        date: "",
        timeStart: "",
        timeEnd: "",
        location: "",
        ticketLink: "",
        tagline: "",
        description: "",
        programCards: [],
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

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Événements à venir</h1>

      {/* INFOS PRATIQUES */}
      <h2 className="text-xl font-semi bold mb-4">Infos pratiques</h2>
      <form onSubmit={addEvent} className="flex flex-col space-y-4">
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
              className="bg-gray-200 px-4 py-2"
            />
          </div>

          {/* EVENT TYPE */}
          <div className="grid flex-1">
            <label htmlFor="eventType">Type d'événement</label>
            <select
              name="eventType"
              id="eventType"
              className="bg-gray-200 px-4 py-2"
              onChange={(e) =>
                setNewEvent({ ...newEvent, type: e.target.value })
              }
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
              className="bg-gray-200 px-4 py-2"
            />
          </div>

          {/* HORAIRES */}
          <div className="flex flex-col flex-1">
            <span>Horaires de l'événement</span>
            <div className="flex gap-4">
              <div className="flex gap-4 items-baseline">
                <label htmlFor="timeStart">De:</label>
                <input
                  type="time"
                  id="timeStart"
                  className="bg-gray-200 px-4 py-2"
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
                  className="bg-gray-200 px-4 py-2"
                  onChange={(e) => {
                    setNewEvent({ ...newEvent, timeEnd: e.target.value });
                  }}
                />
              </div>
            </div>
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
              className="bg-gray-200 px-4 py-2"
            />
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
              className="bg-gray-200 px-4 py-2"
            />
          </div>
        </div>
      </form>

      {/* DESCRIPTION */}
      <h2 className="text-xl font-semi bold mb-4">Description</h2>
      <label htmlFor="tagline">Tagline de la description</label>
      <input
        type="text"
        id="tagline"
        className="bg-gray-200 px-4 py-2 w-full"
        onChange={(e) => setNewEvent({ ...newEvent, tagline: e.target.value })}
      />

      <label htmlFor="description">Description de l'événement</label>
      <textarea
        id="description"
        className="bg-gray-200 px-4 py-2 w-full field-sizing-content min-h-16"
        onChange={(e) =>
          setNewEvent({ ...newEvent, description: e.target.value })
        }
      ></textarea>

      {/* PROGRAMME */}
      <h2 className="text-xl font-semi bold mb-4">Cartes programme</h2>
      <label htmlFor="title">Titre de la carte</label>
      <input
        type="text"
        id="title"
        className="bg-gray-200 px-4 py-2 w-full"
        value={newCard.title}
        onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
      />
      <label htmlFor="content">Contenu de la carte</label>
      <textarea
        id="content"
        className="bg-gray-200 px-4 py-2 w-full field-sizing-content min-h-16"
        value={newCard.content}
        onChange={(e) => setNewCard({ ...newCard, content: e.target.value })}
      ></textarea>
      <button onClick={addNewCard}>Ajouter la carte programme</button>
      {/* List of cards */}
      <ul className="mt-6 space-y-2 flex flex-wrap gap-4">
        {newEvent.programCards.map((card, index) => (
          <li key={index} className="border flex w-1/2 p-4 rounded-lg">
            <div className="flex-1">
              <strong>{card.title}</strong> <br />
              <p>{card.content}</p>
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
                onClick={() => deleteCard(index)}
                className="cursor-pointer"
              />
            </div>
          </li>
        ))}
      </ul>

      <button
        type="submit"
        className="bg-orange-400 text-white px-4 py-2"
        onClick={addEvent}
      >
        Ajouter aux événements à venir
      </button>

      {/* List of Events */}
      <ul className="mt-6 space-y-2 flex flex-wrap gap-4">
        {events.map((event) => (
          <li key={event._id} className="border flex w-1/2 p-4 rounded-lg">
            <div className="flex-1">
              <h1>{event.name}</h1>
              <p>{event.type}</p>
              <p>
                {new Date(event.date).toLocaleDateString()} de {event.timeStart}{" "}
                à {event.timeEnd}
              </p>
              <p>{event.location}</p>
              <p>{event.ticketLink}</p>
              <p>{event.tagline}</p>
              <p>{event.description}</p>
              <ul>
                {event.programCards.map((card) => (
                  <li key={card.title}>
                    <strong>{card.title}</strong>
                    <p>{card.content}</p>
                  </li>
                ))}
              </ul>
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
                // onClick={() => deleteReview(review._id)}
                className="cursor-pointer"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
