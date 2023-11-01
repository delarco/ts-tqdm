type _tqdmInput = Array<any> | number;
type _tqdmIteratorResult<T> = T extends Array<infer Item> ? Item : number;

export class _tqdmIterator<T extends _tqdmInput> implements Iterator<any> {

    private index: number = 0;
    private done: boolean = false;
    private startTime = 0;
    private progressBarSize: number = 45;
    private values: Array<any>;

    constructor(init: T) {

        this.startTime = Date.now();

        if (Array.isArray(init)) {

            this.values = init;
        }
        else if (typeof (init) == "number") {

            this.values = [...new Array(init).keys()];
        }
        else {

            this.values = [];
        }
    }

    public next(): IteratorResult<_tqdmIteratorResult<T>, undefined> {

        if (this.done) return { done: this.done, value: undefined, };

        if (this.index === this.values.length) {

            this.done = true;
            process.stdout.write('\n');
            return { done: this.done, value: undefined, };
        }

        const value = this.values[this.index];
        this.render();
        this.index++;
        return { done: false, value, }
    }

    private formatTime(ms: number): string {

        let output = "";
        let sec = Math.trunc(ms / 1000);
        let min = Math.trunc(sec / 60);
        const hour = Math.trunc(min / 60);
        sec = sec - min * 60;
        min = min - hour * 60;

        if (hour > 0) output = hour.toString().padStart(2, '0') + ':';
        output += `${min.toString().padStart(2, '0')}:`;
        output += `${sec.toString().padStart(2, '0')}:`;

        return output;
    }

    private genProgressBar(percent: number): string {

        const progressBarValue = Math.trunc(this.progressBarSize * percent);
        const progress = ''.padStart(progressBarValue, '█');
        const placeholder = ''.padStart(this.progressBarSize - progressBarValue, ' ');
        return `|${progress}${placeholder}|`;
    }

    private render(): void {

        const counter = this.index + 1;
        const elapsedTime = Date.now() - this.startTime;

        let itemsPerSec = counter / (elapsedTime / 1000) || 0;
        if (itemsPerSec == Infinity) itemsPerSec = 0;

        const msPerItem = elapsedTime / counter;
        const timeLeft = (this.values.length - counter) * msPerItem;
        const percent = counter / this.values.length;

        const progressBarPart = this.genProgressBar(percent);
        const percentPart = (~~(percent * 100)).toString().padStart(3, ' ');
        const timePart = `${this.formatTime(elapsedTime)}<${this.formatTime(timeLeft)}`;
        const itemsPerSecPart = itemsPerSec.toFixed(2);

        process.stdout.write(`\x1b[0G${percentPart}%${progressBarPart} ${counter}/${this.values.length} [${timePart}, ${itemsPerSecPart}it/s]`);
    }
}

export class _tqdm<T extends _tqdmInput> {

    constructor(private init: T) { }

    [Symbol.iterator](): Iterator<_tqdmIteratorResult<T>, undefined> {

        return new _tqdmIterator(this.init);
    }
}

export function tqdm<T extends _tqdmInput>(init: T) {

    return new _tqdm(init);
}
