import React from 'react';

import styles from './style.module.css'


const Fooetr = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_left}>
                <span>Discover More</span>
                <i class="fas fa-long-arrow-alt-right"></i>
            </div>
            <div className={styles.footer_right}>
                <span>Facebook</span>
                <span>Twitter</span>
                <span>Instagram</span>
            </div>

        </div>
    )
}


export default Fooetr;