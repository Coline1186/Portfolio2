import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="border-t-6 border-[#ffc58d] pb-[2.9rem] h-25 lg:h-34">
      <div className="flex justify-center items-center gap-8 mt-[2vh]">
        <a
          href="https://github.com/Coline1186"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-4xl lg:text-5xl hover:bg-black hover:text-white hover:border-2 hover:border-black rounded-full" />
        </a>
        <a
          href="https://www.linkedin.com/in/coline-grosso-063298247/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-4xl lg:text-5xl hover:bg-black hover:text-white hover:border-black" />
        </a>
      </div>
      <div className="flex justify-center text-sm mt-4 gap-4">
        <p>© 2026 Coline GROSSO</p>
        <p>-</p>
        <Link to="/privacy" target="_blank" className="hover:underline">
          Politique de confidentialité
        </Link>
      </div>
    </div>
  );
}

export default Footer;
