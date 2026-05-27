export interface CalculatorInput {
    area: string;
    serviceType: string;
    acType: string;
    pk: string;
    quantity: number;
}

export interface CalculatorOutput {
    hargaNormal: number;
    promoTier1: number;
    promoTier2: number;
    isBelowMinimumCharge: boolean;
}

export const PRICING_MATRIX: Record<string, Record<string, number>> = {
    "Split / Split Wall": { "Semua PK": 100000 },
    "Cassette": { "1.5 - 2.5 PK": 270000, "3 - 5 PK": 325000 },
    "Ceiling / Ceiling Suspended": { "2.5 PK": 270000, "3 - 5 PK": 325000 },
    "Ducted": { "3 - 5 PK": 325000, "6 - 8 PK": 565000, "10 - 12.5 PK": 700000, "> 15 PK": 935000 },
    "Floor Standing": { "3 - 5 PK": 330000, "6 - 8 PK": 465000, "10 - 12.5 PK": 550000, "> 15 PK": 700000 },
    "VRV": { "5 PK": 200000, "8 - 10 PK": 230000, "12 - 16 PK": 300000, "18 - 24 PK": 500000, "26 - 36 PK": 650000, "38 - 46 PK": 600000, "48 - 54 PK": 1000000 },
    "VRV Duct": { "1 - 3 PK": 185000, "8 - 10 PK": 325000 },
    "VRV Split Wall": { "1 - 1.5 PK": 140000 },
    "VRV Cassette": { "1 - 2.5 PK": 210000, "3 - 5 PK": 270000 },
    "Multi Split": { "1 - 1.5 PK": 180000, "2 - 2.5 PK": 200000, "3 - 5 PK": 230000 }
};

export function getAvailablePKs(acType: string): string[] {
    const acPricing = PRICING_MATRIX[acType];
    return acPricing ? Object.keys(acPricing) : [];
}

const MINIMUM_ON_CALL_CHARGE = 500000;

export function calculateServicePrice(input: CalculatorInput): CalculatorOutput {
    const { area, acType, pk, quantity } = input;
    
    // 1. Determine Base Unit Price
    let baseUnitPrice = 0;
    if (PRICING_MATRIX[acType] && PRICING_MATRIX[acType][pk]) {
        baseUnitPrice = PRICING_MATRIX[acType][pk];
    }
    
    // 2. Location Modifier
    if (area === 'Bali' && acType !== 'Split / Split Wall') {
        baseUnitPrice += 30000;
    }

    // 3. Calculate Raw Normal Price
    const finalHargaNormal = baseUnitPrice * quantity;
    let isBelowMinimumCharge = false;
  
    // 4. Minimum Charge Warning
    if (finalHargaNormal < MINIMUM_ON_CALL_CHARGE && quantity > 0) {
        isBelowMinimumCharge = true;
    }
  
    // 5. Promo Bundles
    const promoTier1Price = finalHargaNormal * 3; 
    const promoTier2Price = finalHargaNormal * 10;
  
    return {
        hargaNormal: finalHargaNormal,
        promoTier1: promoTier1Price,
        promoTier2: promoTier2Price,
        isBelowMinimumCharge
    };
}
  
export function formatIDR(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount).replace('Rp', 'Rp ');
}
