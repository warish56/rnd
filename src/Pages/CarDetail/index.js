import React, {useState, useEffect} from 'react';


import Header from './Header';
import Footer from './Footer';
import CenterCircle from './CenterCircle';
import CenterImage from './CenterImage';

import Porche_logo from '../../Assets/porche.png'
import Car_Image from '../../Assets/car.png'
import styles from './style.module.css';
import Counter from './Counter';

import useCount from './useCount';


const TextGropup = ({title, description}) => {
    return(
        <div className={styles.textGroup}>
    <span className={styles.textGroup_title}>{title}</span>
    <span className={styles.textGroup_description}>{description}</span>
    </div>
    )
}



const CarDetail = () => {
    const [topSpeed] = useCount(0,306);
    

    return (
        
        <div className={styles.container}>

            <Header logo={Porche_logo}/>

            <div className={styles.left}> 
                <h2>Porche</h2>
                <h3>911</h3>
                <TextGropup title="TOP SPEED" description={`${topSpeed} km/h`}/>
                <TextGropup title="WIDTH" description="1,852 mm"/>
                <TextGropup title="LENGTH" description="4,519 mm"/>
            </div>


            <CenterCircle/>
            <CenterImage image={Car_Image}/>


            <div className={styles.right}>
                <Counter current="01" total="05"/>
            </div>

            <Footer/>

        </div>
    )
}


export default CarDetail;