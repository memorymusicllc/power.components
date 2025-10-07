
export const productData = {
  // Core Product Information
  model: "CNCUSA-HD-12L",
  brand: "Cruise N Comfort USA", 
  fullName: "CNCUSA-HD-12L 12V DC Mini-Split Air Conditioner",
  condition: "Brand New in Box",
  
  // Specifications
  specs: {
    coolingCapacity: "10,000 BTU/hr",
    voltage: "12V DC (10-15 VDC operating range)",
    currentDraw: "38-55 AMPS",
    systemType: "Split system with remote condenser",
    construction: "Stainless steel for harsh environments",
    refrigerant: "R134a (requires professional charging)",
    evaporatorWeight: "~69 lbs",
    applications: ["Van conversions", "RVs", "Boats", "Off-grid applications", "Skoolies", "Tiny homes"]
  },

  // Pricing Information
  pricing: {
    retailPrice: 4398,
    shippingCost: 174.50,
    totalRetailCost: 4572.50,
    askingPrice: 4200,
    savings: 372.50,
    savingsPercentage: 8.2
  },

  // Location & Logistics
  location: {
    area: "Mid-Wilshire, Los Angeles",
    zipCode: "90036",
    pickupOnly: true,
    publicMeeting: true,
    preferredLocations: ["Police station parking lot", "Major retail center"]
  },

  // Key Features & Benefits
  features: [
    "No inverter required - direct 12V DC operation",
    "Professional-grade construction for harsh environments",
    "Split system design for quiet operation",
    "Perfect for battery-powered systems",
    "Compatible with solar charging systems",
    "American-made quality and support",
    "Heavy-duty stainless steel components"
  ],

  // Target Market
  targetAudience: [
    "Van life enthusiasts",
    "RV owners and builders",
    "Off-grid living enthusiasts", 
    "Boat/marine applications",
    "Custom vehicle builders",
    "Overland vehicle outfitters",
    "Solar power system users"
  ],

  // Images (local paths)
  images: {
    mainUnit: "/images/ac-main-unit.png",
    evaporator: "/images/ac-evaporator.jpg", 
    remote: "/images/ac-remote.jpeg",
    systemOverview: "/images/ac-system-overview.jpeg",
    installation: "/images/ac-installation.jpeg"
  },

  // CDN Images (for external use)
  cdnImages: [
    "https://cdn.abacus.ai/images/3b7343c7-b03d-48db-a4a3-6a51461282cc.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/AI_relation_to_Generative_Models_subset%2C_venn_diagram.png/250px-AI_relation_to_Generative_Models_subset%2C_venn_diagram.png", 
    "https://cdn.abacus.ai/images/6ee778f0-656e-4c76-9edc-ed815c607337.png",
    "https://cdn.abacus.ai/images/9e42feab-4007-4b64-968d-b9e657ac9a77.png",
    "https://cdn.abacus.ai/images/a74e761d-78cd-4657-9f11-6f79e4d0760d.png"
  ],

  // Sales Strategy Data
  strategy: {
    timeframe: 28, // days
    primaryPlatform: "Facebook Marketplace",
    secondaryPlatforms: ["OfferUp", "Craigslist", "RV Forums"],
    autoResponderActive: true,
    priceAdjustmentThreshold: 21, // days before considering price reduction
    fallbackPrice: 4000,
    firmPricing: true
  }
};

// Platform-specific listing templates
export const listingTemplates = {
  facebook: {
    title: "Brand New CNCUSA-HD-12L 12V DC Air Conditioner - 10,000 BTU for Van / RV / Off-Grid",
    description: `For sale is a brand new, in-box Cruise N Comfort USA HD-12L 12V DC mini-split air conditioner. This is a premium, heavy-duty 10,000 BTU system designed to run directly off batteries, perfect for van conversions, RVs, skoolies, boats, or any off-grid application. It is a professional-grade unit, not a cheap consumer model.

This unit was purchased for a project that has since changed direction. It has never been installed or used.

**Key Features:**
• Operating Voltage: 12V DC (10-15 VDC)
• Cooling Capacity: 10,000 BTU
• Current Consumption: 38-55 AMPS  
• Construction: Stainless steel for harsh environments
• System Type: Split system with remote condenser for efficient and quiet operation

**Condition:** Brand new, in original packaging.
**Retail Price:** $4,398 + $175 shipping.
**My Price:** $4,200 FIRM. Price is not negotiable. Lowball offers will be ignored.

**Pickup:** Local pickup only in Mid-Wilshire, Los Angeles (90036). I cannot ship or deliver. You will need a vehicle capable of transporting the components (Evaporator Weight: ~69 lbs).

**Please Note:** This system requires professional installation, including evacuation and charging with standard automotive R134a refrigerant. This is not a DIY plug-and-play unit.

If the listing is active, the item is still available. Serious inquiries only.`,
    tags: ["12v", "air conditioner", "van life", "RV", "off-grid", "mini split", "cruise n comfort"]
  },

  offerup: {
    title: "CNCUSA HD-12L 12V Air Conditioner - NEW - Van/RV/Off-Grid - $4200",
    description: `🔥 BRAND NEW Cruise N Comfort USA HD-12L 12V DC Mini-Split AC!

✅ 10,000 BTU cooling capacity
✅ Direct 12V operation (no inverter needed)
✅ Perfect for van life, RV, boat, off-grid
✅ Professional stainless steel construction
✅ Still in original packaging - never used

💰 RETAIL: $4,398 + shipping = $4,573 total
💰 MY PRICE: $4,200 FIRM (save $373!)

📍 PICKUP: Mid-Wilshire LA (90036) only
🚗 Need vehicle for transport (~69 lbs)
⚙️ Requires professional installation

Serious buyers only. No trades, no lowballs. If posted, it's available.

Perfect for:
- Van conversions
- RV upgrades  
- Boat cooling
- Off-grid cabins
- Solar-powered systems`,
    tags: ["12V", "AC", "van", "RV", "off-grid", "new"]
  },

  craigslist: {
    title: "Brand New CNCUSA-HD-12L 12V DC Air Conditioner - $4200 (Mid-Wilshire)",
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
- Shipping Cost: $174.50  
- Total Retail: $4,572.50
- MY PRICE: $4,200.00 FIRM (Save $372.50!)

LOCATION: Mid-Wilshire, Los Angeles (90036)
PICKUP ONLY - Cannot ship or deliver

IMPORTANT NOTES:
- Professional installation required
- Requires evacuation and R134a refrigerant charging
- Not a plug-and-play consumer unit
- Serious inquiries only
- No trades, no financing, no lowball offers

This is a premium American-made unit designed for harsh environments and continuous duty. Perfect for solar-powered systems and battery banks.

Contact with any technical questions. Cash or Zelle preferred.`,
    tags: ["12v air conditioner", "van life", "RV", "off-grid", "mini split", "new"]
  }
};

// Auto-responder templates
export const autoResponderTemplates = {
  initial: {
    trigger: ["is this still available", "available", "still for sale"],
    response: `Hello! Yes, the brand new CNCUSA-HD-12L air conditioner is still available. The price is firm at $4,200, and it is for local pickup only in Mid-Wilshire, Los Angeles. This is a professional-grade 12V DC unit that requires professional installation. Have you reviewed the full description and do you have any specific questions about the unit's specifications?`
  },
  
  qualification: {
    trigger: ["yes", "interested", "price ok", "pickup ok"],
    response: `Great! To confirm, are you able to pick up the unit in Mid-Wilshire this week and do you agree to the firm price of $4,200? If so, we can coordinate a time. Please note you'll need a vehicle capable of transporting the components (evaporator is about 69 lbs).`
  },

  technical: {
    trigger: ["specs", "specifications", "power", "amps", "btu"],
    response: `Here are the key specifications:
• 10,000 BTU cooling capacity
• 12V DC operation (10-15 VDC range)  
• Current draw: 38-55 AMPS
• Split system design
• Stainless steel construction
• Requires professional installation with R134a refrigerant
• Perfect for van/RV/boat/off-grid applications

Any other technical questions?`
  },

  lowball: {
    trigger: ["3000", "$3000", "lower", "negotiate", "best price", "2500", "$2500"],
    response: `Thanks for your interest, but the price is firm at $4,200. This is already $373 below retail cost and represents excellent value for a brand new professional-grade unit. No negotiations on price. Let me know if you'd like to proceed at the listed price.`
  },

  shipping: {
    trigger: ["ship", "delivery", "mail", "send"],
    response: `Sorry, this is local pickup only in Mid-Wilshire, Los Angeles (90036). Due to the size and weight of the unit, I cannot ship or deliver. You would need to arrange pickup with a suitable vehicle.`
  }
};
