import styles from './AgeSelectionView.module.scss';
import Header from '@/components/Header';

interface AgeSelectionViewProps {
  onSelect: (ageGroup: string) => void;
  onBack: () => void;
}

export default function AgeSelectionView({ onSelect, onBack }: AgeSelectionViewProps) {
  const handleSelection = (ageGroup: string) => {
    localStorage.setItem('ageGroup', ageGroup);
    onSelect(ageGroup);
  };

  return (
    <main className={`${styles.container} animate-fade-in`}>
      <Header />
      
      <div className={styles.label}>UNE DERNIÈRE CHOSE</div>
      <h1 className={styles.title}>
        Pour des résultats plus <strong>personnalisés,</strong> sélectionnez votre tranche d&apos;âge
      </h1>

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={() => handleSelection('under-50')}
        >
          Moins de 50 ans
        </button>
        <button
          className={styles.button}
          onClick={() => handleSelection('51-70')}
        >
          51-70 ans
        </button>
        <button
          className={styles.button}
          onClick={() => handleSelection('70+')}
        >
          Plus de 70 ans
        </button>
      </div>
    </main>
  );
}
