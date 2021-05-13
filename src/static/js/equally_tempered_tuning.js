import { Tuning } from "./tuning.js";

export class EquallyTemperedTuning extends Tuning {
    constructor() {
        super();
        this.baseFrequency = 440;  // In Hz.
    }
    getFrequency(note) {
        return this.baseFrequency * (Math.pow(2, note/12));
    }
}