import {createSelector} from 'reselect';


const storeSummaryData = (store, props) => store.covid.summaryData
const storeActiveCasses = (store, props) => store.covid.activeCaseData
const storeDeathCasses = (store, props) => store.covid.deathCaseData
const storeRecoveredCasses = (store, props) => store.covid.recoveredCaseData 

const getCountryCode = (store, props) => props.countryCode

const storeGlobalData = (store, props) => store.covid.globalData;



export const getCountriesSummary = createSelector(
    storeSummaryData,
    (summary) => {

        const data = [];
        const keys = summary && Object.keys(summary) || [];

        for(let i=80; i< 110 && keys.length > 20; i++) {
            data.push(summary[keys[i]])
        }

        return data


        // return summary && Object.keys(summary).map((key) => summary[key] ) || []
    
    }
)

export const getCountrySummary = createSelector(
    getCountryCode,
    storeSummaryData,
    (code,data) => code && data && data[code] || {} 
)

export const getGlobalData =  createSelector(
    storeGlobalData,
    (globalData) => globalData || {}
);


export const getActiveCasses = createSelector(
    storeActiveCasses,
    (data) => data  || {}
)

export const getDeathCasses = createSelector(
    storeDeathCasses,
    (data) => data  || {}
)
export const getRecoveredCasses = createSelector(
    storeRecoveredCasses,
    (data) => data  || {}
)

export const getCountryActiveCasses = createSelector(
    getCountryCode,
    storeActiveCasses,
    (code,data) => code && data && data[code] || [] 
)

export const getCountryDeathCasses = createSelector(
    getCountryCode,
    storeDeathCasses,
    (code,data) => code && data && data[code] || [] 
)
export const getCountryRecoveredCasses = createSelector(
    getCountryCode,
    storeRecoveredCasses,
    (code,data) => code && data && data[code] || [] 
)




