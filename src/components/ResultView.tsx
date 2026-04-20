import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './ResultView.module.scss';
import Header from '@/components/Header';

gsap.registerPlugin(useGSAP);

interface ResultViewProps {
  onLegalClick: () => void;
}

export default function ResultView({ onLegalClick }: ResultViewProps) {
  const [score, setScore] = useState<number | null>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s1 = Number(localStorage.getItem('sound1Score') || 0);
    const s2 = Number(localStorage.getItem('sound2Score') || 0);
    const s3 = Number(localStorage.getItem('sound3Score') || 0);

    // Calculate average (0-100)
    const finalScore = Math.round((s1 + s2 + s3) / 3);
    setScore(finalScore);
  }, []);

  // Map 0-100 score to 1-3 scale
  // 0-33: 1, 34-66: 2, 67-100: 3
  const scoreLevel = score === null ? 1 : Math.min(3, Math.max(1, Math.ceil(score / 33.33)));

  const getTitle = () => {
    switch (scoreLevel) {
      case 1: return <>Votre audition semble être <span>réduite</span></>;
      case 2: return <>Votre audition peut nécessiter un <span>examen approfondi</span></>;
      case 3: return <>Votre audition semble <span>excellente</span></>;
      default: return <>Erreur</>;
    }
  };

  // Rotation for the needle (center of each segment)
  // 3 segments, 60 degrees each (approx)
  // Centers: -60, 0, 60
  const rotations = [-51, 0, 53];
  const rotation = rotations[scoreLevel - 1];

  useGSAP(() => {
    if (score === null || !spotlightRef.current) return;

    // Kill any existing tweens
    gsap.killTweensOf(spotlightRef.current);

    const tl = gsap.timeline();

    // Initial state
    gsap.set(spotlightRef.current, {
      xPercent: -50,
      rotate: rotation, // Start from far left
      background: 'linear-gradient(to bottom, rgba(94, 244, 128, 0) 100%, rgba(94, 244, 128, 0.5) 100%)'
    });

    // Animation sequence
    tl.to(spotlightRef.current, {
      background: 'linear-gradient(to bottom, rgba(94, 244, 128, 0) 0%, rgba(94, 244, 128, 0.5) 100%)',
      duration: 1.5,
      ease: 'power2.inOut'
    })

  }, [rotation, score]);

  if (score === null) return <div>Loading...</div>;

  const segmentPath = "M63.2832 102.506C65.4923 102.506 67.2901 100.715 67.2169 98.507C66.566 78.8784 61.1315 59.683 51.3594 42.6011C41.5873 25.5193 27.7952 11.1053 11.2048 0.595384C9.3387 -0.586799 6.8833 0.054879 5.76353 1.95912L0.553065 10.8199C-0.56677 12.7242 0.0741755 15.1693 1.93339 16.3625C15.7824 25.2512 27.3023 37.3603 35.4932 51.6782C43.684 65.9962 48.2838 82.0637 48.9267 98.5071C49.013 100.715 50.7957 102.506 53.0049 102.506L63.2832 102.506Z";

  const segmentTransforms = [
    "rotate(-120, 150, 130) translate(207, 27.5)", // Left
    "rotate(-60, 150, 130) translate(207, 27.5)",  // Middle
    "translate(207, 27.5)"                         // Right
  ];

  const handleShare = () => {
    const shareMessages = [
      "Découvrez comment vous entendez. Testez votre audition avec AuditionSanté.",
      "Vous entendez bien ? Testez votre audition avec AuditionSanté.",
      "30 secondes suffisent. Testez votre audition avec AuditionSanté."
    ];
    const randomMessage = shareMessages[Math.floor(Math.random() * shareMessages.length)];

    if (navigator.share) {
      navigator.share({
        title: 'AuditionSanté',
        text: randomMessage,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert("Le partage n'est pas pris en charge sur ce navigateur.");
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.fadeIn}>
        <Header compact />
        <h1 className={styles.title}>{getTitle()}</h1>
        
      </div>

      <div className={styles.desktopGrid}>
        {/* Column 1: Result & Actions */}
        <div className={`${styles.card} ${styles.resultCard} ${styles.fadeIn}`} style={{ animationDelay: '0.1s' }}>
          <div className={styles.resultGraph}>
            <div className={styles.gaugeContainer}>
      
              <svg className={styles.gaugeSvg} viewBox="0 0 300 160">
                {segmentTransforms.map((transform, i) => {
                  const isActive = i < scoreLevel;
                  return (
                    <path 
                      key={i} 
                      d={segmentPath} 
                      transform={transform}
                      className={`${styles.segment} ${isActive ? styles[`activeSegment${i}`] : styles.inactiveSegment}`}
                    />
                  );
                })}
              </svg>
              
              {/* Needle / Spotlight */}
              <div 
                ref={spotlightRef}
                className={styles.spotlight} 
              />
              
              <div className={styles.resultLabel}>Votre résultat</div>
            </div>
          </div>

          <div className={styles.resultActions}>
            {scoreLevel === 1 && (
              <button className={styles.button} onClick={() => window.open('https://www.auditionsante.fr/demander-rendez-vous/', '_blank')}>
                Prenez rendez-vous pour un bilan auditif gratuit
              </button>
            )}
            {scoreLevel === 2 && (
              <button className={styles.button} onClick={() => window.open('https://www.auditionsante.fr/demander-rendez-vous/', '_blank')}>
                Prenez rendez-vous pour un bilan auditif gratuit
              </button>
            )}
            {scoreLevel === 3 && (
              <button className={styles.button} onClick={() => window.open('https://www.auditionsante.fr/recherche-centres/', '_blank')}>
                Trouver un centre
              </button>
            )}

            <button className={styles.inviteLink} onClick={handleShare}>
              Invitez quelqu&apos;un à l&apos;essayer
              <Image
                src="/icons/arrow-top-right.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>

        {/* Column 2: Recommendation */}
        {scoreLevel === 1 ? (
          <div className={`${styles.card} ${styles.fadeIn}`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.cardLabel}>RECOMMANDÉ POUR VOUS</div>
            <h2 className={styles.cardTitle}>Phonak Virto™ R Infinio</h2>
            <div className={styles.productImage}>
              <Image
                src="/icons/elipse.svg"
                alt=""
                width={250}
                height={100}
                className={styles.ringBack}
              />
              <Image
                src="/img/products/phonak.webp"
                alt="Phonak Virto™ R Infinio"
                width={140}
                height={140}
                className={styles.productImg}
              />
              <Image
                src="/icons/half-elipse.svg"
                alt=""
                width={250}
                height={100}
                className={styles.ringFront}
              />
            </div>
            <a href="https://www.auditionsante.fr/recherche-centres/" className={styles.outlineButton}>Découvrez le produit</a>
          </div>
        ) : scoreLevel === 2 ? (
          <div className={`${styles.card} ${styles.articleCard} ${styles.fadeIn}`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.articleImageContainer}>
              <Image
                src="/img/articles/article1.webp"
                alt="Bilan auditif"
                width={320}
                height={200}
                className={styles.articleImage}
              />
            </div>
            <div className={styles.articleContent}>
              <div className={styles.cardLabel}>RECOMMANDÉ POUR VOUS</div>
              <h2 className={styles.cardTitle}>Découvrez quand passer un test auditif</h2>
              <button className={styles.outlineButton} onClick={() => window.open('https://www.auditionsante.fr/bilan/ai-je-besoin-d-un-appareil-auditif/', '_blank')}>
                Lire l&apos;article
              </button>
            </div>
          </div>
        ) : (
          <div className={`${styles.card} ${styles.articleCard} ${styles.fadeIn}`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.articleImageContainer}>
              <Image
                src="/img/articles/article2.webp"
                alt="Protéger son audition"
                width={320}
                height={200}
                className={styles.articleImage}
              />
            </div>
            <div className={styles.articleContent}>
              <div className={styles.cardLabel}>COMMENT PROTÉGER SON AUDITION</div>
              <h2 className={styles.cardTitle}>Les étapes pour protéger son audition</h2>
              <button className={styles.outlineButton} onClick={() => window.open('https://www.auditionsante.fr/protection-auditive/', '_blank')}>
                Lire l&apos;article
              </button>
            </div>
          </div>
        )}

        {/* Column 3: Contact */}
        <div className={`${styles.card} ${styles.fadeIn}`} style={{ animationDelay: '0.3s' }}>
          <div className={styles.cardLabel}>BESOIN D&apos;AIDE ?</div>
          <h2 className={styles.cardTitle}>Rencontrez nos experts de l&apos;audition</h2>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <Image src="/icons/location.svg" alt="" width={24} height={24} />
              <a href="https://www.auditionsante.fr/recherche-centres/" target="_blank">Trouver un centre</a>
            </div>
            {scoreLevel !== 3 && (
              <>
                <div className={styles.contactItem}>
                  <Image src="/icons/call.svg" alt="" width={24} height={24} />
                  <span><a href="tel:0800711999" target="_blank">0 800 711 999</a></span>
                </div>
                <div className={styles.contactItem}>
                  <Image src="/icons/email.svg" alt="" width={24} height={24} />
                  <a href="mailto:crc@auditionsante.fr">crc@auditionsante.fr</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <button className={styles.legalButton} onClick={onLegalClick}>
        MENTIONS LÉGALES
      </button>
    </main>
  );
}
