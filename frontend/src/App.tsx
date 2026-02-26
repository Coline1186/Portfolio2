import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Admin from "./components/admin/Admin";
import Header from "./components/Header";
import ProtectedArea from "./auth/ProtectedArea";
import Login from "./components/Login";
import LogoBack from "./assets/logoBack.webp";
import "animate.css";
import About from "./components/About";
import Skill from "./components/Skill";

function HomePage() {
  return (
    <>
      <Header />
      <main className="one-page">
        <section className="relative min-h-screen flex items-center justify-center">
          <div
            className="absolute inset-0 bg-contain opacity-90 bg-position-[center_-260px] tablet:bg-position-[center__200px] lg:bg-right"
            style={{ backgroundImage: `url(${LogoBack})` }}
          />

          <div className="relative z-1 opacity-90 w-[94%] max-w-sm min-h-[32vh] mt-21.5 bg-[#f8e4d3] flex flex-col items-center justify-center text-center tablet:max-w-lg tablet:min-h-[45vh] lg:max-w-xl lg:min-h-[55vh]">
            <h1 className="text-4xl font-bold  text-[#563a3f] animate__animated animate__flipInX font-['Pacifico'] tablet:text-5xl lg:text-7xl">
              Coline Grosso
            </h1>

            <h3 className="mt-6 text-xl font-[Dosis] text-[#563a3f] border-r-2 border-gray-300 whitespace-nowrap overflow-hidden inline-block animate-typewriter animate-blink tablet:text-2xl lg:text-4xl">
              Développeuse Web Full Stack
            </h3>
          </div>
        </section>

        <section id="about" className="section">
          <About />
        </section>
        <section id="skills" className="section">
          <Skill />
        </section>
        <section id="projects" className="section">
          <h2>Mes projets</h2>
          <p>Selection de projets.</p>
        </section>
        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>Coordonnees et formulaire.</p>
        </section>
      </main>
      <ScrollToTop smooth color="rgb(77, 76, 76)" className="scroll-top" />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route element={<ProtectedArea isAdminPage />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
