const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'resources', 'js', 'data', 'clients.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const scopes = [
    "Instalasi & Maintenance VRV",
    "Kontrak Maintenance Tahunan",
    "Service & Perbaikan Rutin",
    "Pembersihan Besar & Overhaul",
    "Pengadaan Unit & Instalasi"
];

const stats = [
    "500+ Unit AC",
    "Seluruh Fasilitas",
    "Cabang Utama",
    "200+ Unit Split",
    "Sistem Chiller Sentral"
];

const updatedData = data.map((client, i) => {
    // Add stats to the first 20 clients or so to ensure the first few pages look great
    if (i < 20 || client.category === 'Featured') {
        return {
            ...client,
            scope: scopes[i % scopes.length],
            stats: stats[i % stats.length]
        };
    }
    return client;
});

fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 4));
console.log('Successfully updated clients.json with mock stats.');
