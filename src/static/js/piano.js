import { MusicalInstrument } from "./musical_instrument.js";

export class Piano extends MusicalInstrument {

    constructor(soundSource, tuning) {
        super(soundSource, tuning);

        this.clicking = false;
        this.jobs = new Map();
    }

    playNote(note, velocity=1) {
        if (this.jobs.has(note)) {
            this.jobs.get(note).stop();
            this.jobs.delete(note);
        }
        let frequency = this.tuning.getFrequency(note);
        return this.soundSource.playFrequency(frequency, velocity);
    }

    mountKeyboard(keyboard) {

        document.onmousedown = () => {
            this.clicking = true;
        }

        document.onmouseup = () => {
            this.clicking = false;
            this.jobs.forEach((value, key) => {
                value.stop();
            })
            this.jobs.clear();
            
            notes.forEach(note => {
                note.classList.remove('active');
            })
        }

        let notes = keyboard.querySelectorAll('.note');
        let a440 = Array.from(notes).findIndex((note) => {
            return note.classList.contains('a440');
        });

        notes.forEach((note, i) => {
            let noteIndex = i - a440;

            note.addEventListener('mousedown', ()=> {
                let job = this.playNote(noteIndex);
                this.jobs.set(noteIndex, job);
                note.classList.add('active');
            });

            note.addEventListener('mouseover', () => {
                if (this.clicking) {
                    let job = this.playNote(noteIndex);
                    this.jobs.set(noteIndex, job);
                    note.classList.add('active');
                }
            });

            note.addEventListener('mouseleave', ()=> {
                if (this.jobs.has(noteIndex)) {
                    this.jobs.get(noteIndex).stop();
                    this.jobs.delete(noteIndex);
                    note.classList.remove('active');
                }
            })
        });
    }
}