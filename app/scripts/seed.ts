
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create platforms
  const facebookPlatform = await prisma.platform.upsert({
    where: { name: 'facebook' },
    update: {},
    create: {
      name: 'facebook',
      displayName: 'Facebook Marketplace',
      baseUrl: 'https://www.facebook.com/marketplace',
      description: 'Primary platform with largest user base and AI auto-reply support',
      isActive: true,
    },
  });

  const craigslistPlatform = await prisma.platform.upsert({
    where: { name: 'craigslist' },
    update: {},
    create: {
      name: 'craigslist',
      displayName: 'Craigslist',
      baseUrl: 'https://losangeles.craigslist.org',
      description: 'Traditional classified ads platform',
      isActive: true,
    },
  });

  const offerupPlatform = await prisma.platform.upsert({
    where: { name: 'offerup' },
    update: {},
    create: {
      name: 'offerup',
      displayName: 'OfferUp',
      baseUrl: 'https://offerup.com',
      description: 'Mobile-focused marketplace',
      isActive: true,
    },
  });

  const rvforumsPlatform = await prisma.platform.upsert({
    where: { name: 'rvforums' },
    update: {},
    create: {
      name: 'rvforums',
      displayName: 'RV Forums',
      baseUrl: 'https://www.rvforum.net',
      description: 'Specialized RV and van life communities',
      isActive: true,
    },
  });

  // Create listing templates based on research strategy
  const facebookTemplate = await prisma.listingTemplate.create({
    data: {
      platformId: facebookPlatform.id,
      title: 'Brand New CNCUSA-HD-12L 12V DC Air Conditioner - 10,000 BTU for Van / RV / Off-Grid',
      description: `For sale is a brand new, in-box Cruise N Comfort USA HD-12L 12V DC mini-split air conditioner. This is a premium, heavy-duty 10,000 BTU system designed to run directly off batteries, perfect for van conversions, RVs, skoolies, boats, or any off-grid application. It is a professional-grade unit, not a cheap consumer model.

This unit was purchased for a project that has since changed direction. It has never been installed or used.

**Key Features:**
• **Operating Voltage:** 12V DC (10-15 VDC)
• **Cooling Capacity:** 10,000 BTU
• **Current Consumption:** 38-55 AMPS
• **Construction:** Stainless steel for harsh environments
• **System Type:** Split system with remote condenser for efficient and quiet operation

**Condition:** Brand new, in original packaging.
**Retail Price:** $4,398 + $175 shipping.
**My Price:** $4,200 FIRM. Price is not negotiable. Lowball offers will be ignored.

**Pickup:** Local pickup only in Mid-Wilshire, Los Angeles (90036). I cannot ship or deliver. You will need a vehicle capable of transporting the components (Evaporator Weight: ~69 lbs).

**Please Note:** This system requires professional installation, including evacuation and charging with standard automotive R134a refrigerant. This is not a DIY plug-and-play unit.

If the listing is active, the item is still available. Serious inquiries only.`,
      price: 4200.00,
      tags: ['12v', 'air conditioner', 'van life', 'RV', 'off-grid', 'CNCUSA', 'mini-split'],
    },
  });

  const craigslistTemplate = await prisma.listingTemplate.create({
    data: {
      platformId: craigslistPlatform.id,
      title: 'CNCUSA HD-12L 12V DC Mini-Split AC - New in Box - Van/RV/Off-Grid - $4200',
      description: `BRAND NEW CNCUSA-HD-12L 12V DC MINI-SPLIT AIR CONDITIONER
10,000 BTU Professional Grade System

Perfect for:
- Van conversions
- RVs and Skoolies  
- Boats
- Off-grid applications
- Mobile power systems

SPECIFICATIONS:
- 12V DC Operation (10-15 VDC)
- 10,000 BTU cooling capacity
- 38-55 AMP current draw
- Stainless steel construction
- Split system design

CONDITION: Brand new, never installed, original packaging
RETAIL: $4,398 + $175 shipping = $4,573 total
MY PRICE: $4,200 FIRM (Save $373!)

PICKUP ONLY: Mid-Wilshire, LA (90036)
PAYMENT: Cash, Venmo, or Zelle
NO CHECKS, NO TRADES, NO SHIPPING

Professional installation required (evacuation & R134a charge)

Serious buyers only - this is not a toy AC unit!`,
      price: 4200.00,
      tags: ['12v ac', 'mini split', 'van life', 'rv', 'off grid', 'new'],
    },
  });

  const offerupTemplate = await prisma.listingTemplate.create({
    data: {
      platformId: offerupPlatform.id,
      title: 'NEW CNCUSA 12V DC Air Conditioner - Van/RV - $4200 FIRM',
      description: `🆕 BRAND NEW CNCUSA-HD-12L 12V DC Mini-Split AC

✅ 10,000 BTU Professional Grade
✅ Direct 12V DC Operation  
✅ Perfect for Van Life/RV/Off-Grid
✅ Stainless Steel Construction
✅ Never Used - In Original Box

💰 RETAIL: $4,573 (with shipping)
💰 MY PRICE: $4,200 FIRM

📍 PICKUP: Mid-Wilshire, LA
💵 PAYMENT: Cash/Venmo/Zelle Only

⚠️ Professional installation required
⚠️ No shipping, no trades, no lowballs

Perfect for battery-powered cooling systems!`,
      price: 4200.00,
      tags: ['air conditioner', 'van life', 'rv', '12v', 'off-grid'],
    },
  });

  const rvforumsTemplate = await prisma.listingTemplate.create({
    data: {
      platformId: rvforumsPlatform.id,
      title: '[FS] CNCUSA HD-12L 12V DC Mini-Split - Perfect for Battery Systems',
      description: `Fellow RVers and Van Lifers,

For sale: Brand new CNCUSA-HD-12L 12V DC mini-split air conditioner. This is the real deal - a professional-grade 12V system that runs directly off your house batteries without needing an inverter.

**Why I'm selling:** Project changed direction, never got to install it.

**Specs that matter:**
- True 12V DC operation (10-15 VDC range)
- 10,000 BTU cooling capacity
- 38-55 AMP draw (manageable with decent battery bank)
- Stainless steel components for longevity
- Split system = quieter operation

**What this means for your setup:**
- No inverter losses (90%+ efficiency vs 80-85% with inverter)
- Lower amp draw than comparable inverter + 120V AC units  
- Designed for harsh mobile environments
- Professional automotive-style refrigerant system (R134a)

**Price:** $4,200 firm (retail is $4,398 + $175 shipping)
**Location:** Mid-Wilshire, Los Angeles - pickup only
**Condition:** New in box, never installed

This isn't a cheap Amazon unit. It's made in USA by Cruise N Comfort, same quality as their marine systems. Requires professional installation (evacuation & R134a charge).

PM me if you're serious and local to LA area.`,
      price: 4200.00,
      tags: ['12v', 'dc', 'air conditioning', 'van life', 'rv', 'boondocking'],
    },
  });

  // Create auto-response templates based on research strategy
  const autoResponses = [
    {
      name: 'Initial Availability Response',
      trigger: 'is this still available',
      category: 'AVAILABILITY' as const,
      response: `Hello! Yes, the brand new CNCUSA-HD-12L air conditioner is still available. The price is firm at $4,200, and it is for local pickup only in Mid-Wilshire, Los Angeles. This is a professional-grade 12V DC unit that requires professional installation. Have you reviewed the full description and do you have any specific questions about the unit's specifications?`,
      priority: 10,
    },
    {
      name: 'Price Qualification',
      trigger: 'price',
      category: 'PRICING' as const,
      response: `The price is $4,200 FIRM and non-negotiable. This is already discounted from the retail price of $4,398 + $175 shipping ($4,573 total). To confirm, are you able to pick up the unit in Mid-Wilshire this week and do you agree to the firm price of $4,200?`,
      priority: 9,
    },
    {
      name: 'Specifications Response',
      trigger: 'specs|specifications|voltage|amps|btu',
      category: 'SPECIFICATIONS' as const,
      response: `Here are the key specifications:
• 12V DC operation (10-15 VDC range)
• 10,000 BTU cooling capacity  
• 38-55 AMP current draw
• Split system design (indoor/outdoor units)
• Stainless steel construction
• Requires professional installation with R134a refrigerant

This is designed for van life, RV, and off-grid applications. Do you have questions about compatibility with your specific setup?`,
      priority: 8,
    },
    {
      name: 'Pickup Logistics',
      trigger: 'pickup|location|where',
      category: 'LOGISTICS' as const,
      response: `Pickup location is Mid-Wilshire, Los Angeles (90036 area). This is local pickup ONLY - I cannot ship or deliver. The evaporator unit weighs about 69 lbs, so you'll need a vehicle that can transport it. Cash, Venmo, or Zelle payment accepted on pickup. When would work for you this week?`,
      priority: 7,
    },
    {
      name: 'Serious Buyer Qualification',
      trigger: 'interested|buy|purchase',
      category: 'QUALIFICATION' as const,
      response: `Great to hear you're interested! To confirm you're ready to move forward: 
1. Can you pick up in Mid-Wilshire, LA this week?
2. Do you agree to the firm price of $4,200?
3. Do you have cash, Venmo, or Zelle for payment?
4. Do you understand this requires professional installation?

If yes to all, we can schedule a pickup time.`,
      priority: 6,
    },
  ];

  for (const response of autoResponses) {
    await prisma.autoResponseTemplate.create({ data: response });
  }

  // Create negotiation templates
  const negotiationTemplates = [
    {
      name: 'Firm Price Response',
      scenario: 'Price negotiation attempt',
      script: `I understand you'd like to negotiate, but the price is firm at $4,200. This is already a significant discount from retail ($4,573 with shipping). The unit is brand new and this pricing reflects its value. If you're ready to proceed at $4,200, I'm happy to schedule pickup. Otherwise, I completely understand if it's outside your budget.`,
      minPrice: 4200.00,
      maxDiscount: 0.00,
    },
    {
      name: 'Week 3 Conditional Discount',
      scenario: 'After 3 weeks if no sale',
      script: `I appreciate your interest. After careful consideration, I could come down to $4,000 for a quick sale this week. This is absolutely my final price and the unit must be picked up within 48 hours. Are you able to commit to pickup and payment at $4,000?`,
      minPrice: 4000.00,
      maxDiscount: 200.00,
    },
    {
      name: 'Bundle Value Emphasis',
      scenario: 'Competing with cheaper alternatives',
      script: `I understand there are cheaper options available, but this CNCUSA unit is in a different league. It's American-made, stainless steel construction, designed for harsh environments, and comes with full manufacturer support. The $4,200 price reflects professional-grade quality that will last for years. Would you like references from van builders who use these systems?`,
      minPrice: 4200.00,
      maxDiscount: 0.00,
    },
  ];

  for (const template of negotiationTemplates) {
    await prisma.negotiationTemplate.create({ data: template });
  }

  // Create initial price history
  await prisma.priceHistory.create({
    data: {
      price: 4200.00,
      reason: 'Initial asking price based on market analysis',
    },
  });

  // Create settings
  await prisma.settings.create({
    data: {
      autoResponseEnabled: true,
      firmPrice: 4200.00,
      minPrice: 4000.00,
      location: 'Mid-Wilshire, Los Angeles (90036)',
      contactEmail: null,
      contactPhone: null,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
