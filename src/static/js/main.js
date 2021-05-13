import { SimpleSoundSource } from './simple_sound_source.js'
import { Piano } from './piano.js'
import { EquallyTemperedTuning } from './equally_tempered_tuning.js';


function main() {
    let soundSource = new SimpleSoundSource();
    let tuning = new EquallyTemperedTuning();
    let piano = new Piano(soundSource, tuning);

    piano.mountKeyboard(document.querySelector('#keyboard'));
}

window.onload = main;