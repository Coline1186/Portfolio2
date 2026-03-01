import { useState } from "react";
import { NavLink } from "react-router-dom";
import moi from "../assets/IMG_5476.webp";
import MenuBurger from "../layoutElements/BurgerMenu";
import { HashLink } from "react-router-hash-link";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linkStyle =
    "animate__animated animate__backInDown text-[var(--primary-color)] no-underline text-[1.2rem] font-semibold";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b-[6px] border-[#ffc58d] bg-[rgb(250,248,244)]">
      <nav className="relative flex justify-between items-center w-full lg:w-screen h-[8vh] px-5 tablet:h-22.5 lg:h-25">
        <HashLink smooth to="#" className="w-[20%] tablet:w-[14%] lg:w-[10%]">
          <img
            src={moi}
            alt="moi"
            width={160}
            height={160}
            decoding="async"
            fetchPriority="high"
            className="animate__animated animate__backInDown mt-[6vh] w-[20vw] rounded-full border-[3px] border-[#ffc58d] tablet:w-[16vw] lg:mt-[50%] lg:w-[90%]"
          />
        </HashLink>
        <div
          className={`${isMenuOpen ? "flex" : "hidden"} flex-col absolute top-0 left-0 w-full h-[38vh] bg-[rgba(255,255,255,0.9)] py-5 text-center z-10 justify-around grow lg:flex lg:flex-row lg:static lg:h-auto lg:bg-transparent lg:py-0 lg:text-left`}
        >
          <HashLink
            smooth
            to="#about"
            className={linkStyle}
            onClick={toggleMenu}
          >
            À propos
          </HashLink>
          <HashLink
            smooth
            to="#skills"
            className={linkStyle}
            onClick={toggleMenu}
          >
            Mes competences
          </HashLink>
          <HashLink
            smooth
            to="#projects"
            className={linkStyle}
            onClick={toggleMenu}
          >
            Mes projets
          </HashLink>
          <HashLink
            smooth
            to="#contact"
            className={linkStyle}
            onClick={toggleMenu}
          >
            Contact
          </HashLink>
          <NavLink to="/admin" className={linkStyle} onClick={toggleMenu}>
            Admin
          </NavLink>
        </div>
        <MenuBurger toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      </nav>
    </header>
  );
}

export default Header;
