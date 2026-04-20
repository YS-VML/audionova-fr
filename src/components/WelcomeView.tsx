import styles from './WelcomeView.module.scss';
import Header from '@/components/Header';

interface WelcomeViewProps {
  onStart?: () => void;
  buttonless?: boolean;
}

export default function WelcomeView({ onStart, buttonless }: WelcomeViewProps) {
  return (
    <main className={`${styles.container} animate-fade-in`}>
      <Header />
      
      <div className={styles.content}>
        <h1 className={styles.title}>
          Votre audition<br />compte
        </h1>
        <p className={styles.description}>
          <strong>3 étapes rapides</strong> pour tester votre audition
        </p>

        <div className={styles.ctaText}>Vérifiez dès maintenant</div>
      </div>

      {!buttonless && (
        <div className={styles.buttonWrapper}>
          <button className={styles.button} onClick={onStart}>
            Commencer
          </button>
        </div>
      )}
    </main>
  );
}
