
export default class Utils {
    // constructor() {}
    public static getDate = () => {
        const zp = (v:number) => v<10 ? `0${v}` : `${v}`;
        const d = new Date();
        const date = `${d.getFullYear()}-${zp(d.getMonth()+1)}-${zp(d.getDate())}`;
        return date;
    }

    public static getTime = () => {
        const zp = (v:number) => v<10 ? `0${v}` : `${v}`;
        const d = new Date();
        const time = `${zp(d.getHours())}:${zp(d.getMinutes())}:${zp(d.getSeconds())}`;
        return time;
    }

    public static getDateTime = () => {
        const dateTime = `${Utils.getDate()} ${Utils.getTime()}`;
        return dateTime;
    }
}
