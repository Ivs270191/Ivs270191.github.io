import React from 'react'
import styles from './NotFoundBlock.module.scss'

const NoFoundBlock = () => {
  return (
    <>
    <div className={styles.notFound}>
        <span>😕</span>
        <br />
        <h1>Ничего не найдено</h1>
    </div>
    
    </>
  )
}

export default NoFoundBlock