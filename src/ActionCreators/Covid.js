
import {
    SAVE_COVID_SUMMARY,
    FETCH_DATA_COMPLETED,
    FETCH_DATA_STARTED,
    SAVE_ACTIVE_CASES,
    SAVE_DEATH_CASES,
    SAVE_RECOVERED_CASES


} from '../Actions'

import {
    summary,
    detailData
} from '../Api/Covid'



const fetchingDataStarted = () => {
    return{
        type: FETCH_DATA_STARTED
    }
}

const fetchingDataCompleted = () => {
    return{
        type: FETCH_DATA_COMPLETED
    }
}


export const getCovidSummary = () => async (dispatch) => {

    try{
    dispatch(fetchingDataStarted());
    const data = await summary();
    dispatch(fetchingDataCompleted());

    dispatch({type: SAVE_COVID_SUMMARY, payload:data})

    const {Countries=[]} = data;

    Countries.forEach((country) => {
        getDetailCases(dispatch,country.Slug, country.CountryCode, 'confirmed');
        getDetailCases(dispatch,country.Slug, country.CountryCode, 'recovered');
        getDetailCases(dispatch,country.Slug, country.CountryCode, 'deaths');
    })


    }catch(err){
    dispatch(fetchingDataCompleted());
    }
    


}


export const getDetailCases = async (disptach,slugCountry, countryCode,caseType) => {

    try{

        const data = await detailData(slugCountry, caseType);
        let type = '';
        const payload ={
            countryCode,
        };

        switch(caseType){

            case 'confirmed':  
            type = SAVE_ACTIVE_CASES; 
            payload.activeCases = data;
            break;

            case 'recovered':  
            type = SAVE_RECOVERED_CASES;
            payload.recoveredCases = data;
            break;

            case 'deaths':     
            type = SAVE_DEATH_CASES; 
            payload.deathCases = data;
            break;

        }

        
        disptach({
            type,
            payload,
        })

    }catch(err){

    }

}