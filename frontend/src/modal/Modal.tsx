import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_SINGLE_CV } from "../requetes/queries/cv.query";

type CvQuery = {
  cv: {
    id: string;
    cv: string;
  } | null;
};

const modalStyle =
  "absolute left-0 top-[200vh] w-screen bg-[#F7DBC0]/80 backdrop-blur-sm flex flex-col items-center z-10";
function Modal({
  setModalOpen,
  close,
}: {
  setModalOpen: (value: boolean) => void;
  close: () => void;
}) {
  const { loading, error, data } = useQuery<CvQuery>(GET_SINGLE_CV);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const width = window.innerWidth;
    const min = 1060;
    if (min - width) window.scrollTo(0, 1134);
  }, []);

  if (loading) return <p>Chargement du CV...</p>;
  if (error) return <p>Erreur de chargement du CV</p>;
  if (!data?.cv) return <p>Aucun CV disponible</p>;

  return (
    <div
      className={`hidden lg:flex ${modalStyle}`}
      onClick={() => {
        close();
      }}
    >
      <button
        type="button"
        onClick={handleCloseModal}
        className="bg-transparent border-none text-[1.5rem]"
      >
        X
      </button>
      <div>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL_FILES}${data.cv.cv}`}
          alt="Mon CV"
          className="w-[50vw]"
        />
      </div>
    </div>
  );
}
export default Modal;
