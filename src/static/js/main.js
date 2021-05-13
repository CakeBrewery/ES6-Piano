import { SimpleSoundSource } from './simple_sound_source.js'
import { ToneDeafTuning } from './tone_deaf_tuning.js'
import { MusicalInstrument } from './musical_instrument.js'


function main() {

    let soundSource = new SimpleSoundSource();
    let tuning = new ToneDeafTuning();
    let musicalInstrument = new MusicalInstrument(soundSource, tuning);

    document.querySelector('#play').addEventListener('click', function() {
        musicalInstrument.playNote('Any note');
    });
}

window.onload = main;