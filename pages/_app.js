import { Inter } from 'next/font/google'
import { WalletConnectionProvider } from '../contexts/WalletConnectionProvider'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BottomNav from '../components/layout/BottomNav'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

// 폰트 설정
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
      <WalletConnectionProvider>
        <Header />
        <main className="flex-grow pb-16 md:pb-0">
          <Component {...pageProps} />
        </main>
        <Toaster position="top-center" />
        <Footer />
        <BottomNav />
      </WalletConnectionProvider>
    </div>
  );
}

export default MyApp;