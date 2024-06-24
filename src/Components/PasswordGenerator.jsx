import * as React from 'react';
import './PasswordGenerator.css'
import copy from '../Assets/copy.svg'
import { ToastContainer, toast } from 'react-toastify';
import { generatePath } from 'react-router-dom';
import { selectClasses } from '@mui/material';


    const lowercaseList='abcdefghijklmnopqrstuvwxyz';
    const UppercaseList='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const NumbersList = '01234567989'
    const Symbols='!@#$^&*()?'
const PasswordGenerator = () => {
    const [password,setPassword] = React.useState('');
    const [lowercase,setLowerCase] = React.useState(true);
    const [uppercase,setUpperCase] = React.useState(true);
    const [numbers,setNumbers] = React.useState(true);
    const [symbols,setSymbols] = React.useState(true);
    const [passwordLength,setPasswordLength] = React.useState(8);
    const [selectChoices,setSelectChoices] = React.useState(['lowercase','uppercase','numbers','symbols']);

    const GeneratePassword = () =>{
        let characterList ='';
        if(lowercase){
            characterList+=lowercaseList;
        }
        if(uppercase){
            characterList+=UppercaseList;
        }
        if(numbers){
            characterList+=NumbersList;
        }
        if(symbols){
            characterList+=Symbols;
        }
        console.log(characterList)
        let tempPassword='';
        const characterListLength = characterList.length;

        for(let i=0;i<passwordLength;i++){
            const characterIndex = Math.round(Math.random()*characterListLength);
            tempPassword += characterList.charAt(characterIndex);
        }
        setPassword(tempPassword);
    }

    const copyPassword = async() =>{
        const copiedText = await navigator.clipboard.readText();
        if(password.length  && copiedText!=password.length  ){
            navigator.clipboard.writeText(password);
        }
        toast.success('🦄 Text Copied Succesfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Slide,
        });
    }

    React.useEffect(()=>{
        GeneratePassword();
    },[passwordLength]);

    const handleCheckbox = (type) =>{
        let tempChoices = selectChoices;
        if(tempChoices.includes(type)){
            const index = tempChoices.indexOf(type);
            tempChoices.splice(index,1);
        }else{
            tempChoices.push(type);
        }
        console.log(tempChoices);
        setSelectChoices(tempChoices);
    }

  return (
    <>
    <div className='container'>
        <h2 className='tittle'> Strong Password Generator</h2>
        <div className='password-wrap'>
            <div className='password-area'>
                <div className='password'>
                    <input type='text' value={password} disabled placeholder='Click on Generate Password'/>
                    <img src={copy} alt='no img ' className='copyicon' onClick={copyPassword}/>
                </div>
            </div>
        </div>
        <div className="setting">
            <h3>Customize Your Password</h3>
            <div className="custom">
                <div className="checkboxes">
                    <div className="left">
                        <div className="checkbox-field">
                            <input type='checkbox' name='lower' id='lower' checked={lowercase} onChange={()=>{setLowerCase(!lowercase),handleCheckbox(lowercase)}}/>
                            <label htmlFor='lower'>Include Lowercase Letters(a-z)</label>
                        </div>
                        <div className="checkbox-field">
                            <input type='checkbox' name='upper' id='upper'checked={uppercase} onChange={()=>{setUpperCase(!uppercase),handleCheckbox(uppercase)}}/>
                            <label htmlFor='upper'>Include Uppercase Letters(A-Z)</label>
                        </div>
                    </div>
                    <div className="right">
                        <div className="checkbox-field">
                                <input type='checkbox' name='number' id='number'checked={numbers} onChange={()=>{setNumbers(!numbers),handleCheckbox(numbers)}}/>
                                <label htmlFor='number'>Include Numbers(0-9)</label>
                        </div>
                        <div className="checkbox-field">
                                <input type='checkbox' name='special' id='special'checked={symbols} onChange={()=>{setSymbols(!symbols),handleCheckbox(symbols)}}/>
                                <label htmlFor='special'>Include Special Characters(!@#$&*)</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="password-length">
            <h3>Password length</h3>
            <div className="slider">
                <p className='rangeValue'>{passwordLength}</p>
                <div className="range">
                    <input type='range' min={8} max={40} defaultValue={passwordLength} onChange={(e)=>setPasswordLength(e.currentTarget.value)}/>
                </div>
            </div>
        </div>
        <div className="buttons">
            <button type='button' onClick={copyPassword}>Copy Password</button>
            <button type='button' onClick={GeneratePassword}>Generate  Password</button>
        </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default PasswordGenerator