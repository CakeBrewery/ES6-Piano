class SimpleSoundSource extends SoundSource {
    constructor() {
        super();
        this.volume = 0.7;  // 70 %
    }

    playFrequency(frequency) {
        console.log('Playing frequency', frequency, 'with volume', this.volume);
    }
}