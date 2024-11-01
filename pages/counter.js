import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/counter.module.css';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={styles.cursorGlow} 
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default function Counter() {
  const [count, setCount] = useState(0);
  const [glow, setGlow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const handleIncrement = (amount) => {
    setCount((prev) => prev + amount);
    setGlow(true);

    setTimeout(() => {
      setGlow(false);
    }, 1000);
  };

  const handleModalIncrement = (isPositive) => {
    const amount = customAmount ? 
      (isPositive ? Math.abs(Number(customAmount)) : -Math.abs(Number(customAmount))) 
      : 0;
    
    handleIncrement(amount);
    setModalOpen(false);
    setCustomAmount('');
  };

  return (
    <div>
      <Head>
        <title>Counter Page</title>
      </Head>

      <CursorGlow />

      <div className={styles.background}>
        {/* Removed the glowEffect div */}
      </div>

      <div className={styles.counterContainer}>
        <h1 className={`${styles.countDisplay} ${glow ? styles.glow : ''}`}>
          {count}
        </h1>

        <div className={styles.buttonContainer}>
          <button 
            className={styles.button} 
            onClick={() => handleIncrement(1)}
          >
            Increase
          </button>
          <button 
            className={styles.button} 
            onClick={() => handleIncrement(-1)}
          >
            Decrease
          </button>
          <button 
            className={`${styles.button} ${styles.customIncrementButton}`} 
            onClick={() => setModalOpen(true)}
          >
            Custom Increment/Decrement
          </button>
        </div>

        {modalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <label>Enter Custom Amount:</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
              />
              <div className={styles.modalButtonGroup}>
                <button 
                  className={`${styles.modalButton} ${styles.modalButtonIncrease}`} 
                  onClick={() => handleModalIncrement(true)}
                >
                  Increase
                </button>
                <button 
                  className={`${styles.modalButton} ${styles.modalButtonDecrease}`} 
                  onClick={() => handleModalIncrement(false)}
                >
                  Decrease
                </button>
                <button 
                  className={`${styles.modalButton} ${styles.modalClose}`} 
                  onClick={() => {
                    setModalOpen(false);
                    setCustomAmount('');
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}