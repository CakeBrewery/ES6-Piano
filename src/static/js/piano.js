import { MusicalInstrument } from "./musical_instrument.js";

export class Piano extends MusicalInstrument {

    constructor(soundSource, tuning) {
        super(soundSource, tuning);

        this.clicking = false;
        this.jobs = new Map();
        this.pedalJobs = new Map();
    }

    playNote(note, velocity=1) {
        // If the note is already playing:
        // Simulate a real piano and "release" it before "hammering" it again.
        [this.jobs, this.pedalJobs].forEach((queue) => {
            if (queue.has(note)) {
                queue.get(note).stop();
                queue.delete(note);
            }
        })

        // Play the note
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

    enableMIDI() {
        if (!navigator.requestMIDIAccess) {
            return alert('Sorry, your browser does not support MIDI.');
        }

        let onMIDISuccess = (midiAccess) => {
            let inputs = midiAccess.inputs;

            for (let input of inputs.values()) {
                input.onmidimessage = getMIDIMessage.bind(this);
            }
        }

        let onMIDIFailure = () => {
            console.log('Trouble setting up MIDI...');
        }

        let getMIDIMessage = (midiMessage) => {
            console.log(`MIDI message received: ${midiMessage.data}`);

            let type = midiMessage.data[0];
            let key = midiMessage.data[1];
            let velocity = midiMessage.data[2] / 128;

            let a440Index = 69;

            // For higihling keys
            let notes = keyboard.querySelectorAll('.note');
            let a440Keyboard = Array.from(notes).findIndex( (elem) => elem.classList.contains('a440'));

            let keyboardNote = document.querySelector(`.note:nth-child(${key - (a440Index - a440Keyboard) + 1})`)

            let noteIndex = key - a440Index;

            switch(type) {
                case 144:  // Key press
                    let job = this.playNote(noteIndex, velocity);
                    this.jobs.set(noteIndex, job);
                    console.log(noteIndex - a440Keyboard + 1)
                    if (keyboardNote) (
                        keyboardNote.classList.add('active')
                    )
                    break
                case 128:  // Key release
                    if (this.jobs.has(noteIndex)) {
                        if (this.pedal > 0) {
                            this.pedalJobs.set(noteIndex, this.jobs.get(noteIndex));
                            this.jobs.delete(noteIndex);
                        } else {
                            this.jobs.get(noteIndex).stop();
                            this.jobs.delete(noteIndex);
                        }
                    }
                    if (keyboardNote) (
                        keyboardNote.classList.remove('active')
                    )
                    
                    break;
                case 176:
                    this.pedal = velocity;

                    if (this.pedal == 0) {
                        this.pedalJobs.forEach((value, key) => {
                            value.stop();
                        })
                        this.pedalJobs.clear();
                    }
                    break;
            }
        }

        navigator.requestMIDIAccess().then(onMIDISuccess.bind(this), onMIDIFailure);

    }
}