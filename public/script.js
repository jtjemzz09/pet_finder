document.getElementById('getAllPets').addEventListener('click', getAllPets);
document.getElementById('getPetByOwner').addEventListener('click', getPetByOwner);
document.getElementById('getPetByName').addEventListener('click', getPetByName);

function getAllPets() {
    fetch('/api/v1/pets')
        .then(response => response.json())
        .then(data => {
            displayResult(JSON.stringify(data, null, 2));
        })
        .catch(error => console.error('Error:', error));
}

function getPetByOwner() {
    const owner = prompt('Enter owner name:');
    if (owner) {
        fetch(`/api/v1/pets/owner?owner=${owner}`)
            .then(response => response.json())
            .then(data => {
                displayResult(JSON.stringify(data, null, 2));
            })
            .catch(error => console.error('Error:', error));
    }
}

function getPetByName() {
    const name = prompt('Enter pet name:');
    if (name) {
        fetch(`/api/v1/pets/${name}`)
            .then(response => response.json())
            .then(data => {
                displayResult(JSON.stringify(data, null, 2));
            })
            .catch(error => console.error('Error:', error));
    }
}

function displayResult(result) {
    document.getElementById('result').textContent = result;
}
