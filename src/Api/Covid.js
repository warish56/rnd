
const getData = (url, method='GET', body) =>{

    const options = {};

    if(method === 'POST'){
        options.body = JSON.stringify(body);
    }

    
    return fetch(url, {
        method,  
        ...options,
    })
    .then((res) => {
        if(res.ok){
            return res.json()
        }
        throw new Error('SOmething went wrong');
    })
}


export const summary = () => {
    return getData('https://api.covid19api.com/summary');
}

export const detailData = (countrySlug,type) => {
    return getData(`https://api.covid19api.com/dayone/country/${countrySlug}/status/${type}`)
}