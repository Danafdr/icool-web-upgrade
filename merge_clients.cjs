const fs = require('fs');

const oldClients = [
    { name: "Astra Honda Motor", image: "https://mssgroup.co.id/wp-content/uploads/2020/07/ASTRA_page-0001.jpg" },
    { name: "Bali United F.C.", image: "https://mssgroup.co.id/wp-content/uploads/2020/07/BALI-UNITED_page-00011.jpg" },
    { name: "BCA", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/bca.jpg" },
    { name: "BIMC Hospital", image: "https://mssgroup.co.id/wp-content/uploads/2020/07/BIMC-2_page-0001.jpg" },
    { name: "Garuda Wisnu Kencana", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/gwk.jpg" },
    { name: "Intercontinental", image: "https://mssgroup.co.id/wp-content/uploads/2020/07/INTERCONTINENTAL_page-00011.jpg" },
    { name: "MNC Group", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/mnc.jpg" },
    { name: "Intiland", image: "https://mssgroup.co.id/wp-content/uploads/2020/07/INTILAND_page-0001.jpg" },
    { name: "CIMB Niaga", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/cimb.jpg" },
    { name: "Courtyard Marriot", image: "https://mssgroup.co.id/wp-content/uploads/2020/07/MARRIOT_page-0001.jpg" },
    { name: "Ciputra Hospital", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/ciputra-hospital.jpg" },
    { name: "Inaya Putri Bali", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/inaya.jpg" },
    { name: "Alfa Midi", image: "https://mssgroup.co.id/wp-content/uploads/2020/07/ALFA-MIDI_page-0001.jpg" },
    { name: "Indomaret", image: "https://mssgroup.co.id/wp-content/uploads/2020/07/INDOMARET_page-0001.jpg" },
    { name: "Gramedia", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/gramedia.jpg" },
    { name: "KPP Pratama", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/KPP.jpg" },
    { name: "Erha Clinic", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/erha.jpg" },
    { name: "Natasha Skin Clinic", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/natasha.jpg" },
    { name: "Kolega Coworking", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/kolega.jpg" },
    { name: "Chatime", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/chatime.jpg" },
    { name: "Bornga", image: "https://mssgroup.co.id/wp-content/uploads/2020/07/BORNGA_page-0001.jpg" },
    { name: "Coco Mart", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/cocomart.jpg" },
    { name: "Vivere Gallery", image: "https://mssgroup.co.id/wp-content/uploads/2020/09/vivere.jpg" }
];

let scrapedClients = JSON.parse(fs.readFileSync('clients.json', 'utf8'));

// Deduplicate map
let map = new Map();

function normalizeName(name) {
    let n = name.replace(/ 300x300/g, '').replace(/ 150x150/g, '').trim();
    // remove redundant prefix if it matches the category somehow, wait, let's keep it simple.
    return n;
}

function processName(c) {
    let n = normalizeName(c.name);
    // Remove "Toko Retail " from name etc.
    let catRegex = new RegExp('^' + c.category + ' ', 'i');
    if (catRegex.test(n)) {
        n = n.replace(catRegex, '');
    }
    return n;
}

for(let c of oldClients) {
    // Old clients go to "Featured" or maybe let's match them to categories later, but we can assign "Lain Lain" as default, or "Featured"
    map.set(normalizeName(c.name).toLowerCase(), {
        name: normalizeName(c.name),
        image: c.image,
        category: "Featured"
    });
}

for(let c of scrapedClients) {
    let cleanName = processName(c);
    let key = cleanName.toLowerCase();
    
    // Check if we already have a similar client in the old list (like BCA vs Bank BCA)
    let foundOld = false;
    for(let oldKey of map.keys()) {
        if(oldKey.includes(key) || key.includes(oldKey)) {
            // Merge into the old one, but update category from 'Featured' to actual category
            let existing = map.get(oldKey);
            existing.category = c.category;
            // update image to the new one if desired, but old one is fine.
            foundOld = true;
            break;
        }
    }
    
    if(!foundOld) {
        map.set(key, {
            name: cleanName,
            image: c.image,
            category: c.category
        });
    }
}

let finalClients = Array.from(map.values());
fs.writeFileSync('final_clients.json', JSON.stringify(finalClients, null, 4));
console.log('Merged down to ' + finalClients.length + ' clients.');
