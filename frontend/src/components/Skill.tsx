import { useQuery } from "@apollo/client/react";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { GET_SKILLS } from "../requetes/queries/skill.query";
import { useState } from "react";
import Modal from "../modal/Modal";
import { GET_SINGLE_CV } from "../requetes/queries/cv.query";

type SkillQuery = {
  skills: {
    id: string;
    logo: string;
    name: string;
  }[];
};

type CvQuery = {
  cv: {
    id: string;
    cv: string;
  } | null;
};

const titleStyle = "font-bold mt-6 mb-10 lg:mt-8 lg:mb-12";

function Skill() {
  const { loading, error, data } = useQuery<SkillQuery>(GET_SKILLS);
  const [modalOpen, setModalOpen] = useState(false);
  const {
    loading: loadingCv,
    error: errorCv,
    data: dataCv,
  } = useQuery<CvQuery>(GET_SINGLE_CV);

  const handleClick = () => {
    setModalOpen(true);
  };

  if (loading) return <p>Chargement des Skills...</p>;
  if (error) return <p>Erreur de chargement des Skills</p>;
  if (loadingCv) return <p>Chargement du CV...</p>;
  if (errorCv) return <p>Erreur de chargement du CV</p>;

  const cvFile = dataCv?.cv?.cv;
  const isPdfCv = cvFile?.toLowerCase().endsWith(".pdf");

  return (
    <div className="min-h-screen border-t-6 border-[#ffc58d]">
      <Fade duration={2000}>
        <h1 className="text-4xl font-bold text-center mt-2 mb-6 lg:mb-10">
          Mes compétences
        </h1>
      </Fade>
      <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row">
        <div className="flex content-evenly flex-wrap justify-center gap-10 w-full p-10 bg-[#faece0] lg:gap-18.75 lg:w-[50vw] lg:my-[3%] lg:ml-7">
          <Fade duration={2000}>
            {data?.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className="w-[30vw] min-h-40 text-center shadow-[0px_5px_15px_rgb(241,190,143)] bg-white rounded-xl p-5 font-[Dosis] lg:w-37.5 lg:min-h-45"
                whileHover={{ scale: 1.1 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: index * 0.2,
                }}
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL_FILES}${skill.logo}`}
                  alt={skill.name}
                  loading="lazy"
                  decoding="async"
                  width={147}
                  height={140}
                  className="w-[22vw] max-h-17.5 h-17.5 object-contain mb-2.5 lg:w-25 lg:max-h-25 lg:h-25"
                />
                <p>{skill.name}</p>
              </motion.div>
            ))}
          </Fade>
          {modalOpen && (
            <Modal
              setModalOpen={setModalOpen}
              close={() => {
                setModalOpen(false);
              }}
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-start bg-[#faece0] w-full lg:w-[50vw] lg:my-[3%] lg:mx-7">
          <Fade duration={2000}>
            <p className={`hidden lg:block ${titleStyle}`}>
              {`Cliquer sur mon CV pour l'agrandir`}
            </p>
            <div className="flex flex-col items-center">
              {cvFile ? (
                isPdfCv ? (
                  <button
                    type="button"
                    className="peer mt-8 w-[70vw] max-w-107.5 lg:w-[40vw] lg:max-w-140 h-[44vh] lg:h-[60vh] border rounded-md bg-white cursor-pointer lg:transition-all lg:duration-700 lg:ease-in-out lg:hover:scale-105 lg:hover:mb-6"
                    onClick={handleClick}
                  >
                    <span className="text-base font-semibold">{`Ouvrir l'aperçu du CV (PDF)`}</span>
                  </button>
                ) : (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL_FILES}${cvFile}`}
                    alt="mon cv"
                    loading="lazy"
                    decoding="async"
                    width={840}
                    height={1188}
                    className="peer mt-8 w-[70vw] max-w-107.5 lg:w-[40vw] lg:max-w-140 lg:transition-all lg:duration-700 lg:ease-in-out lg:hover:scale-105 lg:hover:mb-6 cursor-pointer"
                    onClick={handleClick}
                  />
                )
              ) : (
                <p className="mt-8 text-sm">CV indisponible pour le moment.</p>
              )}
              <div className="flex justify-center items-center m-7 rounded-md w-[45vw] h-14 bg-[#ffc58d] border-2 border-[#d6d3d0] lg:w-[15vw] lg:min-w-55 lg:h-16 lg:transition-transform lg:duration-700 lg:ease-in-out lg:peer-hover:translate-y-4">
                <a
                  href="/cv/CV Coline Grosso.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[1rem]"
                >
                  Télécharger mon CV
                </a>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default Skill;
