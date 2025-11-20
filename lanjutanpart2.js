function Pemain(nama, energi) {
    this.nama = nama;
    this.energi = energi;

    // method makan
    this.makan = function (porsi) {
        this.energi += porsi;
        updateDisplay();
    }

    // method damage
    this.damage = function (attack) {
        this.energi -= attack;
        updateDisplay();
    }

    // energi otomatis nambah setiap 5 detik
    setInterval(() => {
    this.energi++;
    updateDisplay();
}, 1000);

}

// Membuat pemain
let pemain1 = new Pemain('Andi', 10);
let pemain2 = new Pemain('Donny', 11);

// Menampilkan ke HTML
function updateDisplay() {
    const game = document.getElementById("game");

    game.innerHTML = `
        ${createPlayerCard(pemain1)}
        ${createPlayerCard(pemain2)}
    `;
}

// Template tampilan 1 pemain
function createPlayerCard(pemain) {
    return `
        <div class="player-box">
            <h3>${pemain.nama}</h3>

            <p>Energi: ${pemain.energi}</p>

            <div class="energy-bar">
                <div class="energy-fill" style="width: ${pemain.energi * 10}px"></div>
            </div>

            <button class="btn-makan" onclick="${pemain.nama.toLowerCase()}.makan(2)">
                Makan (+2)
            </button>

            <button class="btn-damage" onclick="${pemain.nama.toLowerCase()}.damage(3)">
                Damage (-3)
            </button>
        </div>
    `;
}

// pertama kali tampil
updateDisplay();
