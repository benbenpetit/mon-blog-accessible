import React from 'react'
import styles from './HomeButton.module.scss'
import Link from 'next/link'

const HomeButton = () => {
  return (
    <div>
      <div className={styles.homeButton}>
        <Link
          href={'/'}
          aria-label={`Retour à la page d'accueil`}
          prefetch={false}
        >
          <span>Maison</span>
        </Link>
      </div>
    </div>
  )
}

export default HomeButton
