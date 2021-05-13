function main() {

    document.querySelector('#play').addEventListener('click', function() {
        playNote('Any note');
    });
}

window.onload = main;