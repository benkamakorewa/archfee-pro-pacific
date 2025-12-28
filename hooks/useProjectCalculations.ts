
import { useMemo } from 'react';
import {
    ProjectData,
    CalculationResults,
    ConstructionStandard,
    FeeOption,
    CountryKey,
    RegionConfig,
    ResidentialCategory
} from '../types';
import {
    CATEGORY_MULTIPLIERS,
    INFRA_BASE_COSTS,
    LAND_LEGAL_BASE_COSTS,
    RESILIENCE_PREMIUM_FACTOR,
    CONTINGENCY_PERCENTAGE,
    getFeePercentage,
    FIXED_FEE_RANGES,
    STAGE_WEIGHTS
} from '../constants';

export const useProjectCalculations = (
    data: ProjectData,
    activeRegionalData: Record<CountryKey, RegionConfig>
): CalculationResults => {
    return useMemo(() => {
        const region = activeRegionalData[data.country];
        const baseRate = region.baseRates[data.standard] || region.baseRates[ConstructionStandard.STANDARD];
        const locationMultiplier = region.locations[data.location] || 1.0;
        const categoryMultiplier = CATEGORY_MULTIPLIERS[data.category];
        const complexityFactor = data.doubleStorey ? 1.15 : 1.0;

        // Facility Add-ons (High Density)
        let facilityMarkup = 1.0;
        if (data.category === ResidentialCategory.HIGH_DENSITY && data.sharedFacilities) {
            if (data.sharedFacilities.restaurant) facilityMarkup += 0.15;
            if (data.sharedFacilities.pool) facilityMarkup += 0.08;
            if (data.sharedFacilities.conference) facilityMarkup += 0.12;
        }

        const coreRate = baseRate * locationMultiplier * categoryMultiplier * complexityFactor * facilityMarkup;
        const baseStructuralCost = data.floorArea * coreRate;
        const resiliencePremium = data.enhancedResilience ? (baseStructuralCost * RESILIENCE_PREMIUM_FACTOR) : 0;

        let infraCost = 0;
        if (data.infrastructure.waterHarvesting) infraCost += INFRA_BASE_COSTS.waterHarvesting * locationMultiplier;
        if (data.infrastructure.septicSystem) infraCost += INFRA_BASE_COSTS.septicSystem * locationMultiplier;
        if (data.infrastructure.solarSystem) infraCost += INFRA_BASE_COSTS.solarSystem * locationMultiplier;

        const landLegalEstimate = LAND_LEGAL_BASE_COSTS[data.landType];
        const subTotal = baseStructuralCost + resiliencePremium + infraCost + landLegalEstimate;
        const contingency = subTotal * CONTINGENCY_PERCENTAGE;
        const constructionCost = subTotal + contingency;

        let totalFee = 0;
        let feePercent = 0;

        if (data.selectedFeeOption === FeeOption.PERCENTAGE) {
            feePercent = getFeePercentage(constructionCost, region.currency);
            totalFee = constructionCost * (feePercent / 100);
        } else {
            const range = FIXED_FEE_RANGES[data.buildingType];
            totalFee = (range.min + range.max) / 2;
            if (data.doubleStorey) totalFee *= 1.1;
            if (data.category !== ResidentialCategory.LOW_DENSITY) totalFee *= categoryMultiplier;
        }

        const stageBreakdown = STAGE_WEIGHTS.map(s => ({
            name: s.name,
            percentage: s.weight * 100,
            amount: totalFee * s.weight
        }));

        return {
            constructionCost,
            ratePerM2: constructionCost / data.floorArea,
            contingency,
            infraCost,
            resiliencePremium,
            landLegalEstimate,
            totalFee,
            feePercentage: feePercent,
            stageBreakdown,
            currency: region.currency,
            isLive: region.isLive,
            lastSync: region.lastSync
        };
    }, [data, activeRegionalData]);
};
