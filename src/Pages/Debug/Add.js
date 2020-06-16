import React from 'react';

import './style.css';
import { useState } from 'react';
import { useCallback } from 'react';

const AddDebug = () => {

    const [num1, setNum1] = useState('')
    const [num2, setNum2] = useState('')
    const [num3, setNum3] = useState('')
    const [num4, setNum4] = useState('')
    const [userData, setUserData] = useState({name: '', age: ''})


    const [url, setUrl] = useState('')
    const [domain, setDomain] = useState('')

    const [result, setResult] = useState('')
    const [resultDiv, setResultDiv] = useState('')


    const onChange = useCallback((e) => {
          const {name, value} = e.target;
          if(name === 'num1'){
              setNum1(value)
          }

          if(name === 'num2'){
            setNum2(value)
        }

        if(name === 'num3'){
            setNum3(value)
        }

        if(name === 'num4'){
          setNum4(value)
      }

    }, [setNum1, setNum2, setNum3, setNum4]);

    const onChangeUrl = (e) => {
     const value = e.target.value;
     setUrl(value);
    }


    const addNumber = useCallback(() => {

        console.log("===Number 1====",num1)
        console.log("===Number 2====",num2)

        const result = Number(num1) + Number(num2);
        console.log("===result ====",result)

        setResult(result)
    }, [num1, num2])

    const divideNumber = useCallback(() => {
        if(Number(num4) === 0){
            console.log("======inside return block======")
            return ;
        }
        const result = Number(num3) / Number(num4);
        if(result === Infinity){
            throw new Error('cannot divide by Zero')
        }
        setResultDiv(result)
    }, [num3, num4])

    const getUrlDomain = useCallback(() => {
        const parts = (url).split('/');
        console.log("==result===",parts, parts.length);
        const result = parts[2];
        setDomain(result)
    }, [url])

    const onDataChange = (e) => {
        const {name, value} = e.target;

        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        } ))
    }

    return(

        <div className="add-container">
            <div  className="add-inputs-box">
                <input placeholder="Number 1" onChange={onChange} name="num1" value={num1} type="text"/>
                <span>+</span>
                <input placeholder="Number 2" onChange={onChange} name="num2" value={num2} type="text"/>
            </div>

            <button className="add-btn" onClick={addNumber}>Add</button>

             {
                 !!result && <h2>The sum is {result}</h2>
             }

<hr></hr>

            <div  className="add-inputs-box">
                            <input placeholder="Number 3" onChange={onChange} name="num3" value={num3} type="text"/>
                            <span>/</span>
                            <input placeholder="Number 4" onChange={onChange} name="num4" value={num4} type="text"/>
            </div>

            <button className="add-btn" onClick={divideNumber}>Divide</button>

                        {
                            !!resultDiv && <h2>The result is {resultDiv}</h2>
                        }



                <hr></hr>

                <div  className="add-inputs-box">
                <input className="url-input" placeholder="Enter url" onChange={onChangeUrl}  value={url} type="text"/>
                                
                </div>

                <button className="add-btn" onClick={getUrlDomain}>Domain</button>

                            {
                                !!domain && <h2>The domain is {domain}</h2>
                            }


<hr></hr>

            <div  className="add-inputs-box">
        <input placeholder="Username" onChange={onDataChange} name="name" value={userData.name} type="text"/>
                            <span>/</span>
                            <input placeholder="Age" onChange={onDataChange} name="age" value={userData.age} type="text"/>
            </div>
            
            <h2>hello {userData.name} . Your age is {userData.age}</h2>
                        

                            
             
        </div>




    )
}

export default AddDebug;