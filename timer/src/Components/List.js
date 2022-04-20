import React, {useState, useEffect, createRef, useRef} from 'react'
import axios from 'axios' 

export const ListRepository = () =>{

    const [records, setRecords] = useState([]);

    const [changed, setChanged] = useState(false);
    const [nome, setNome] = useState('');
    const [lastName, setLastName] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeFinish, setTimeFinish] = useState('');

    

    


    //----------------------GET
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
        setTimeStart(getCurrentDate().toString())
    }

    const handleChangeLastName = event =>{
        setLastName(event.target.value);
    }


  
    const handleSubmit = event =>{
        event.preventDefault();

        const record = {
            nome: nome,
            lastName: lastName,
            timeStart: timeStart,
            timeFinish: timeFinish
        };

        
        axios.post('http://localhost:8080/timer/api/v1', {
                                                        nome: record.nome, 
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


    //------------------------PUT   
    const handlePut = id =>{
    
        console.log(id);

        axios.put('http://localhost:8080/timer/api/v1/?id='+id+
                        '&finish='+getCurrentDate().toString()).
        then(()=>{
            setRecords(records);
            setChanged(true);
        })
        setChanged(false);
    }


    /**
     * @returns  the actual date time
     */
    function getCurrentDate(separator=''){
        let newDate = new Date();
        let h = newDate.getHours();
        let m = newDate.getMinutes();
        let s = newDate.getSeconds();
        
    return h + ":" + m + ":" + s ;
    }


    /**
     * Render
     */
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
                <div id="container" key={record.id} >
                    
                    <div id="idRecord" className=""> 
                        ID: {record.id}
                        <button onClick={() => handlePut(record.id)}>STOP</button>
                    </div>

                    <div>name: {record.nome}</div>
                    <div>lastName: {record.lastName}</div>
                    <div>Start: {record.timeStart}</div>
                    <div>finish: {record.timeFinish}</div>
                </div>
                )}

        </div>
    );
}