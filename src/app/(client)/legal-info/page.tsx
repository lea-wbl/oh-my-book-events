import React from "react";

const LegalInfo = () => {
  return (
    <div className="px-12 bg-OMBpink">
      <div className="flex flex-col justify-center h-full max-w-screen-2xl mx-auto">
        <section id="legal-notice" className="h-96  pt-24">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white w-fit">
            <span className="realistic-marker-highlight">Mentions Légales</span>
          </h1>
        </section>
        <section id="privacy-policy" className="h-96  pt-24">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white w-fit">
            <span className="realistic-marker-highlight">
              Politique de Confidentialité
            </span>
          </h1>
        </section>
        <section id="terms-of-use" className="h-96  pt-24">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white w-fit">
            <span className="realistic-marker-highlight">
              Conditions Générales d&apos;Utilisation
            </span>
          </h1>
        </section>
      </div>
    </div>
  );
};

export default LegalInfo;
