import React from "react";

const Events = () => {
  return (
    <div>
      <h1>Nos événements</h1>
      <div className="flex gap-4">
        <div className="flex flex-col flex-1 bg-red-100 rounded-lg justify-between">
          <div>
            <h2>Événements immersifs</h2>
            <p>
              Eu molestie nascetur conubia fermentum luctus sed cubilia euismod
              curae. Tempus finibus vestibulum arcu torquent habitasse lacus.
              Orci justo turpis justo; feugiat consequat eleifend.
            </p>
          </div>
          <button className="rounded-full bg-orange-400 text-white px-4 py-1 self-end">
            Voir plus
          </button>
        </div>
        <div className="flex flex-col flex-1 bg-red-100 rounded-lg justify-between">
          <div>
            <h2>Ateliers créatifs</h2>
            <p>
              Libero ullamcorper augue tincidunt dis parturient. Erat
              sollicitudin dis lacinia felis amet velit commodo.
            </p>
          </div>
          <button className="rounded-full bg-orange-400 text-white px-4 py-1 self-end">
            Voir plus
          </button>
        </div>
        <div className="flex flex-col flex-1 bg-red-100 rounded-lg justify-between">
          <div>
            <h2>Rencontres littéraires</h2>
            <p>
              Elementum etiam nec nulla tristique cras quis diam hendrerit.
              Interdum ridiculus vivamus ipsum ante himenaeos curabitur
              sollicitudin semper lobortis. Feugiat diam quisque quis porta
              scelerisque.
            </p>
          </div>
          <button className="rounded-full bg-orange-400 text-white px-4 py-1 self-end">
            Voir plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;
