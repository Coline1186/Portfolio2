import { useState } from "react";
import { NavLink } from "react-router-dom";
import moi from "../assets/IMG_5476.jpeg";
import "animate.css";
import MenuBurger from "../layoutElements/BurgerMenu";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linkStyle =
    "animate__animated animate__backInDown text-[var(--primary-color)] no-underline text-[1.2rem] font-[Raleway] font-semibold";

  interface ScrollOptions {
    top: number;
    left: number;
    behavior: ScrollBehavior;
  }

  const scrollWithOffset = (el: HTMLElement, offset: number): void => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth",
    } as ScrollOptions);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b-[6px] border-[#ffc58d] bg-[rgb(250,248,244)]">
      <nav className="relative flex justify-between items-center w-full lg:w-[78vw] h-[8vh] px-5 tablet:h-22.5 lg:h-25">
        <NavLink
          to="#home"
          className="w-[20%] tablet:w-[14%] lg:w-[10%]"
          onClick={(event) => scrollWithOffset(event.currentTarget, 100)}
        >
          <img
            src={moi}
            alt="moi"
            className="animate__animated animate__backInDown mt-[6vh] w-[20vw] rounded-full border-[3px] border-[#ffc58d] tablet:w-[16vw] lg:mt-[50%] lg:w-[90%]"
          />
        </NavLink>
        <div
          className={`${isMenuOpen ? "flex" : "hidden"} flex-col absolute top-0 left-0 w-full h-[38vh] bg-[rgba(255,255,255,0.9)] py-5 text-center z-10 justify-around grow lg:flex lg:flex-row lg:static lg:h-auto lg:bg-transparent lg:py-0 lg:text-left`}
        >
          <a
            href="#about"
            className={linkStyle}
            onScroll={(event) => scrollWithOffset(event.currentTarget, 100)}
            onClick={toggleMenu}
          >
            A propos
          </a>
          <a
            href="#skills"
            className={linkStyle}
            onScroll={(event) => scrollWithOffset(event.currentTarget, 100)}
            onClick={toggleMenu}
          >
            Mes competences
          </a>
          <a
            href="#projects"
            className={linkStyle}
            onScroll={(event) => scrollWithOffset(event.currentTarget, 100)}
            onClick={toggleMenu}
          >
            Mes projets
          </a>
          <a
            href="#contact"
            className={linkStyle}
            onScroll={(event) => scrollWithOffset(event.currentTarget, 100)}
            onClick={toggleMenu}
          >
            Contact
          </a>
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
