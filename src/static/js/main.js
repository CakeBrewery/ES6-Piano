function main() {

    let soundSource = new SimpleSoundSource();
    let tuning = new ToneDeafTuning();
    let musicalInstrument = new MusicalInstrument(soundSource, tuning);

    document.querySelector('#play').addEventListener('click', function() {
        musicalInstrument.playNote('Any note');
    });
}

window.onload = main;