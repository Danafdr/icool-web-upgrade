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

async function fetchAll() {
    let allClients = [];
    let seenNames = new Set();
    
    for (const url of urls) {
        try {
            console.log('Fetching', url);
            const res = await fetch(url);
            const html = await res.text();
            
            const categoryMatch = url.match(/\/projek-ac\/([^\/]+)\//);
            const category = categoryMatch ? categoryMatch[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Lain Lain';
            
            // Look for <h3 class="oxi-image-hover-heading ...">Name</h3>
            // And <img src="..."> before it.
            const regex = /<img[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?<h3 class="oxi-image-hover-heading[^>]*>(.*?)<\/h3>/g;
            
            let match;
            while ((match = regex.exec(html)) !== null) {
                let img = match[1];
                let name = match[2].trim();
                
                // Exclude some bad matches if any
                if (!img.includes('logo-icool') && !seenNames.has(name.toLowerCase())) {
                    seenNames.add(name.toLowerCase());
                    allClients.push({
                        name,
                        image: img,
                        category
                    });
                }
            }
        } catch (e) {
            console.error('Error fetching', url, e.message);
        }
    }
    
    fs.writeFileSync('extracted_clients.json', JSON.stringify(allClients, null, 2));
    console.log(`Saved ${allClients.length} clients.`);
}

fetchAll();
