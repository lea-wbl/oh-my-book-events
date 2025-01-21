import React, { useEffect, useRef } from "react";

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

export default function ReviewSlider2() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = scrollContainer.clientWidth * (2 / 3); // Width of each card
    const initialScrollLeft = cardWidth; // Start at the first real card

    // Set the initial scroll position
    scrollContainer.scrollLeft = initialScrollLeft;

    const handleScroll = () => {
      const maxScrollLeft =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft = maxScrollLeft - 2 * cardWidth;
      } else if (scrollContainer.scrollLeft >= maxScrollLeft) {
        scrollContainer.scrollLeft = cardWidth;
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const items = [
    reviews[reviews.length - 1], // Clone last item
    ...reviews,
    reviews[0], // Clone first item
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex w-full overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
      >
        {items.map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className="flex-shrink-0 w-2/3 aspect-square flex flex-col snap-center justify-center bg-contain bg-no-repeat p-8 mx-2"
            style={{
              backgroundImage: `url(${bgImages[review.id % bgImages.length]})`,
            }}
          >
            <cite className="block font-bold">{review.user}</cite>
            <blockquote className="mt-4 italic">{review.text}</blockquote>
          </div>
        ))}
      </div>
    </div>
  );
}
