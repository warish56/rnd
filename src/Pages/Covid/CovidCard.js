import React from 'react';

import { linearGradient,Area ,CartesianGrid, AreaChart, YAxis, Tooltip, Legend} from 'recharts';

import styles from './style.module.css';

const extractMonth = (date) => {
    return new Date(date).getMonth()+1
}

class CovidCard extends React.PureComponent{

    constructor(props){
        super(props);
        this.state={
            state: 'active'
        }
    }

    componentDidMount(){
        const arr = ['active', 'death', 'recovered'];
        this.setState({
            state:  arr[Math.floor(Math.random() * arr.length)]
        })

    }

    changeState = (e) => {
        const {state} = e.target.dataset;
        this.setState({
            state
        })

    }

    getColor = () => {
        switch(this.state.state){
            case 'active': return '#007bff';
            case 'recovered': return '#28a745';
            case 'death': return '#dc3545';
        }
    }

    onCardClick = () => {
    this.props.toggleModal(this.props.countryCode);
    }

    render(){
        const {
            countryCode,
            activeCasses,
            deathCasses,
            recoveredCasses,
            
        } = this.props

        const {
            state
        } = this.state

        const color = this.getColor();
    return activeCasses.length === 0 ? null :  (

        <div  className={styles.covid_card}>

            <button onClick={this.onCardClick}  className={styles.covid_card_graph}>

    
            <AreaChart 
             width={300}
             height={280} 
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

            </button>


            <div className={styles.covid_card_action_box}>

                <button 
                onClick={this.changeState}
                data-state="active"
                className={`${styles.covid_action_button} ${styles.active_bg}`}
                >
                Active
                </button>

                <button
                onClick={this.changeState}
                data-state="recovered"
                 className={`${styles.covid_action_button} ${styles.recovered_bg}`}
                 >
                 Recovered
                 </button>

                <button
                onClick={this.changeState}
                 data-state="death"
                 className={`${styles.covid_action_button} ${styles.death_bg}`} 
                 >
                Death
                </button>

            </div>

            <div className={styles.flag_box}>
                <img
                  className={styles.flag_box_image}
                  src={`http://www.geonames.org/flags/x/${countryCode.toLowerCase()}.gif`}
                  alt="country falg"
                  />
                  
            </div>

        </div>

    )
    }
}

export default CovidCard;