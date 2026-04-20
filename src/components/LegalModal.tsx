import Image from 'next/image';
import styles from './LegalModal.module.scss';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          Fermer ✕
        </button>

        <h2 className={styles.title}>MENTIONS LÉGALES</h2>

        {/* #1 Avertissement résultats */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Avertissement concernant les résultats</h3>
          <div className={styles.scrollableContent}>
            <p className={styles.text}>
              Les informations fournies ont une valeur strictement indicative et ne constituent pas un diagnostic médical.
              Pour un bilan auditif complet, veuillez consulter un ORL.
            </p>
          </div>
        </div>

        {/* #2 Avertissement environnement */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Avertissement concernant l&apos;environnement</h3>
          <div className={styles.scrollableContent}>
            <p className={styles.text}>
              Pour obtenir des résultats précis, veuillez effectuer ce test dans un environnement calme en utilisant un casque.
              Les bruits de fond (rues, transports en commun, etc.) peuvent fausser vos résultats.
            </p>
          </div>
        </div>

        {/* #3 Politique de confidentialité */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Politique de confidentialité</h3>
          <div className={styles.scrollableContent}>
            <p className={styles.text}>
              AuditionSanté ne collecte, ne traite et ne conserve aucune donnée à caractère personnel de l&apos;utilisateur pour la réalisation du test auditif. Les cookies utilisés dans le cadre du test auditif sont strictement nécessaires à la fourniture du service et AuditionSanté ne vend ni ne partage ces données auprès de tiers à des fins publicitaires. Pour en savoir plus sur vos droits et sur la manière dont AuditionSanté gère vos informations personnelles, veuillez consulter notre{' '}
              <a className={styles.legalLink} href="https://www.auditionsante.fr/politique-de-confidentialite/" target="_blank">Politique de confidentialité</a>.
              Pour exercer vos droits, merci de nous adresser votre demande par courriel à{' '}
              <a className={styles.legalLink} href="mailto:rgpd@auditionsante.fr">rgpd@auditionsante.fr</a>{' '}
              ou par courrier chez SONOVA AUDIOLOGICAL CARE FRANCE SAS – Service de la protection des données – 1134 Chemin du Bartassec (46000) CAHORS.
              Vous avez également la possibilité d&apos;introduire une réclamation auprès de la CNIL.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Contact</h3>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <Image src="/icons/location.svg" alt="Localisation" width={20} height={20} />
              <span>
                AuditionSanté<br />
                <a href="https://www.auditionsante.fr/recherche-centres/" target="_blank">Trouver un centre</a>
              </span>
            </div>
            <div className={styles.contactItem}>
              <Image src="/icons/call.svg" alt="Téléphone" width={20} height={20} />
              <span><a href="tel:0800711999" target="_blank">0 800 711 999</a></span>
            </div>
            <div className={styles.contactItem}>
              <Image src="/icons/email.svg" alt="E-mail" width={20} height={20} />
              <span><a href="mailto:crc@auditionsante.fr">crc@auditionsante.fr</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}