
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
  STANDALONE = 'Standalone Residential Dwellings',
  MULTI_UNIT = 'Multi-Unit and Group Residential Accommodation',
  COMMERCIAL_RESORT = 'Commercial, Public, and Resort Infrastructure'
}

export enum BuildingType {
  // Group 1: Standalone
  SINGLE_DWELLING = 'Single Dwelling (Class 1a)',
  TOWN_HOUSE_DUPLEX = 'Townhouse or Duplex (Class 1a)',

  // Group 2: Multi-Unit
  APARTMENTS = 'Stacked Apartments (Class 2)',
  HOSTEL_GUEST_HOUSE = 'Hostel or Guest House (Class 3)',

  // Group 3: Commercial & Public
  COMMERCIAL_FACILITY = 'Commercial (Class 6)',
  PUBLIC_FACILITY = 'Public or Health (Class 9)',
  RESORT_COMPLEX = 'Resort Infrastructure'
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
  // Payment State
  isPaid?: boolean;
  paymentId?: string;
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
