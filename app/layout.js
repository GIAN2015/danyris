import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import WhatsAppButton from '@/app/WhatsAppButton';
import { Oxanium } from 'next/font/google';
import './global.css';
import Footer from '@/app/Footer';
import Header from '@/app/Header';


export const metadata = {
  title: 'Danyris',
  description: 'Danyris SAC ofrece servicios de consultoría y capacitación en diversas áreas.',
};

const oxanium = Oxanium({
  subsets: ['latin'],
  weight: ['400'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />

      </head>
      <body className={oxanium.className}>
        <div>
          
        <header >
          <Header />
        </header>

        
          <div className='layout-container'>

            {children}
          </div>
          <WhatsAppButton /> {/* Esto está bien ubicado */}

          <footer className="footer bg-footer text-white py-5 animate-footer">
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}
