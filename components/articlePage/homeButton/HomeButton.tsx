import React from 'react'
import styles from './HomeButton.module.scss'
import Link from 'next/link'

const HomeButton = () => {
  return (
    <div className={styles.homeButton}>
      <Link href={'/'} aria-label={`Retour à la page d'accueil`}>
        <span>Maison</span>
      </Link>
    </div>
  )
}

export default HomeButton
