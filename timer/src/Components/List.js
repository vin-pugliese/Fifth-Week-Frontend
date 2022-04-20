import React, {useState, useEffect, createRef, useRef} from 'react'
import axios from 'axios' 

export const ListRepository = () =>{

    const [records, setRecords] = useState([]);

    const [changed, setChanged] = useState(false);

    const [nome, setNome] = useState('');
    const [lastName, setLastName] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeFinish, setTimeFinish] = useState('');



    React.useEffect( ()=>{
        fetch('http://localhost:8080/timer/api/v1')
        .then(response =>{
            if(response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
            setRecords(data)
        })
        .catch(error =>{
            console.error("Error during fetch")
        })
    }, []);


    //----------------POST

    const handleChangeNome = event =>{
        setNome(event.target.value);
    }

    const handleChangeLastName = event =>{
        setLastName(event.target.value);
    }
/*
    const handleChangeTimeStart = () =>{
        setTimeStart(this.getCurrentDate().toString());
    }

    const handleChangeTimeFinish = () =>{
        setTimeFinish(this.getCurrentDate().toString());
    }
*/


    const handleSubmit = event =>{
        event.preventDefault();

        //this.handleChangeTimeStart();

        const record = {
            nome: nome,
            lastName: lastName,
            timeStart: getCurrentDate().toString(),
            timeFinish: timeFinish
        };

        
        axios.post('http://localhost:8080/timer/api/v1', {nome: record.nome, 
                                                        lastName: record.lastName,
                                                        timeStart: timeStart,
                                                        timeFinish: ''}).
        then(()=>{
            records.push(record);
            setRecords(records);
            setChanged(true);
        });
        setChanged(false);
    }


    function getCurrentDate(separator=''){
        let newDate = new Date();
        let h = newDate.getHours();
        let m = newDate.getMinutes();
        let s = newDate.getSeconds();
        
    return h+":"+m+":"+s ;
    }


    return(
        <div className="container">
            <form className="post-form" onSubmit={handleSubmit}>
                <input 
                    type='text'
                    className='nome'
                    name ='nome'
                    onChange={handleChangeNome}
                />
                <input 
                    type='text'
                    className='lastName'
                    name ='lastName'
                    onChange={handleChangeLastName}
                />
                <input type='submit'/>
            </form>

            {records.length >0 && records.map(record =>
                <div key={record.id} >
                    <div>ID: {record.id}</div>
                    <div>name: {record.nome}</div>
                    <div>lastName: {record.lastName}</div>
                    <div>Start: {record.timeStart}</div>
                    <div>finish: {record.timeFinish}</div>
                </div>
                )}

        </div>
    );
}