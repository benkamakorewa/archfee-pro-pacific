
import { BuildingType, ConstructionStandard, CountryKey, RegionConfig, LandType, ResidentialCategory } from './types';

export const REGIONAL_DATA: Record<CountryKey, RegionConfig> = {
  [CountryKey.FIJI]: {
    currency: 'FJD',
    buildingCode: 'Fiji National Building Code 2024',
    locations: {
      'Viti Levu Urban': 1.0,
      'Viti Levu Rural': 1.1,
      'Vanua Levu': 1.25,
      'Outer Islands': 1.5,
    },
    baseRates: {
      [ConstructionStandard.BASIC]: 1800,
      [ConstructionStandard.STANDARD]: 2800,
      [ConstructionStandard.HIGH_END]: 4500,
      [ConstructionStandard.PREMIUM]: 5500,
      [ConstructionStandard.LUXURY]: 7500,
    }
  },
  [CountryKey.VANUATU]: {
    currency: 'VUV',
    buildingCode: 'Vanuatu National Building Code',
    locations: {
      'Efate (Port Vila)': 1.0,
      'Espiritu Santo': 1.2,
      'Tanna / Malekula': 1.4,
      'Remote Torba/Tafea': 1.7,
    },
    baseRates: {
      [ConstructionStandard.BASIC]: 95000,
      [ConstructionStandard.STANDARD]: 155000,
      [ConstructionStandard.HIGH_END]: 240000,
      [ConstructionStandard.PREMIUM]: 290000,
      [ConstructionStandard.LUXURY]: 380000,
    }
  },
  [CountryKey.SAMOA]: {
    currency: 'WST',
    buildingCode: 'Samoa National Building Code',
    locations: {
      'Upolu (Apia)': 1.0,
      'Upolu Rural': 1.15,
      'Savaii': 1.35,
    },
    baseRates: {
      [ConstructionStandard.BASIC]: 2200,
      [ConstructionStandard.STANDARD]: 3400,
      [ConstructionStandard.HIGH_END]: 5200,
      [ConstructionStandard.PREMIUM]: 6200,
      [ConstructionStandard.LUXURY]: 8500,
    }
  },
  [CountryKey.SOLOMON_ISLANDS]: {
     currency: 'SBD',
     buildingCode: 'Solomon Islands Building Code',
     locations: {
        'Honiara': 1.0,
        'Guadalcanal Rural': 1.2,
        'Western Province': 1.4,
        'Remote Islands': 1.8
     },
     baseRates: {
        [ConstructionStandard.BASIC]: 6500,
        [ConstructionStandard.STANDARD]: 9800,
        [ConstructionStandard.HIGH_END]: 16000,
        [ConstructionStandard.PREMIUM]: 19500,
        [ConstructionStandard.LUXURY]: 25000,
     }
  },
  [CountryKey.PNG]: {
     currency: 'PGK',
     buildingCode: 'PNG Building Board Regulations',
     locations: {
        'Port Moresby': 1.0,
        'Lae / Mt Hagen': 1.15,
        'Highlands Rural': 1.45,
        'Island Regions': 1.6
     },
     baseRates: {
        [ConstructionStandard.BASIC]: 2800,
        [ConstructionStandard.STANDARD]: 4500,
        [ConstructionStandard.HIGH_END]: 7500,
        [ConstructionStandard.PREMIUM]: 9200,
        [ConstructionStandard.LUXURY]: 12000,
     }
  },
  [CountryKey.TONGA]: {
    currency: 'TOP',
    buildingCode: 'National Building Code of Tonga (AS/NZS)',
    locations: {
      'Tongatapu (Nukuʻalofa)': 1.0,
      'Tongatapu Rural': 1.1,
      'Vavaʻu Group': 1.3,
      'Haʻapai / ʻEua': 1.45,
    },
    baseRates: {
      [ConstructionStandard.BASIC]: 2100,
      [ConstructionStandard.STANDARD]: 3200,
      [ConstructionStandard.HIGH_END]: 4900,
      [ConstructionStandard.PREMIUM]: 6000,
      [ConstructionStandard.LUXURY]: 7800,
    }
  },
  [CountryKey.COOK_ISLANDS]: {
    currency: 'NZD',
    buildingCode: 'Cook Islands Building Code (AS/NZS Compliance)',
    locations: {
      'Rarotonga': 1.0,
      'Aitutaki': 1.25,
      'Southern Group': 1.5,
      'Northern Group': 1.9,
    },
    baseRates: {
      [ConstructionStandard.BASIC]: 2400,
      [ConstructionStandard.STANDARD]: 3800,
      [ConstructionStandard.HIGH_END]: 6200,
      [ConstructionStandard.PREMIUM]: 7500,
      [ConstructionStandard.LUXURY]: 9800,
    }
  }
};

export const CATEGORY_MULTIPLIERS: Record<ResidentialCategory, number> = {
  [ResidentialCategory.LOW_DENSITY]: 1.0,
  [ResidentialCategory.MEDIUM_DENSITY]: 1.25, // Increased due to services/structure
  [ResidentialCategory.HIGH_DENSITY]: 1.55, // Higher due to complexity/amenities
};

export const DEFAULT_AREAS: Record<BuildingType, number> = {
  [BuildingType.DETACHED_HOUSE]: 160,
  [BuildingType.WALK_UP_APARTMENT]: 600,
  [BuildingType.LOW_RISE_APARTMENT]: 1200,
  [BuildingType.TOWN_HOUSE]: 800,
  [BuildingType.DORMITORY]: 1000,
  [BuildingType.HOTEL]: 2500,
  [BuildingType.RESORT]: 5000,
  [BuildingType.SERVICED_APARTMENT]: 3000,
};

export const INFRA_BASE_COSTS = {
  waterHarvesting: 5000,
  septicSystem: 4500,
  solarSystem: 12000,
};

export const LAND_LEGAL_BASE_COSTS = {
  [LandType.FREEHOLD]: 1500,
  [LandType.LEASEHOLD]: 3500,
  [LandType.CUSTOMARY]: 7500,
};

export const RESILIENCE_PREMIUM_FACTOR = 0.12;

export const CONTINGENCY_PERCENTAGE = 0.07;

export const getFeePercentage = (cost: number, currency: string): number => {
  return cost > 1000000 ? 7 : cost > 500000 ? 8 : 10;
};

export const FIXED_FEE_RANGES: Record<BuildingType, { min: number; max: number }> = {
  [BuildingType.DETACHED_HOUSE]: { min: 25000, max: 35000 },
  [BuildingType.WALK_UP_APARTMENT]: { min: 80000, max: 120000 },
  [BuildingType.LOW_RISE_APARTMENT]: { min: 150000, max: 250000 },
  [BuildingType.TOWN_HOUSE]: { min: 60000, max: 90000 },
  [BuildingType.DORMITORY]: { min: 50000, max: 80000 },
  [BuildingType.HOTEL]: { min: 300000, max: 600000 },
  [BuildingType.RESORT]: { min: 500000, max: 1200000 },
  [BuildingType.SERVICED_APARTMENT]: { min: 250000, max: 450000 },
};

export const STAGE_WEIGHTS = [
  { name: 'Concept Design', weight: 0.15 },
  { name: 'Design Development', weight: 0.20 },
  { name: 'Documentation', weight: 0.35 },
  { name: 'Approvals', weight: 0.10 },
  { name: 'Contract Administration', weight: 0.20 },
];
