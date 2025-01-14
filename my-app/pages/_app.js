import { CartProvider } from '../context/CartContext';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
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
        <Navbar />
        <ToastContainer />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
