import { json } from "@sveltejs/kit";



export default class Mcu {


    xhttp: XMLHttpRequest;
    url = `http://127.0.0.1:3300`;


      //    const url = window.location.href.substr(31); //get query
        //    const xhr = new XMLHttpRequest();
        //    xhr.open("GET", url);

        //    xhr.onload = () => {
        //       resp = xhr.response;
        //    }

        //    xhr.send();

    constructor() {
        this.xhttp = new XMLHttpRequest();
    }


    public printJsonAsTable = (title: string, json: JSON) => {
        console.group(title);
        console.table(json);  
        console.groupEnd();          
    }

    public sendCommand = (command:string) : Promise<JSON> => {


        return new Promise((resolve) => {

            this.xhttp.onreadystatechange = () => {
                
                if (this.xhttp.readyState == 4 && this.xhttp.status == 200) {
                    const json = JSON.parse(this.xhttp.responseText);
                    resolve(json);
                }
            };
            this.xhttp.open("GET", `${this.url}/${command}`, true);
            this.xhttp.send();
        });
    }





    public test = () =>  {

        console.log(Math.round(100*Math.random()));
    }
}
