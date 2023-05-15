import  colors from 'colors';
colors.enable();

export class Log {

    constructor(private tag: string) {
        this.tag = tag;
    }

    private wt = () => {
        process.stdout.write(`[${this.tag}] `.gray);   
    }

    public wr(message: string) {
        this.wt();
        process.stdout.write(`${message}`);
    }

    public wl(message: string) {
        this.wt();
        process.stdout.write(`${message}\n`);
    }

    public wc(message: string) {
        process.stdout.write(`${message}`);
    }
    public wn(message: string) {
        process.stdout.write(`${message}\n`);
    }
}
