import { MusicalInstrument } from "./musical_instrument.js";

export class Piano extends MusicalInstrument {

    constructor(soundSource, tuning) {
        super(soundSource, tuning);
    }

    mountKeyboard(keyboard) {
        let notes = keyboard.querySelectorAll('.note');
        let a440 = Array.from(notes).findIndex((note) => {
            return note.classList.contains('a440');
        });

        notes.forEach((note, i) => {
            note.addEventListener('click', () => {
                this.playNote(i - a440);
            });
        });
    }
}