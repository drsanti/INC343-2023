// import { json } from "@sveltejs/kit";


export type McuResponse = {
    target: string,
    id: string,
    action: string,
    status: string,
    update: string,
};


export class Mcu {

    static url = `http://127.0.0.1:3300`;

    static xhttp: XMLHttpRequest;

    public static initialize = () => {
       if(!Mcu.xhttp) {
            Mcu.xhttp = new XMLHttpRequest();
            // console.log(Mcu.xhttp);
       }
    }


    public static printJsonAsTable = (title: string, json: McuResponse) => {
        console.group(title);
        console.table(json);  
        console.groupEnd();          
    }

    public static sendCommand = (command:string) : Promise<McuResponse> => {

        return new Promise((resolve) => {

            Mcu.xhttp.onreadystatechange = () => {
                
                if (Mcu.xhttp.readyState == 4 && Mcu.xhttp.status == 200) {
                    const json = JSON.parse(Mcu.xhttp.responseText);
                    resolve(json);
                }
            };
            Mcu.xhttp.open("GET", `${Mcu.url}/${command}`, true);
            Mcu.xhttp.send();
        });
    }

}
