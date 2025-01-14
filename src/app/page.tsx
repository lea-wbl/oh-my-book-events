import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      {/* LANDING */}
      <section className="flex h-screen-minus-header bg-red-200 px-12 py-6">
        <div className="w-1/2 flex justify-center items-center flex-col bg-[url('/paper.png')] bg-contain bg-no-repeat [background-position-x:10px]">
          {/* <Image
            src="/landing-img.png"
            alt="Oh My Book"
            width={200}
            height={100}
            className="border"
          /> */}
          <Image
            src="/logo-oh-my-book.png"
            alt="Oh My Book"
            width={200}
            height={100}
            className="border border-gray-950"
          />
          <p>transforme tes lectures en souvenirs uniques</p>
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-xl font-bold">LOREM IPSUM DOLOR SIT AMET</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur?
          </p>
        </div>
      </section>

      {/* GOALS */}
      <section className="flex gap-4 h-screen-minus-header bg-amber-200 px-12 py-6">
        <div>
          <h3 className="text-lg font-semibold">
            Rencontrer de nouvelles personnes
          </h3>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            Découvrir de nouvelles lectures
          </h3>
          <p>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus.{" "}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            Participer à des ateliers créatifs
          </h3>
          <p>
            Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe eveniet ut et voluptates repudiandae sint et
            molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
            delectus, ut aut reiciendis voluptatibus maiores alias consequatur
            aut perferendis doloribus asperiores repellat.
          </p>
        </div>
      </section>

      {/* UPCOMING EVENT */}
      <section className="flex gap-4 h-screen-minus-header bg-red-200 px-12 py-6">
        UPCOMING EVENT SECTION
      </section>

      {/* CUSTOMERS REVIEWS */}
      <section className="grid grid-flow-col bg-gray-100 h-screen-minus-header px-12 py-6 gap-4">
        <div>
          <cite>Utilsatrice1</cite>
          <blockquote>
            Vous allez réaliser le rêve de plein de gens, je crois en vous !
          </blockquote>
        </div>
        <div>
          <cite>Utilisateur2</cite>
          <blockquote>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </blockquote>
        </div>
        <div>
          <cite>Utilsatrice3</cite>
          <blockquote>
            Juste merci d'avoir eu cette idée folle. J'ai hâte de découvrir.
          </blockquote>
        </div>
        <div>
          <cite>Utilisateur4</cite>
          <blockquote>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </blockquote>
        </div>
      </section>

      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
              <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> 
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
