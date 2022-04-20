const counter = () =>{

    let newYear= new Date().getFullYear()+1;
    document.getElementById("title").innerHTML= newYear ;

    let thisyear = new Date().getFullYear()
    let x = new Date("Jan 1, 2000 00:00:00");
    x.setFullYear(thisyear+1);

    let count = setInterval(function() {	
        let now=new Date().getTime(); 
        let sub = x - now;
  
        let days = Math.floor(sub / (1000 * 60 * 60 * 24));
        let h = Math.floor((sub % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((sub % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((sub % (1000 * 60)) / 1000);
        document.getElementById("counter").innerHTML = days + "giorni   " + h + "h   "+ m + "m   " + s + "s";

    }, 1000);

}