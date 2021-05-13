function main() {

    let soundSource = new SoundSource()
    let tuning = new Tuning()
    let musicalInstrument = new MusicalInstrument(soundSource, tuning);

    document.querySelector('#play').addEventListener('click', function() {
        musicalInstrument.playNote('Any note');
    });
}

window.onload = main;