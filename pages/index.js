import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';


export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const documentHeight = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / documentHeight;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.min(scrollProgress / 0.5, 1);

  return (
    <div>
      <Head>
        <title>Interactive Background</title>
      </Head>

      <div
        style={{
          backgroundColor: 'black',
          width: '100vw',
          height: '200vh',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{
          color: 'white',
          opacity: 0.8,
          textAlign: 'center',
          fontSize: '3em',
          textShadow: '0px 0px 10px rgba(255, 255, 255, 0.8)',
        }}>
          Welcome !
        </h1>
        <p style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '1.5em',
          textShadow: '0px 0px 8px rgba(255, 255, 255, 0.6)',
        }}>
          From The Gamers for The Gamers.
        </p>
      </div>

      <div className={styles.container} style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.ezexText} style={{
          opacity: opacity,
          color: 'white',
          fontSize: '100px',
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '0px 0px 15px rgba(255, 255, 255, 0.7)',
        }}>
          EzEx
        </div>
        <div className={styles.nameText} style={{
          opacity: opacity,
          color: 'white',
          fontSize: '60px',
          marginTop: '100px',
          textAlign: 'center',
          textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
        }}>
          Manan Shah
        </div>

        <div className={styles.buttonContainer}>
          <a href="/counter" className={`${styles.btn} ${styles.btnInteractive}`}>Next.App</a>
        </div>
      </div>
    </div>
  );
}
