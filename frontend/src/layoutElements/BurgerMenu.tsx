import { FaBars, FaTimes } from "react-icons/fa";

function MenuBurger({ toggleMenu, isMenuOpen }: { toggleMenu: () => void; isMenuOpen: boolean }) {
  return (
    <div className="block cursor-pointer relative z-11 lg:hidden" onClick={toggleMenu}>
      {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
    </div>
  );
}

export default MenuBurger;
