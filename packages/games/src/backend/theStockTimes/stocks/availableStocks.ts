import { Stock } from "../theStockTimes";

export interface StockWithSymbol extends Stock {
  symbol: string;
}

export const AVAILABLE_STOCKS: StockWithSymbol[] = [
  {
    description:
      "BrightSun Solar Solutions specializes in advanced solar panel technologies and renewable energy solutions for a sustainable future.",
    history: [
      {
        lastUpdatedAt: new Date().toISOString(),
        price: 123.45
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "BSS",
    title: "BrightSun Solar Solutions"
  },
  {
    description:
      "CalmOcean Cruises provides luxury oceanic travel experiences, focusing on sustainability and relaxation for travelers.",
    history: [
      {
        lastUpdatedAt: new Date().toISOString(),
        price: 45.67
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "COC",
    title: "CalmOcean Cruises"
  },
  {
    description:
      "DarkForest Innovations develops cutting-edge AI-driven cybersecurity solutions inspired by nature's complexity.",
    history: [
      {
        lastUpdatedAt: new Date().toISOString(),
        price: 89.23
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "DFI",
    title: "DarkForest Innovations"
  },
  {
    description:
      "FreshBreeze Aromatics creates eco-friendly air fresheners and home fragrances with nature-inspired scents.",
    history: [
      {
        lastUpdatedAt: new Date().toISOString(),
        price: 21.34
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "FBA",
    title: "FreshBreeze Aromatics"
  },
  {
    description:
      "AncientRuins Expeditions offers archaeological tourism and immersive historical experiences for culture enthusiasts.",
    history: [
      {
        lastUpdatedAt: new Date().toISOString(),
        price: 15.89
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "ARE",
    title: "AncientRuins Expeditions"
  },
  {
    description:
      "PeacefulMeadow Retreats provides high-end wellness retreats in serene locations to promote relaxation and mental well-being.",
    history: [
      {
        lastUpdatedAt: new Date().toISOString(),
        price: 33.12
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "PMR",
    title: "PeacefulMeadow Retreats"
  },
  {
    description:
      "ColorfulRainbow Media is a leading content creator focused on diverse, family-friendly entertainment across multiple platforms.",
    history: [
      {
        lastUpdatedAt: new Date().toISOString(),
        price: 67.45
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "CRM",
    title: "ColorfulRainbow Media"
  },
  {
    description:
      "SparklingGem Jewels crafts bespoke, high-quality jewelry, incorporating ethically sourced gemstones and modern designs.",
    history: [
      {
        lastUpdatedAt: new Date().toISOString(),
        price: 54.76
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "SGJ",
    title: "SparklingGem Jewels"
  },
  {
    description:
      "GentleRiver Hydropower harnesses river energy to provide clean and reliable electricity for sustainable development.",
    history: [
      {
        lastUpdatedAt: new Date().toISOString(),
        price: 78.34
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "GRH",
    title: "GentleRiver Hydropower"
  },
  {
    description:
      "FierceStorm Technologies develops robust and scalable infrastructure solutions for businesses facing extreme data demands.",
    history: [
      {
        lastUpdatedAt: new Date().toISOString(),
        price: 142.56
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "FST",
    title: "FierceStorm Technologies"
  },
  {
    description:
      "Bright Futures Co. creates educational toys and learning platforms that promote joyful learning for children worldwide.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T12:00:00Z",
        price: 45.67
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "BFUT",
    title: "Bright Futures Co."
  },
  {
    description:
      "SwiftWings Inc. manufactures high-performance drones and cutting-edge bird-inspired robotics for aviation and research.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T12:00:00Z",
        price: 125.34
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "SWNG",
    title: "SwiftWings Inc."
  },
  {
    description:
      "Tranquil Reads Ltd. designs state-of-the-art silent library systems and serene reading environments for institutions.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T12:00:00Z",
        price: 78.9
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "TREAD",
    title: "Tranquil Reads Ltd."
  },
  {
    description:
      "Polished Earth Co. specializes in crafting premium stone-based home decor and construction materials with a sleek finish.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T12:00:00Z",
        price: 38.12
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "PLSH",
    title: "Polished Earth Co."
  },
  {
    description:
      "Skyline Growth Partners innovates in sustainable forestry, planting tall trees that balance profitability and environmental care.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T12:00:00Z",
        price: 112.45
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "SKLN",
    title: "Skyline Growth Partners"
  },
  {
    description:
      "Edge Precision Ltd. develops cutting-edge knives and surgical tools with unmatched sharpness and durability.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T12:00:00Z",
        price: 92.88
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "EDGP",
    title: "Edge Precision Ltd."
  },
  {
    description:
      "Valor Ventures invests in heroic startups and innovations that aim to change the world with bold ideas.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T12:00:00Z",
        price: 150.75
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "VALR",
    title: "Valor Ventures"
  },
  {
    description:
      "Polar Breezes Inc. delivers energy-efficient cooling systems inspired by the natural flow of cold winds.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T12:00:00Z",
        price: 65.22
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "PLRB",
    title: "Polar Breezes Inc."
  },
  {
    description:
      "CloudComfort Co. produces luxurious and ultra-soft blankets made from sustainable and eco-friendly materials.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T12:00:00Z",
        price: 54.43
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "CLCM",
    title: "CloudComfort Co."
  },
  {
    description:
      "IronSpan Industries engineers and constructs robust bridges and infrastructure solutions to connect communities worldwide.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T12:00:00Z",
        price: 140.68
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "IRSN",
    title: "IronSpan Industries"
  },
  {
    description:
      "A company specializing in eco-friendly fire-based heating solutions for homes and businesses.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T10:00:00Z",
        price: 75.32
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "HGLO",
    title: "HearthGlow Energy"
  },
  {
    description:
      "Designs and manufactures autonomous robotic ants for industrial and environmental applications.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T10:00:00Z",
        price: 48.75
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "MTRB",
    title: "MicroTrail Robotics"
  },
  {
    description:
      "Develops innovative solutions for recycling and repurposing broken glass into new materials.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T10:00:00Z",
        price: 22.19
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "SPRF",
    title: "ShatterProof Co."
  },
  {
    description:
      "An outdoor company specializing in guided mountain expeditions and adventure gear.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T10:00:00Z",
        price: 130.5
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "SRAD",
    title: "SummitRise Adventures"
  },
  {
    description:
      "An online platform for trading and authenticating rare and collectible coins.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T10:00:00Z",
        price: 95.88
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "GMNT",
    title: "GleamMint Exchange"
  },
  {
    description:
      "A company providing water-saving technologies and sustainable agriculture solutions for dry regions.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T10:00:00Z",
        price: 61.42
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "ARID",
    title: "AridTech Solutions"
  },
  {
    description:
      "Specializes in crowd control and event safety technologies for large gatherings.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T10:00:00Z",
        price: 87.33
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "CFDY",
    title: "CrowdFury Dynamics"
  },
  {
    description:
      "Develops smart devices and products inspired by feline curiosity for pet owners.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T10:00:00Z",
        price: 42.8
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "WTIN",
    title: "WhiskerTech Innovations"
  },
  {
    description:
      "Manufactures advanced rainwater harvesting systems for urban and rural areas.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T10:00:00Z",
        price: 54.9
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "DPDY",
    title: "Downpour Dynamics"
  },
  {
    description:
      "A platform for digital and physical colorful art commissions by global artists.",
    history: [
      {
        lastUpdatedAt: "2024-11-30T10:00:00Z",
        price: 77.65
      }
    ],
    lastUpdatedAt: new Date().toISOString(),
    symbol: "CBCR",
    title: "CanvasBurst Creations"
  }
];
