import React from 'react';

import styles from './style.module.css'


const CenterCircle = () => {
    return (
        <div className={styles.imageContainer}>
            <div className={styles.imageLeft} />
            <div className={styles.imageRight} />
        </div>
    )
}


export default CenterCircle;