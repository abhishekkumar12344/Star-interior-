import { useState, useEffect } from 'react';
import { useRouter } from './router/RouterContext.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Preloader from './components/Preloader/Preloader.jsx';
import FloatingButtons from './components/FloatingButtons/FloatingButtons.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage/ServicesPage.jsx';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage.jsx';
import ProjectDetailsPage from './pages/ProjectDetailsPage/ProjectDetailsPage.jsx';
import ProcessPage from './pages/ProcessPage/ProcessPage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import ConsultationPage from './pages/ConsultationPage/ConsultationPage.jsx';

export default function App() {
  const { route } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  let page;
  if (route === '/' || route === '') page = <HomePage />;
  else if (route === '/about') page = <AboutPage />;
  else if (route === '/services') page = <ServicesPage />;
  else if (route === '/projects') page = <ProjectsPage />;
  else if (route.startsWith('/project/')) page = <ProjectDetailsPage id={route.replace('/project/', '')} />;
  else if (route === '/process') page = <ProcessPage />;
  else if (route === '/contact') page = <ContactPage />;
  else if (route === '/consultation') page = <ConsultationPage />;
  else page = <HomePage />;

  return (
    <>
      <Preloader loading={loading} />
      <Navbar />
      <main key={route}>{page}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
