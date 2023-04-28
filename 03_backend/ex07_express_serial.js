import express  from 'express';
import cors from 'cors';
import path from 'path';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';


const EXIT_IF_ERROR = false;

/**
 * Serial Port
 */
const PATH = `COM12`;	/** Warning! This is depended on your port!. */
const port = new SerialPort({
	path: PATH,
	baudRate: 115200,
}, (info)=>{
    /* open callback */
    console.log(info)
}, (err)=>{
    /* error callback */
    console.error(`Error: Serial port object creation failed`);
    if(EXIT_IF_ERROR){
        console.error(`Server not started`);
        process.exit(-1);
    }
});


port.open( (err)=> {
    console.error(`\n\nError: Cannot open the port "${PATH}"\n`);
    if(EXIT_IF_ERROR){
        console.error(`Server not started`);
        process.exit(-1);
    }
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (buffer) => {
	console.log(`mcu: ${buffer}`);
});


/**
 * Mcu class
 */
class Mcu {

    constructor(port){
        this.port = port;
    }

    checkId(id){
        return (id >= 0 && id <= 3);
    }

    // Returns Promise
    async sendCommand(command) {
        if(this.port.isOpen){
            await this.port.write(`${command}\r\n`);
            return true;
        }
        return false;
    }

    ledOn = async (id) => {
        if(this.checkId(id)) {
            return await this.sendCommand(`led,${id},1`);
        }
        return false;
    }

    ledOff = async(id) => {
        if(this.checkId(id)){
            return await this.sendCommand(`led,${id},0`);
        }
        return false;
    }

    ledToggle = async(id) => {
        if(this.checkId(id)){
            return await this.sendCommand(`led,${id},2`);
        }
        return false;
    }

    ledCtrl = async(id, action) => {

        const parseAction = (action) => {
            if(action == "off") return 0;
            else if(action == "on") return 1;
            else if(action == "inv") return 2;
            else if(action == "toggle") return 2;
            else return -1;
        }
        action = parseAction(action);

        if(action == -1) {
            return false;
        }
        if(this.checkId(id)){
            return await this.sendCommand(`led,${id},${action}`); 
        }  
        return false;
    }

    ledFls = async(id, interval) => {
        if(this.checkId(id) && !isNaN(interval)){
            return await this.sendCommand(`fls,${id},${interval}`); 
        }  
        return false;  
    }
}

/**
 * Mcu object
 */
const mcu = new Mcu(port);

 
/**
 * Express
 */
const PORT = 3300;
const app = express()
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`\nOpen a web browser and go to http://localhost:${PORT} or http://127.0.0.1:${PORT}`);
});

app.get('/', function (req, res, next) {
    res.sendFile(path.join(path.resolve(), '/ex07_page.html'));
});

/**
 * Led ON/OFF/INV Control
 */
app.get('/led/:id/:action', function (req, res, next) {
    const id = req.params.id;
    const action = req.params.action;
    console.log(req.params);
    const status = mcu.ledCtrl(req.params.id, req.params.action).then(status => {
        res.json({
            "target": "led",
            "id": id,
            "action": action,
            "status": status ? "success" : "failed",
            "update": `${getDateTime()}`
        })
    });
});


/**
 * LED Flash Control
 */
app.get('/fls/:id/:interval', function (req, res, next) {
    const id = req.params.id;
    const action = req.params.action;
    const status = mcu.ledFls(req.params.id, req.params.action).then(status => {
        res.json({
            "target": "fls",
            "id": id,
            "action": action,
            "status": status ? "success" : "failed",
            "update": `${getDateTime()}`
        })
    });
});



const getDateTime = () => {
    const zp = (v) => v<10 ? `0${v}` : `${v}`;
    const d = new Date();
    const date = `${d.getFullYear()}-${zp(d.getMonth()+1)}-${zp(d.getDate())}`;
    const time = `${zp(d.getHours())}:${zp(d.getMinutes())}:${zp(d.getSeconds())}`;
    return `${date} ${time}`;
}