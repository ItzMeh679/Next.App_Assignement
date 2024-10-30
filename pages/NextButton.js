// components/NextButton.js
import styles from './NextButton.module.css';
import { useEffect, useRef } from 'react';

const NextButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const spotsContainer = buttonRef.current;
    if (spotsContainer) {
      // Generate 20 animated spots
      for (let i = 0; i < 20; i++) {
        const spot = document.createElement('div');
        spot.classList.add(styles.buttonSpot);
        spot.style.top = `${Math.random() * 50}px`;
        spot.style.left = `${Math.random() * 200}px`;
        spotsContainer.appendChild(spot);
      }
    }
  }, []);

  return (
    <div className={styles.buttonContainer}>
      <label htmlFor="animateButton" className={styles.buttonInner} ref={buttonRef}>
        <span className={styles.buttonText}>Next.App</span>
        <i className={styles.icon}>→</i>
      </label>
    </div>
  );
};

export default NextButton;
