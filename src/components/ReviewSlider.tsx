import React, { useState } from "react";

const reviews = [
  {
    id: 0,
    user: "Utilisatrice1",
    text: "Vous allez réaliser le rêve de plein de gens, je crois en vous !",
  },
  {
    id: 1,
    user: "Utilisateur2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    user: "Utilisatrice3",
    text: "Merci beaucoup pour votre travail exceptionnel !",
  },
  {
    id: 3,
    user: "Utilisatrice4",
    text: "Juste merci d'avoir eu cette idée folle. J'ai hâte de découvrir.",
  },
  {
    id: 4,
    user: "Utilisateur5",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const bgImages = [
  "/sticky-note-coral.png",
  "/sticky-note-yellow.png",
  "/sticky-note-pink.png",
];

const ReviewSlider = () => {
  const [startIndex, setStartIndex] = useState(0);

  // Get the current 3 reviews to display
  const visibleReviews = reviews.slice(startIndex, startIndex + 3);

  // Function to move the carousel forward
  const nextSlide = () => {
    if (startIndex < reviews.length - 1) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to move the carousel backward
  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex overflow-x-scroll items-center my-auto">
      <button
        onClick={prevSlide}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        disabled={startIndex === 0}
      >
        Previous
      </button>

      {visibleReviews.map((review, index) => (
        <div
          key={review.id}
          className="grid bg-contain bg-no-repeat p-8 w-1/3 aspect-square transition-all duration-500"
          style={{
            backgroundImage: `url(${bgImages[review.id % bgImages.length]})`,
          }}
        >
          <cite className="block font-bold">{review.user}</cite>
          <blockquote className="mt-4 italic">{review.text}</blockquote>
        </div>
      ))}

      <button
        onClick={nextSlide}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        disabled={startIndex >= reviews.length - 3}
      >
        Next
      </button>
    </div>
  );
};

export default ReviewSlider;
