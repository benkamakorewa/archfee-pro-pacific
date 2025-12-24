
export enum CountryKey {
  FIJI = 'Fiji',
  VANUATU = 'Vanuatu',
  SAMOA = 'Samoa',
  SOLOMON_ISLANDS = 'Solomon Islands',
  PNG = 'Papua New Guinea',
  TONGA = 'Tonga',
  COOK_ISLANDS = 'Cook Islands'
}

export enum BuildingType {
  ONE_BED = '1 Bedroom',
  TWO_BED = '2 Bedroom',
  THREE_BED = '3 Bedroom',
  FOUR_BED = '4 Bedroom'
}

export enum ConstructionStandard {
  BASIC = 'Basic',
  STANDARD = 'Standard',
  HIGH_END = 'High End'
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
  baseRates: Record<ConstructionStandard, number>;
  lastSync?: string;
  isLive?: boolean;
}

export interface InfrastructureOptions {
  waterHarvesting: boolean;
  septicSystem: boolean;
  solarSystem: boolean;
}

export interface ProjectData {
  country: CountryKey;
  disclaimerAccepted: boolean;
  buildingType: BuildingType;
  doubleStorey: boolean;
  floorArea: number;
  standard: ConstructionStandard;
  location: string;
  landType: LandType;
  infrastructure: InfrastructureOptions;
  enhancedResilience: boolean; // Cyclone Rating Upgrade
  selectedFeeOption?: FeeOption;
  clientDetails: {
    name: string;
    email: string;
    projectLocation?: string;
  };
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
