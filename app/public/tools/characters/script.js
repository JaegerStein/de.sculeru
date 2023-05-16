function saveCharacter() {
    const name = document.getElementById('name').value;
    const characterClass = document.getElementById('class').value;
    const level = document.getElementById('level').value;
    const race = document.getElementById('race').value;
    const hp = document.getElementById('hp').value;

    const characterData = {
        name,
        class: characterClass,
        level,
        race,
        hp
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(characterData));
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', dataStr);
    downloadLink.setAttribute('download', `${name}.json`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function loadCharacter() {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.addEventListener('change', handleFile, false);
    fileInput.click();

    function handleFile(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const contents = e.target.result;
            const characterData = JSON.parse(contents);

            document.getElementById('name').value = characterData.name;
            document.getElementById('class').value = characterData.class;
            document.getElementById('level').value = characterData.level;
            document.getElementById('race').value = characterData.race;
            document.getElementById('hp').value = characterData.hp;
        }
        reader.readAsText(file);
    }
}
