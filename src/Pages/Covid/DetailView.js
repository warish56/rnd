import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { linearGradient,Area ,CartesianGrid, AreaChart, YAxis, Tooltip, Legend} from 'recharts';


import {
    getCountrySummary,
    getCountryActiveCasses,
    getCountryDeathCasses,
    getCountryRecoveredCasses,
} from '../../selectors/covid'

import styles from './style.module.css';

const DetailBox = ({title, description,type}) => {
    
    return (
        <div className={styles.detail_info_box}>
            <span className={styles.detail_info_box_title}>{title}</span>
            <span 
            className={`${styles.detail_info_box_description} ${
                type === 'active' ? styles.active_bg : 
                (type === 'recovered' ? styles.recovered_bg : styles.death_bg) 
            }`}
            >
                {description}
             </span>
        </div>
    )
}

class DetailView extends React.PureComponent{

    constructor(props){
        super(props);
        this.state={
            state: 'active'
        }
    }


    getColor = () => {
        switch(this.state.state){
            case 'active': return '#007bff';
            case 'recovered': return '#28a745';
            case 'death': return '#dc3545';
        }
    }

    changeState = (e) => {
        const {state} = e.target.dataset;
        this.setState({
            state
        })

    }

    render(){
        
        const {
            countryCode,
            activeCasses,
            deathCasses,
            recoveredCasses,
            summaryData,
            toggleModal
        } = this.props

        const { 
            NewConfirmed,
            TotalConfirmed,
            NewDeaths,
            TotalDeaths,
            NewRecovered,
            TotalRecovered
        } = summaryData

        const {state} = this.state;
        const color = this.getColor();

        return(

            <div  className={styles.detail_content}>

              <button onClick={toggleModal} className={styles.close_box} >X</button>
                <div className={styles.detail_left}>
                        <img
                        className={styles.flag_image_large}
                        src={`http://www.geonames.org/flags/x/${countryCode.toLowerCase()}.gif`}
                        alt="country falg"
                        />

                         <DetailBox type="active" title="Total Active" description={TotalConfirmed}/>
                         <DetailBox type="active" title="New Active" description={NewConfirmed}/>

                         <DetailBox type="recovered" title="Total Recovered" description={TotalRecovered}/>
                         <DetailBox type="recovered" title="New Recovered" description={NewRecovered}/>

                         <DetailBox type="death" title="Total Deaths" description={TotalDeaths}/>
                         <DetailBox type="death" title="New Deaths" description={NewDeaths}/>


                </div>

                <div className={styles.detail_right}>

                <AreaChart 
             width={600}
             height={500} 
             data={
                    state === 'active' ?
                    activeCasses :(
                    state === 'recovered' ? 
                    recoveredCasses:
                    deathCasses)
                        
                    }
             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            
            >
                <defs>
                    <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor='#007bff' stopOpacity={0.8}/>
                    <stop offset="95%" stopColor='#007bff' stopOpacity={0}/>
                    </linearGradient>

                    <linearGradient id="recovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor='#28a745' stopOpacity={0.8}/>
                    <stop offset="95%" stopColor='#28a745' stopOpacity={0}/>
                    </linearGradient>

                    <linearGradient id="death" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor='#dc3545' stopOpacity={0.8}/>
                    <stop offset="95%" stopColor='#dc3545' stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="Cases" stroke={color} fillOpacity={1} fill={`url(#${state})`} />
            </AreaChart>

            <div className={styles.slider_box}>

                <button 
                data-state="active"
                onClick={this.changeState}
                className={`${styles.slider_button} ${
                    state === 'active' ? styles.slider_button_active : ''
                }`}
                >
                Active
                </button>

                <button 
                data-state="recovered"
                onClick={this.changeState}
                className={`${styles.slider_button} ${
                (state === 'recovered' ? styles.slider_button_recovered : '')  
                }`}
                >
                Recovered
                </button>

                <button 
                data-state="death"
                onClick={this.changeState}
                className={`${styles.slider_button} ${
                     state === 'death' ? styles.slider_button_death : ''
                }`}
                >
                Deaths
                </button>

            </div>
                </div>

            </div>

        )
    }
}

const mapStateToProps = (store,props) => {

    return {
        activeCasses: getCountryActiveCasses(store,props),
        deathCasses: getCountryDeathCasses(store,props),
        recoveredCasses: getCountryRecoveredCasses(store,props),
        summaryData: getCountrySummary(store,props),
    }
}



export  default connect(mapStateToProps,null)(DetailView);