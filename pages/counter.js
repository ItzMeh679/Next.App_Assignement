// pages/counter.js
import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import styles from '../styles/Counter.module.css'; // Importing CSS specific to the Counter page
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

// Define the styled component for the background
const Background = styled.div`
  background-image: url('/public/Background.png'); // Path to your background image
  background-size: cover;
  background-position: center;
  filter: blur(8px); /* Gaussian blur */
  width: 100vw;
  height: 100vh;
  position: fixed; /* Fixed to cover the entire screen */
  top: 0;
  left: 0;
  z-index: -1;
`;

export default function Counter() {
  const [count, setCount] = useState(0);
  const [incrementValue, setIncrementValue] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState(1);
  const [buttonSuccess, setButtonSuccess] = useState({ increment: false, decrement: false });

  const handleIncrement = (amount, type) => {
    setCount((prev) => prev + amount);

    setButtonSuccess((prev) => ({
      ...prev,
      [type]: true,
    }));

    setTimeout(() => {
      setButtonSuccess((prev) => ({
        ...prev,
        [type]: false,
      })), 3000;
    });
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Counter Page</title>
      </Head>

      {/* Gaussian blurred background */}
      <Background />

      <div className={styles.counterContainer}>
        <h1 className={styles.countDisplay}>{count}</h1>

        <button
          onClick={() => handleIncrement(incrementValue, 'increment')}
          className={`${styles.button} ${buttonSuccess.increment ? styles.success : ''}`}
        >
          Increase <i className="fas fa-plus"></i>
        </button>

        <button
          onClick={() => handleIncrement(-incrementValue, 'decrement')}
          className={`${styles.button} ${buttonSuccess.decrement ? styles.success : ''}`}
        >
          Decrease <i className="fas fa-minus"></i>
        </button>

        <button onClick={openModal} className={styles.btnInteractive}>
          Custom Increment/Decrement
        </button>

        {modalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <label>Custom Amount:</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
              />
              <div className={styles.modalButtons}>
                <button onClick={() => handleIncrement(customAmount, 'increment')} className={styles.modalButton}>
                  Increase
                </button>
                <button onClick={() => handleIncrement(-customAmount, 'decrement')} className={styles.modalButton}>
                  Decrease
                </button>
              </div>
              <button onClick={closeModal} className={styles.modalClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
