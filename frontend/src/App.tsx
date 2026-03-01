import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Header from "./components/Header";
import ProtectedArea from "./auth/ProtectedArea";
import LogoBack from "./assets/logoBack.webp";
import "animate.css";

const Admin = lazy(() => import("./components/admin/Admin"));
const Login = lazy(() => import("./components/Login"));
const About = lazy(() => import("./components/About"));
const Skill = lazy(() => import("./components/Skill"));
const Project = lazy(() => import("./components/Project"));

function DeferredSection({
  id,
  className,
  children,
  minHeight = "65vh",
}: {
  id: string;
  className?: string;
  children: ReactNode;
  minHeight?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px", threshold: 0 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section id={id} className={className} ref={sectionRef}>
      {isVisible ? (
        <Suspense fallback={<div className="min-h-[20vh]" />}>{children}</Suspense>
      ) : (
        <div aria-hidden="true" style={{ minHeight }} />
      )}
    </section>
  );
}

function HomePage() {
  useEffect(() => {
    const prefetchSections = () => {
      void import("./components/About");
      void import("./components/Skill");
      void import("./components/Project");
    };

    const timerId = window.setTimeout(prefetchSections, 1200);
    return () => window.clearTimeout(timerId);
  }, []);

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

            <h2 className="mt-6 text-xl font-[Dosis] text-[#563a3f] border-r-2 border-gray-300 whitespace-nowrap overflow-hidden inline-block animate-typewriter animate-blink tablet:text-2xl lg:text-4xl">
              Développeuse Web Full Stack
            </h2>
          </div>
        </section>

        <DeferredSection id="about" className="section" minHeight="85vh">
          <About />
        </DeferredSection>
        <DeferredSection id="skills" className="section" minHeight="85vh">
          <Skill />
        </DeferredSection>
        <DeferredSection id="projects" className="section" minHeight="85vh">
          <Project />
        </DeferredSection>
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
        <Route
          path="/auth/login"
          element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Login />
            </Suspense>
          }
        />
        <Route element={<ProtectedArea isAdminPage />}>
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div className="min-h-screen" />}>
                <Admin />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
