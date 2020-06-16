import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CovidCard from './CovidCard';
import DetailView from './DetailView';


import {
    getCountriesSummary,
    getGlobalData,
    getActiveCasses,
    getDeathCasses,
    getRecoveredCasses,
} from '../../selectors/covid'

import {
    getCovidSummary,
} from '../../ActionCreators/Covid'


import DeskSvg from '../../Assets/desk.svg';

import styles from './style.module.css'

const InfoBox = ({title, description}) => {
    return (

        <div className={styles.info_box}>
                            <span className={styles.info_box_title}>{title}</span>
                            <span className={styles.info_box_description}>{description}</span>
        </div>
    )
}

class Covid extends React.Component{

    constructor(props){
        super(props);
        this.state={
           modalActive: false,
           countryId: null,
           filteredData: [],
           text: ''
        }
    }

    componentDidMount(){
        this.props.getCovidSummary();
    }

    toggleModal = (id) => {
    this.setState((prevState) => ({
        modalActive: !prevState.modalActive,
        countryId: id,
    }))    
    }

    onChange = (e) => {
        this.setState({
            text:  e.target.value
        })
    }
    searchCountry = () => {
        const {summaryData} = this.props
        for(let i=0; i<summaryData.length ; i++ ){
            if(summaryData[i].CountryCode  === this.state.text){
                this.setState({
                    filteredData : [{...summaryData[i]}]
                })
                break;
            }
        }
    }

    render(){

        const {
            summaryData,
            globalData,
            activeCasses,
            deathCasses,
            recoveredCasses,
            isLoading
        } = this.props;

        const {
            TotalConfirmed,
            TotalDeaths,
            TotalRecovered
        } = globalData;

        // console.log("==death=",deathCasses);
        //  console.log("==recoveere=",recoveredCasses);

        const {countryId,modalActive, text, filteredData} = this.state

        const data = filteredData.length >0 ? filteredData : summaryData;

        return(

            <div className={styles.container}>

                <div className={styles.content}>

                <img className={styles.desk_svg} src={DeskSvg}/>

                    <div className={styles.info_box_row}>
                         <InfoBox title="Total Active" description={TotalConfirmed}/>
                         <InfoBox title="Total Recovered" description={TotalRecovered}/>
                         <InfoBox title="Total Deaths" description={TotalDeaths}/>
                    </div>

                    <div className={styles.inputRow}>
                        <input className={styles.input} value={text} type="text" onChange={this.onChange}/>
                       <button onClick={this.searchCountry} className={styles.input_search}>Search</button>
                    </div>

                    {
                        data.map((item) => {
                            return (
                            <CovidCard
                             toggleModal={this.toggleModal}
                             key={item.CountryCode}
                             countryCode={item.CountryCode}
                             activeCasses={activeCasses[item.CountryCode] || []}
                             deathCasses={deathCasses[item.CountryCode] || []}
                             recoveredCasses={recoveredCasses[item.CountryCode] || []}
                             />)
                        })
                    }

                </div>

               
               {
                   modalActive &&
                <div className={styles.modal}>
                    <DetailView 
                    toggleModal={this.toggleModal}
                    countryCode={countryId}
                    />
                </div>
               }

            </div>

        )
    }
}

const mapStateToProps = (store, props) => {
    return {

        summaryData: getCountriesSummary(store,props),
        globalData: getGlobalData(store,props),
        isLoading: store.covid.inProgress,
        activeCasses: getActiveCasses(store,props),
        deathCasses: getDeathCasses(store,props),
        recoveredCasses: getRecoveredCasses(store,props),
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCovidSummary
},dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Covid);