const validate = () =>{
    if(!checkName() || !checkNumber()){
        return false;
    }
    else { return true; }
}


const checkName = () =>{

    const namereg = /\S+[A-Za-z-à-ú.\s_-]+$/;
    let name = document.forms["form-dati"]["nome"].value;
    if(name == ''){
        alert("L' username non può essere vuoto");
        return false;
    } else if (name != ''){
        if(!namereg.test(name)){
            alert("L' username non è valido");
        return false;
        }
    }
    return true;

}

const checkNumber = () =>{

    const numberReg = /^([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|1[0-9]{3}|2000)$/;
    let matricola = document.forms["form-dati"]["matricola"].value;
    if(matricola == ''){
        alert("La matricola non può essere vuoto");
        return false;
    } else if (matricola != ''){
        if(!numberReg.test(matricola)){
            alert("La matricola non è valida");
        return false;
        }
    }
    return true;
}
