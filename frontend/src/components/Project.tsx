import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/ui/card";
import { useQuery } from "@apollo/client/react";
import { GET_PROJECT } from "@/requetes/queries/project.query";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

type ProjectQuery = {
  projects: {
    id: string;
    name: string;
    image: string;
    webLink: string;
    githubLink: string;
    skills: {
      id: string;
      name: string;
      logo: string;
    }[];
  }[];
};

function Project() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { loading, error, data } = useQuery<ProjectQuery>(GET_PROJECT);

  if (loading) return <p>Chargement des projets...</p>;
  if (error) return <p>Erreur de chargement des projets</p>;
  return (
    <div className="border-t-6 border-[#ffc58d] min-h-151 lg:min-h-screen flex justify-center">
      <div className="pb-[5%] lg:pb-[10%] lg:w-full">
        <Fade duration={2000}>
          <h1 className="text-4xl font-bold text-center mt-[1vh] mb-[2.5vh] lg:mb-[5vh]">
            Mes projets
          </h1>
          <div className="flex flex-col justify-center items-center lg:hidden">
            <p className="text-2xl font-medium mb-5 lg:hidden">
              Cliquez pour en savoir plus
            </p>
          </div>
        </Fade>
        <Fade duration={2000}>
          <Carousel
            className="w-full max-w-4xl mx-auto"
            opts={{ align: "center", loop: true }}
          >
            <CarouselContent>
              {data?.projects.map((project) => (
                <CarouselItem key={project.id} className="basis-full">
                  <div className="p-4">
                    <Card
                      onClick={() =>
                        setActiveId(activeId === project.id ? null : project.id)
                      }
                      className="overflow-hidden group cursor-pointer relative"
                    >
                      <CardContent className="p-0 relative">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL_FILES}${project.image}`}
                          alt={project.name}
                          loading="lazy"
                          decoding="async"
                          width={1200}
                          height={675}
                          className="w-full h-65 tablet:h-87.5 lg:h-112.5 object-cover transition-transform duration-500 tablet:group-hover:scale-105"
                        />

                        <div
                          className={`gap-6 absolute inset-0 flex flex-col justify-between items-center text-center p-4 tablet:p-6 bg-[#f9e6d5]/80 transition-opacity duration-300 ${activeId === project.id ? "opacity-100" : "opacity-0"} lg:opacity-0 lg:group-hover:opacity-100`}
                        >
                          <h2 className="top-0 text-lg text-shadow-[3px_3px_gray] tablet:text-2xl lg:text-5xl font-bold mb-4">
                            {project.name}
                          </h2>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            animate={{ y: [2, -10, 2] }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                            }}
                          >
                            <div className="lg:w-160 tablet:w-120 w-80 flex flex-wrap gap-2 tablet:gap-3 justify-center mb-5">
                              {project.skills.map((skill) => (
                                <img
                                  key={skill.id}
                                  src={`${import.meta.env.VITE_BACKEND_URL_FILES}${skill.logo}`}
                                  alt={skill.name}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-8 h-8 tablet:w-12 tablet:h-12 lg:w-13 lg:h-13 object-contain"
                                />
                              ))}
                            </div>
                          </motion.div>
                          <div className="flex gap-3 tablet:gap-4">
                            {project.webLink && (
                              <a
                                href={project.webLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-21 bg-gray-600 text-white px-3 py-1.5 tablet:px-4 tablet:py-2 rounded-lg text-sm tablet:text-base font-medium hover:bg-gray-500 transition"
                              >
                                Site
                              </a>
                            )}

                            {project.githubLink && (
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-21 border border-white px-3 py-1.5 tablet:px-4 tablet:py-2 rounded-lg text-sm tablet:text-base font-medium hover:bg-white hover:text-black transition"
                              >
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden tablet:flex" />
            <CarouselNext className="hidden tablet:flex" />
          </Carousel>
          <p className="text-sm text-gray-500 text-center mt-2 tablet:hidden">
            Faites glisser pour voir les autres projets →
          </p>
        </Fade>
      </div>
    </div>
  );
}

export default Project;
