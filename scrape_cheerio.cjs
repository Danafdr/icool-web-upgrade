const cheerio = require('cheerio');
const fs = require('fs');

const urls = [
    'https://icool.co.id/projek-ac/lain-lain/',
    'https://icool.co.id/projek-ac/toko-retail/',
    'https://icool.co.id/projek-ac/gedung-perkantoran/',
    'https://icool.co.id/projek-ac/bank-institusi-finansial/',
    'https://icool.co.id/projek-ac/rumah-sakit/',
    'https://icool.co.id/projek-ac/salon-klinik-kecantikan/',
    'https://icool.co.id/projek-ac/toko-serba-ada/',
    'https://icool.co.id/projek-ac/bengkel-dealershop/',
    'https://icool.co.id/projek-ac/kantor-pemerintahan/',
    'https://icool.co.id/projek-ac/sekolah-universitas/',
    'https://icool.co.id/projek-ac/restaurant-coffee-shop/',
    'https://icool.co.id/projek-ac/hotel-villa/',
    'https://icool.co.id/projek-ac/atraksi-wisata/',
    'https://icool.co.id/projek-ac/stadium-olahraga/',
    'https://icool.co.id/projek-ac/tempat-ibadah/'
];

async function run() {
    let all = [];
    let seen = new Set();
    for(let u of urls) {
        try {
            console.log('Fetching', u);
            let res = await fetch(u);
            let html = await res.text();
            let $ = cheerio.load(html);
            let categoryMatch = u.match(/projek-ac\/([^\/]+)/);
            if (!categoryMatch) continue;
            let category = categoryMatch[1].replace(/-/g, ' ');
            // capitalize each word
            category = category.replace(/\b\w/g, c => c.toUpperCase());
            
            // From my experience with WordPress shortcodes like Oxi Image Hover, it might be `.oxi-image-hover-figure` or similar.
            // Let's also look for generic images if that fails.
            let items = $('.oxi-image-hover');
            if (items.length === 0) items = $('.sow-image-grid-image');
            if (items.length === 0) items = $('figure');
            
            items.each((i, el) => {
                let img = $(el).find('img').attr('src');
                let name = $(el).find('.oxi-image-hover-heading, h3, .sow-image-grid-title, figcaption').text().trim();
                
                if (!name && img) {
                    // Try to extract name from URL if no heading
                    let parts = img.split('/');
                    name = parts[parts.length - 1].split('.')[0].replace(/-/g, ' ');
                    name = name.replace(/\b\w/g, c => c.toUpperCase());
                }
                
                if (img && name && !name.toLowerCase().includes('icool') && !seen.has(name.toLowerCase())) {
                    seen.add(name.toLowerCase());
                    all.push({name, image: img, category});
                }
            });
        } catch(e) {
            console.error(e.message);
        }
    }
    fs.writeFileSync('clients.json', JSON.stringify(all, null, 2));
    console.log('Saved ' + all.length + ' clients.');
}
run();
