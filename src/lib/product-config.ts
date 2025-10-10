/**
 * Product Configuration System
 * Allows dynamic product data instead of hardcoded air conditioner
 */

export interface ProductConfig {
  id: string;
  name: string;
  category: string;
  model: string;
  brand: string;
  fullName: string;
  condition: 'new' | 'used' | 'refurbished';
  specs: Record<string, string>;
  pricing: {
    retailPrice: number;
    askingPrice: number;
    savings: number;
    savingsPercentage: number;
  };
  location: {
    area: string;
    zipCode: string;
    pickupOnly: boolean;
  };
  features: string[];
  targetAudience: string[];
  images: Record<string, string>;
  listingTemplates: Record<string, {
    title: string;
    description: string;
    tags: string[];
  }>;
}

// Predefined product configurations
export const productConfigs: Record<string, ProductConfig> = {
  'air-conditioner': {
    id: 'ac-001',
    name: 'Air Conditioner',
    category: 'HVAC',
    model: 'CNCUSA-HD-12L',
    brand: 'Cruise N Comfort USA',
    fullName: 'CNCUSA-HD-12L 12V DC Mini-Split Air Conditioner',
    condition: 'new',
    specs: {
      coolingCapacity: '10,000 BTU/hr',
      voltage: '12V DC (10-15 VDC operating range)',
      currentDraw: '38-55 AMPS',
      systemType: 'Split system with remote condenser',
      construction: 'Stainless steel for harsh environments',
      refrigerant: 'R134a (requires professional charging)',
      weight: '~69 lbs',
      applications: 'Van conversions, RVs, Boats, Off-grid applications, Skoolies, Tiny homes'
    },
    pricing: {
      retailPrice: 4398,
      askingPrice: 4200,
      savings: 372.50,
      savingsPercentage: 8.2
    },
    location: {
      area: 'Mid-Wilshire, Los Angeles',
      zipCode: '90036',
      pickupOnly: true
    },
    features: [
      'No inverter required - direct 12V DC operation',
      'Professional-grade construction for harsh environments',
      'Split system design for quiet operation',
      'Perfect for battery-powered systems',
      'Compatible with solar charging systems',
      'American-made quality and support',
      'Heavy-duty stainless steel components'
    ],
    targetAudience: [
      'Van life enthusiasts',
      'RV owners and builders',
      'Off-grid living enthusiasts',
      'Boat/marine applications',
      'Custom vehicle builders',
      'Overland vehicle outfitters',
      'Solar power system users'
    ],
    images: {
      mainUnit: '/images/ac-main-unit.png',
      systemOverview: '/images/ac-system-overview.jpeg',
      installation: '/images/ac-installation.jpeg',
      evaporator: '/images/ac-evaporator.jpg',
      remote: '/images/ac-remote.jpeg'
    },
    listingTemplates: {
      facebook: {
        title: 'Brand New CNCUSA-HD-12L 12V DC Air Conditioner - 10,000 BTU for Van / RV / Off-Grid',
        description: `For sale is a brand new, in-box Cruise N Comfort USA HD-12L 12V DC mini-split air conditioner. This is a premium, heavy-duty 10,000 BTU system designed to run directly off batteries, perfect for van conversions, RVs, skoolies, boats, or any off-grid application.

**Key Features:**
• Operating Voltage: 12V DC (10-15 VDC)
• Cooling Capacity: 10,000 BTU
• Current Consumption: 38-55 AMPS  
• Construction: Stainless steel for harsh environments
• System Type: Split system with remote condenser

**Condition:** Brand new, in original packaging.
**Retail Price:** $4,398 + $175 shipping.
**My Price:** $4,200 FIRM. Price is not negotiable.

**Pickup:** Local pickup only in Mid-Wilshire, Los Angeles (90036).

**Please Note:** This system requires professional installation, including evacuation and charging with standard automotive R134a refrigerant.`,
        tags: ['12v', 'air conditioner', 'van life', 'RV', 'off-grid', 'mini split', 'cruise n comfort']
      },
      offerup: {
        title: '12V DC Air Conditioner - 10,000 BTU - Van/RV/Off-Grid - $4200',
        description: `Brand new CNCUSA-HD-12L 12V DC mini-split air conditioner. Perfect for van conversions, RVs, boats, or off-grid applications.

• 10,000 BTU cooling capacity
• 12V DC operation (no inverter needed)
• Stainless steel construction
• Split system design
• Professional installation required

Retail: $4,398 + shipping
My price: $4,200 FIRM

Local pickup only in Mid-Wilshire, LA (90036)`,
        tags: ['12V', 'AC', 'van', 'RV', 'off-grid', 'new']
      },
      craigslist: {
        title: 'Brand New CNCUSA-HD-12L 12V DC Air Conditioner - $4200 (Mid-Wilshire)',
        description: `BRAND NEW CRUISE N COMFORT USA HD-12L 12V DC MINI-SPLIT AIR CONDITIONER

Selling a brand new, still-in-box professional-grade 12V DC air conditioning system. Perfect for van conversions, RVs, boats, or any off-grid application requiring efficient cooling.

SPECIFICATIONS:
- Model: CNCUSA-HD-12L
- Cooling Capacity: 10,000 BTU
- Power: 12V DC (10-15 VDC operating range)
- Current Draw: 38-55 AMPS
- System: Split system with remote condenser
- Construction: Heavy-duty stainless steel
- Weight: Evaporator ~69 lbs

CONDITION: Brand new, never installed, original packaging

PRICING:
- Retail Price: $4,398.00
- MY PRICE: $4,200.00 FIRM (Save $372.50!)

LOCATION: Mid-Wilshire, Los Angeles (90036)
PICKUP ONLY - Cannot ship or deliver

IMPORTANT NOTES:
- Professional installation required
- Requires evacuation and R134a refrigerant charging
- Not a plug-and-play consumer unit
- Serious inquiries only`,
        tags: ['12v air conditioner', 'van life', 'RV', 'off-grid', 'mini split', 'new']
      }
    }
  },
  'car': {
    id: 'car-001',
    name: 'Car',
    category: 'Automotive',
    model: 'Honda Civic',
    brand: 'Honda',
    fullName: '2019 Honda Civic LX Sedan',
    condition: 'used',
    specs: {
      year: '2019',
      make: 'Honda',
      model: 'Civic LX',
      bodyStyle: 'Sedan',
      engine: '1.5L 4-Cylinder Turbo',
      transmission: 'CVT Automatic',
      mileage: '45,000 miles',
      fuelType: 'Gasoline',
      drivetrain: 'Front-Wheel Drive',
      exteriorColor: 'Silver',
      interiorColor: 'Black'
    },
    pricing: {
      retailPrice: 18500,
      askingPrice: 16500,
      savings: 2000,
      savingsPercentage: 10.8
    },
    location: {
      area: 'Mid-Wilshire, Los Angeles',
      zipCode: '90036',
      pickupOnly: false
    },
    features: [
      'Low mileage - only 45,000 miles',
      'Single owner vehicle',
      'Regular maintenance records available',
      'No accidents reported',
      'Clean CarFax report',
      'Excellent fuel economy',
      'Reliable Honda engineering',
      'Well-maintained interior and exterior'
    ],
    targetAudience: [
      'First-time car buyers',
      'Commuter drivers',
      'Students',
      'Small families',
      'Budget-conscious buyers',
      'Honda enthusiasts',
      'Reliability-focused buyers'
    ],
    images: {
      mainUnit: '/images/car-main.jpg',
      systemOverview: '/images/car-exterior.jpg',
      installation: '/images/car-interior.jpg',
      evaporator: '/images/car-engine.jpg',
      remote: '/images/car-dashboard.jpg'
    },
    listingTemplates: {
      facebook: {
        title: '2019 Honda Civic LX Sedan - 45K Miles - $16,500 (Mid-Wilshire)',
        description: `For sale is a well-maintained 2019 Honda Civic LX Sedan with only 45,000 miles. This is a single-owner vehicle with a clean CarFax report and regular maintenance records.

**Vehicle Details:**
• Year: 2019
• Make/Model: Honda Civic LX Sedan
• Mileage: 45,000 miles
• Engine: 1.5L 4-Cylinder Turbo
• Transmission: CVT Automatic
• Exterior: Silver
• Interior: Black
• Drivetrain: Front-Wheel Drive

**Condition:** Excellent - no accidents, regular maintenance
**KBB Value:** ~$18,500
**My Price:** $16,500 (Save $2,000!)

**Location:** Mid-Wilshire, Los Angeles (90036)
**Contact:** Serious buyers only, no lowball offers

Perfect for commuters, students, or anyone looking for a reliable, fuel-efficient vehicle.`,
        tags: ['honda', 'civic', 'sedan', '2019', 'low mileage', 'clean carfax', 'single owner']
      },
      offerup: {
        title: '2019 Honda Civic LX - 45K Miles - $16,500',
        description: `2019 Honda Civic LX Sedan
• 45,000 miles
• Single owner
• Clean CarFax
• Regular maintenance
• No accidents
• Silver exterior, black interior
• 1.5L Turbo engine
• CVT transmission

KBB: $18,500
My price: $16,500

Mid-Wilshire, LA`,
        tags: ['honda', 'civic', '2019', 'sedan', 'clean']
      },
      craigslist: {
        title: '2019 Honda Civic LX Sedan - 45K Miles - $16,500 (Mid-Wilshire)',
        description: `2019 HONDA CIVIC LX SEDAN - EXCELLENT CONDITION

Selling my well-maintained 2019 Honda Civic LX Sedan. Single owner vehicle with clean CarFax report and regular maintenance records.

VEHICLE SPECIFICATIONS:
- Year: 2019
- Make/Model: Honda Civic LX Sedan
- Mileage: 45,000 miles
- Engine: 1.5L 4-Cylinder Turbo
- Transmission: CVT Automatic
- Exterior Color: Silver
- Interior Color: Black
- Drivetrain: Front-Wheel Drive
- Fuel Type: Gasoline

CONDITION:
- No accidents reported
- Regular maintenance performed
- Clean CarFax report available
- Single owner vehicle
- Well-maintained interior and exterior

PRICING:
- KBB Value: ~$18,500
- My Price: $16,500 (Save $2,000!)

LOCATION: Mid-Wilshire, Los Angeles (90036)

Perfect for commuters, students, or anyone looking for a reliable, fuel-efficient vehicle. Serious buyers only.`,
        tags: ['honda civic', '2019', 'sedan', 'low mileage', 'clean carfax', 'single owner']
      }
    }
  }
};

// Current product selection (can be changed by user)
let currentProductId = 'air-conditioner';

export const getCurrentProduct = (): ProductConfig => {
  return productConfigs[currentProductId] || productConfigs['air-conditioner'];
};

export const setCurrentProduct = (productId: string): void => {
  if (productConfigs[productId]) {
    currentProductId = productId;
  }
};

export const getAvailableProducts = (): string[] => {
  return Object.keys(productConfigs);
};

// Convert ProductConfig to the format expected by existing components
export const getProductData = () => {
  const config = getCurrentProduct();
  return {
    model: config.model,
    brand: config.brand,
    fullName: config.fullName,
    condition: config.condition,
    specs: config.specs,
    pricing: config.pricing,
    location: config.location,
    features: config.features,
    targetAudience: config.targetAudience,
    images: config.images
  };
};

export const getListingTemplates = () => {
  const config = getCurrentProduct();
  return config.listingTemplates;
};
