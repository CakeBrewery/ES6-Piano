import { SoundSource } from './sound_source.js'

export class SimpleSoundSource extends SoundSource {
    constructor() {
        super();
        this.audioContext = new (window.AudioContext || window.webkitAudioContext);

        this.volume = this.audioContext.createGain();
        this.volume.gain.value = 0.7;  // 70%
        this.volume.connect(this.audioContext.destination);

        // Make sure signal doesn't clip. 
        this.compressor = this.audioContext.createDynamicsCompressor();
        this.compressor.ratio.value = 15;
        this.compressor.threshold.value = -20;
        this.compressor.connect(this.volume);
    }

    playFrequency(frequency, volume = 1) {
        console.log('Playing frequency', frequency, 'with volume', volume);

        let noteVolume = this.audioContext.createGain();
        noteVolume.gain.value = volume;
        noteVolume.connect(this.compressor);

        let oscillator = this.audioContext.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.value = frequency;
        oscillator.connect(noteVolume);

        oscillator.start();
        // oscillator.stop(this.audioContext.currentTime + 1);  // 1 second.
        return {
            stop() {
                oscillator.stop();
            }
        }
    }
}