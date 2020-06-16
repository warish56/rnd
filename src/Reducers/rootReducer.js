import {combineReducers} from 'redux'
import covidReducer from './covid';

const rootReducer = combineReducers({
    covid:covidReducer
});

export default rootReducer;