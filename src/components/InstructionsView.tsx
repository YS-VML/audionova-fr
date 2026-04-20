import Image from 'next/image';
import styles from './InstructionsView.module.scss';
import Header from '@/components/Header';

interface InstructionsViewProps {
  onReady?: () => void;
  buttonless?: boolean;
}

export default function InstructionsView({ onReady, buttonless }: InstructionsViewProps) {
  return (
    <main className={`${styles.container} animate-fade-in`}>
      <Header />
      
      <h1 className={styles.title}>Avant de commencer</h1>

      <div className={styles.instructionList}>
        <div className={styles.instructionItem}>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/quiet-place.svg"
              alt="Environnement calme"
              width={24}
              height={24}
            />
          </div>
          <p>Trouvez un environnement calme</p>
        </div>
        <div className={styles.instructionItem}>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/headphones.svg"
              alt="Casque audio"
              width={24}
              height={24}
            />
          </div>
          <p>Utilisez un casque ou des écouteurs</p>
        </div>
        <div className={styles.instructionItem}>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/volume.svg"
              alt="Volume"
              width={24}
              height={24}
            />
          </div>
          <p>Réglez le volume sonore<br />de votre appareil à 100%</p>
        </div>
      </div>
      {!buttonless && (
        <div className={styles.buttonWrapper}>
          <button className={styles.button} onClick={onReady}>
            Je suis prêt(e)
          </button>
        </div>
      )}
    </main>
  );
}
