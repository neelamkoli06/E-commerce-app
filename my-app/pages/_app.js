import { CartProvider } from '../context/CartContext';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Define routes where Navbar and Footer should not appear
  const hideLayoutPaths = ["/404", "/500"];

  // Check if the current route matches any path in hideLayoutPaths
  const shouldHideLayout = hideLayoutPaths.includes(router.pathname);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        {!shouldHideLayout && <Navbar />}
        <ToastContainer />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        {!shouldHideLayout && <Footer />}
      </div>
    </CartProvider>
  );
}
