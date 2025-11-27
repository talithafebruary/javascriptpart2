// === LOAD AUDIO ===
const soundAttack = new Audio("audio/attack.mp3");
const soundEat = new Audio("audio/eat.mp3");

function playOnce(sound) {
    const sfx = sound.cloneNode(true);
    sfx.currentTime = 0;
    sfx.play();

    sfx.addEventListener("ended", () => {
        sfx.pause();
        sfx.remove();
    });
}

function Pemain(nama, energi) {
    this.nama = nama;
    this.energi = energi;
    this.maxEnergi = 100;

    this.inventory = {
        senjata: [
            { nama: "Pedang Laser", damage: 5 },
            { nama: "Pisau Petir", damage: 3 }
        ],
        makanan: [
            { nama: "Nasi Goreng", heal: 6 },
            { nama: "Kebab", heal: 4 }
        ]
    };

    this.makan = function(i) {
        let food = this.inventory.makanan[i];
        if (!food) return;
        this.energi = Math.min(this.energi + food.heal, this.maxEnergi);

        // 🎧 BUNYI MAKAN — BENAR
        playOnce(soundEat);

        updateDisplay();
    };

    this.attack = function(i, target) {
        let weapon = this.inventory.senjata[i];
        if (!weapon) return;
        target.energi -= weapon.damage;
        if (target.energi < 0) target.energi = 0;

        // 🔥 BUNYI SERANG — BENAR
        playOnce(soundAttack);

        shakeEffect(target.nama);
        explosionEffect(target.nama);
        updateDisplay();
    };
}

window.Andi = new Pemain("Andi", 60);
window.Donny = new Pemain("Donny", 50);

function createPlayerCard(p) {
    let persen = (p.energi / p.maxEnergi) * 100;

    return `
        <div class="player-box" id="${p.nama}">
            <h3>${p.nama}</h3>
            <p>Energi: ${p.energi}</p>

            <div class="energy-bar">
                <div class="energy-fill" style="width:${persen}%"></div>
            </div>

            <h4>🍗 Makanan</h4>
            ${p.inventory.makanan.map((m, i) =>
                `<button onclick="${p.nama}.makan(${i})">${m.nama} (+${m.heal})</button>`
            ).join("")}

            <h4>🔪 Senjata</h4>
            ${p.inventory.senjata.map((s, i) =>
                `<button onclick="${p.nama}.attack(${i}, ${p === Andi ? 'Donny' : 'Andi'})">${s.nama} (-${s.damage})</button>`
            ).join("")}
        </div>
    `;
}

function updateDisplay() {
    document.getElementById("game").innerHTML =
        createPlayerCard(Andi) +
        createPlayerCard(Donny);
}

function shakeEffect(id) {
    let el = document.getElementById(id);
    el.classList.add("shake");
    setTimeout(() => el.classList.remove("shake"), 400);
}

function explosionEffect(id) {
    let box = document.getElementById(id);
    let boom = document.createElement("div");
    boom.classList.add("hit-effect");
    box.appendChild(boom);
    setTimeout(() => boom.remove(), 400);
}

updateDisplay();
