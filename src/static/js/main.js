function main() {
    document.querySelector('#play').addEventListener('click', function() {
        MusicalInstrument.playNote('Any note');
    });
}

window.onload = main;