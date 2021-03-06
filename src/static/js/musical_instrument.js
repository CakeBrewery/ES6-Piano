export class MusicalInstrument {
    constructor(soundSource, tuning) {
        this.soundSource = soundSource;
        this.tuning = tuning;
    }

    playNote(note) {
        let frequency = this.tuning.getFrequency(note);
        return this.soundSource.playFrequency(frequency);
    }
}