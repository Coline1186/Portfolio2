import "../App.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useQuery } from "@apollo/client/react";
import { GET_ABOUT } from "../requetes/queries/about.query";

type AboutQuery = {
  abouts: {
    id: string;
    image: string;
  }[];
};

function About() {
  const { loading, error, data } = useQuery<AboutQuery>(GET_ABOUT);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data?.abouts) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.abouts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data]);

  if (loading) return <p>Chargement des Photos...</p>;
  if (error) return <p>Erreur de chargement des Photos</p>;

  return (
    <div className="border-t-6 border-[#ffc58d] pb-[2.9rem] min-h-screen lg:min-h-[88vh]">
      <Fade duration={2000}>
        <div>
          <h1 className="text-4xl font-bold text-center mt-[1vh] mb-[2.5vh] lg:mb-[5vh]">
            À propos de moi
          </h1>
        </div>
      </Fade>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="px-6 lg:pl-[10vh]">
          <Fade duration={2000}>
            <p className="mb-[2vh] lg:mb-[4vh] lg:mt-[3vh]">
              Après presque 14 ans comme secrétaire médicale en radiologie, j'ai
              choisi de me reconvertir dans le développement web, un domaine qui
              allie ma passion pour la résolution d'énigmes et l'informatique.
              Un bootcamp de 5 mois à la Wild Code School a confirmé mon choix.
              J'ai ensuite réalisé un stage de 2 mois en PHP Symfony, suivi
              d'une alternance de 15 mois en tant que développeuse back-end PHP
              Symfony, confirmant davantage encore mon choix de reconversion.
            </p>
          </Fade>

          <Fade duration={2000}>
            <p className="mb-[2vh] lg:mb-[4vh]">
              Mes compétences relationnelles et mon sens du travail en équipe
              sont des atouts précieux dans ce domaine.
            </p>
          </Fade>

          <Fade duration={2000}>
            <p className="mb-[2vh] lg:mb-[4vh]">
              Prochaine étape,{" "}
              <span className="text-[1.3rem] bg-[linear-gradient(to_right,hsl(242,85%,52%)_0%,white_10%,hsl(242,85%,30%)_20%)] bg-size-[600px_auto] bg-clip-text text-transparent animate-shine">
                trouver une entreprise prête à me donner une chance
              </span>
            </p>
          </Fade>

          <Fade duration={2000}>
            <p className="mb-[2vh] lg:mb-[4vh]">
              En dehors du développement web, j'aime voyager aux quatre coins du
              monde en famille ou entre amis, assister à des concerts, passer du
              temps avec mon neveu... <br />
              Mais en vrai ce que j'aime par dessus tout c'est... MON CHAT 😻,
              faut dire qu'elle est vraiment parfaite non ? 😆{" "}
            </p>
          </Fade>
        </div>
        <div className="relative w-full h-[50vh] lg:h-[60vh] lg:mt-[3vh] mt-6 lg:pr-[8%] lg:w-[95%]">
          <AnimatePresence mode="wait">
            {data?.abouts.map(
              (about, index) =>
                index === currentIndex && (
                  <motion.img
                    key={about.id}
                    src={`${import.meta.env.VITE_BACKEND_URL_FILES}${about.image}`}
                    alt={`about-${index}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.5 }}
                  />
                ),
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default About;
