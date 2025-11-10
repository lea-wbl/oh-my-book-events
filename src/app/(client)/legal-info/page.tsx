import React from "react";

const LegalInfo = () => {
  return (
    <div className="px-12 bg-OMBpink">
      <div className="flex flex-col justify-center h-full max-w-screen-2xl mx-auto">
        <section id="legal-notice" className="h-96  pt-24">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white w-fit">
            <span className="realistic-marker-highlight">Mentions Légales</span>
          </h1>
          <h2>Collecte des données personnelles</h2>
          <p>
            Le site ne collecte des données personnelles que dans deux cas :
            <ul>
              <li>
                Lorsque l'utilisateur s'inscrit volontairement à la newsletter,
                via un formulaire.
              </li>
              <li>
                Lorsque l'utilisateur envoie un message via le formulaire de
                contact (ou directement à l’adresse e-mail fournie).
              </li>
              Les données collectées sont limitées à : nom et adresse e-mail.
            </ul>
          </p>
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
