
import React, {useState,useEffect} from 'react';

const useCount = (initalValue,totalValue, spped=20) => {

    const [value, setValue] = useState(initalValue);

    useEffect(() => {
        if(value === totalValue){
            return ;
        }

       const interval=  setInterval(() => {
        setValue((prevValue) =>  prevValue +1)
        },spped)

        return () => {
            clearInterval(interval);
        }
    },[value])

    return [value];
 
}

export default useCount;