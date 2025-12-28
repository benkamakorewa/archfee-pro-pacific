
export enum CountryKey {
  FIJI = 'Fiji',
  VANUATU = 'Vanuatu',
  SAMOA = 'Samoa',
  SOLOMON_ISLANDS = 'Solomon Islands',
  PNG = 'Papua New Guinea',
  TONGA = 'Tonga',
  COOK_ISLANDS = 'Cook Islands'
}

export enum ResidentialCategory {
  LOW_DENSITY = 'Low Density Residential',
  MEDIUM_DENSITY = 'Medium Density Residential',
  HIGH_DENSITY = 'High Density and Hospitality'
}

export enum BuildingType {
  // Low Density
  DETACHED_HOUSE = 'Detached House',
  // Medium Density
  WALK_UP_APARTMENT = 'Walk-up Apartment',
  LOW_RISE_APARTMENT = 'Low-rise Apartment',
  TOWN_HOUSE = 'Townhouses or Duplexes',
  DORMITORY = 'Dormitory or Hostel',
  // High Density
  HOTEL = 'Hotel',
  RESORT = 'Resort',
  SERVICED_APARTMENT = 'Serviced Apartments'
}

export enum ConstructionStandard {
  BASIC = 'Basic',
  STANDARD = 'Standard',
  HIGH_END = 'High End',
  PREMIUM = 'Premium',
  LUXURY = 'Luxury'
}

export enum LandType {
  FREEHOLD = 'Freehold',
  LEASEHOLD = 'Leasehold',
  CUSTOMARY = 'Customary Land'
}

export enum FeeOption {
  PERCENTAGE = 'Percentage Based',
  FIXED = 'Fixed Fee'
}

export interface RegionConfig {
  currency: string;
  buildingCode: string;
  locations: Record<string, number>;
  baseRates: Record<string, number>;
  lastSync?: string;
  isLive?: boolean;
}

export interface InfrastructureOptions {
  waterHarvesting: boolean;
  septicSystem: boolean;
  solarSystem: boolean;
}

export interface SharedFacilities {
  restaurant: boolean;
  pool: boolean;
  conference: boolean;
}

export interface ProjectData {
  country: CountryKey;
  category: ResidentialCategory;
  buildingType: BuildingType;
  disclaimerAccepted: boolean;
  // Low Density Specifics
  bedroomCount?: number;
  doubleStorey: boolean;
  // Quantities
  unitCount?: number;
  roomKeys?: number;
  floorArea: number;
  // Facilities
  sharedFacilities?: SharedFacilities;

  standard: ConstructionStandard;
  location: string;
  landType: LandType;
  infrastructure: InfrastructureOptions;
  enhancedResilience: boolean;
  selectedFeeOption?: FeeOption;
  clientDetails: {
    name: string;
    email: string;
    projectLocation?: string;
  };
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface CalculationResults {
  constructionCost: number;
  ratePerM2: number;
  contingency: number;
  infraCost: number;
  resiliencePremium: number;
  landLegalEstimate: number;
  totalFee: number;
  feePercentage?: number;
  stageBreakdown: { name: string; percentage: number; amount: number }[];
  currency: string;
  isLive?: boolean;
  lastSync?: string;
}
