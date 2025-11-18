export class Filter {
    constructor(delay = 1000) {  
        this.delay = delay;
        this.times = {};  
    }

    allow(key) {
        const now = Date.now();  
        if (this.times[key]) {
            const delta = now - this.times[key];
            if (delta < this.delay) {
                return false;  
            }
        }
        this.times[key] = now;
        return true;
    }
}
