
import {
    SAVE_COVID_SUMMARY,
    FETCH_DATA_COMPLETED,
    FETCH_DATA_STARTED,
    SAVE_ACTIVE_CASES,
    SAVE_DEATH_CASES,
    SAVE_RECOVERED_CASES

} from '../Actions'

const initialStore = {
    summaryData:{},
    globalData:{},
    inProgress:false,
    activeCaseData: {},
    deathCaseData: {},
    recoveredCaseData: {},

}


const covidReducer = (store=initialStore, action) =>{

    const {type, payload} = action

    switch(type){

        case SAVE_COVID_SUMMARY:  {
        const {Global, Countries=[]} = payload;
        const newSummary = {};

        Countries.forEach(country => {

            newSummary[country.CountryCode] = {
                ...country
            }
            
        });

        return {
            ...store,
            globalData: Global,
            summaryData: newSummary
        };
    }


        case SAVE_ACTIVE_CASES : {

        const newActiveCase = {...store.activeCaseData};
        const {activeCases=[], countryCode} = payload;
        newActiveCase[countryCode] = [...activeCases];
        return {
            ...store,
            activeCaseData: newActiveCase
        };

    }
        

        case SAVE_DEATH_CASES : {

        const newDeathCase = {...store.deathCaseData};
        const {deathCases=[], countryCode} = payload;
        newDeathCase[countryCode] = [...deathCases];

        return {
            ...store,
            deathCaseData: newDeathCase
        };

    }
        case SAVE_RECOVERED_CASES : {

        const newRecoveredCase = {...store.recoveredCaseData};
        const {recoveredCases=[], countryCode} = payload;
        newRecoveredCase[countryCode] = [...recoveredCases];

        return {
            ...store,
            recoveredCaseData: newRecoveredCase
        };
    }



        case FETCH_DATA_STARTED: 
        return {
            ...store,
            inProgress: true
        };

        case FETCH_DATA_COMPLETED: 
        return {
            ...store,
            inProgress: false
        };

        default: return store;
    }
}

export default covidReducer;

