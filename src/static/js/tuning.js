class Tuning {
    constructor() {
        this.baseFrequency = 440;  // In Hz. aka A 440
    }

    getFrequency(note) {
        return this.baseFrequency;  // tone-deaf, only returns one frequency. 
    }
}