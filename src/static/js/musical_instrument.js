let MusicalInstrument = (function() {
    function playNote(note) {
        let frequency = Tuning.getFrequency(note);
        SoundSource.playFrequency(frequency);
    }

    return {
        playNote
    }
})();