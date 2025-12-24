
import React, { useState, useMemo, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  ProjectData, 
  BuildingType, 
  ConstructionStandard, 
  FeeOption,
  CalculationResults,
  CountryKey,
  RegionConfig,
  LandType
} from './types';
import { 
  REGIONAL_DATA as STATIC_REGIONAL_DATA,
  DEFAULT_AREAS, 
  CONTINGENCY_PERCENTAGE, 
  getFeePercentage,
  FIXED_FEE_RANGES,
  STAGE_WEIGHTS,
  INFRA_BASE_COSTS,
  LAND_LEGAL_BASE_COSTS,
  RESILIENCE_PREMIUM_FACTOR
} from './constants';

// Optimized Screen Components
import WelcomeScreen from './screens/WelcomeScreen';
import HomeProfileScreen from './screens/HomeProfileScreen'; // Merged
import MarketContextScreen from './screens/MarketContextScreen'; // Merged
import ResilienceScreen from './screens/ResilienceScreen';
import FinancialDashboard from './screens/FinancialDashboard'; // Merged Results + Fees
import SecureReportScreen from './screens/SecureReportScreen'; // Merged Details + Gate
import PremiumReportPreview from './screens/PremiumReportPreview';
import AdminDashboard from './screens/AdminDashboard';

import Header from './components/Header';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [activeRegionalData, setActiveRegionalData] = useState<Record<CountryKey, RegionConfig>>(STATIC_REGIONAL_DATA);
  
  const [data, setData] = useState<ProjectData>({
    country: CountryKey.FIJI,
    disclaimerAccepted: false,
    buildingType: BuildingType.THREE_BED,
    doubleStorey: false,
    floorArea: DEFAULT_AREAS[BuildingType.THREE_BED],
    standard: ConstructionStandard.STANDARD,
    location: '',
    landType: LandType.FREEHOLD,
    infrastructure: { waterHarvesting: false, septicSystem: false, solarSystem: false },
    enhancedResilience: false,
    clientDetails: { name: '', email: '' },
    selectedFeeOption: FeeOption.PERCENTAGE
  });

  const syncLiveRates = async (country: CountryKey) => {
    setIsSyncing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Fetch current residential construction rates for ${country}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              currency: { type: Type.STRING },
              buildingCode: { type: Type.STRING },
              baseRates: {
                type: Type.OBJECT,
                properties: {
                  "Basic": { type: Type.NUMBER },
                  "Standard": { type: Type.NUMBER },
                  "High End": { type: Type.NUMBER }
                },
                required: ["Basic", "Standard", "High End"]
              },
              locations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { name: { type: Type.STRING }, multiplier: { type: Type.NUMBER } },
                  required: ["name", "multiplier"]
                }
              }
            },
            required: ["currency", "buildingCode", "baseRates", "locations"]
          }
        }
      });

      const rawData = JSON.parse(response.text);
      const locationsRecord: Record<string, number> = {};
      if (Array.isArray(rawData.locations)) {
        rawData.locations.forEach((loc: { name: string; multiplier: number }) => {
          locationsRecord[loc.name] = loc.multiplier;
        });
      }

      setActiveRegionalData(prev => ({
        ...prev,
        [country]: { ...rawData, locations: locationsRecord, isLive: true, lastSync: new Date().toLocaleTimeString() }
      }));
    } catch (error) {
      console.error("Sync Failed:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => { syncLiveRates(data.country); }, [data.country]);

  useEffect(() => {
    const region = activeRegionalData[data.country];
    if (region && region.locations) {
      const firstLoc = Object.keys(region.locations)[0];
      setData(prev => ({ ...prev, location: firstLoc }));
    }
  }, [data.country, activeRegionalData]);

  const results: CalculationResults = useMemo(() => {
    const region = activeRegionalData[data.country];
    const rate = region.baseRates[data.standard];
    const locationMultiplier = region.locations[data.location] || 1.0;
    const complexityFactor = data.doubleStorey ? 1.15 : 1.0;
    const coreRate = rate * locationMultiplier * complexityFactor;
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
      if (data.landType === LandType.CUSTOMARY) totalFee *= 1.15;
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

  const updateData = (newData: Partial<ProjectData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    if (isAdminView) return <AdminDashboard onExit={() => setIsAdminView(false)} />;
    if (showReport) return <PremiumReportPreview results={results} projectData={data} onBack={() => setShowReport(false)} />;

    switch(step) {
      case 0: return <WelcomeScreen selectedCountry={data.country} isSyncing={isSyncing} onCountrySelect={(c) => updateData({ country: c })} onStart={() => setStep(1)} />;
      case 1: return <HomeProfileScreen data={data} onUpdate={updateData} onNext={() => setStep(2)} onBack={() => setStep(0)} />;
      case 2: return <MarketContextScreen data={data} onUpdate={updateData} onNext={() => setStep(3)} onBack={() => setStep(1)} />;
      case 3: return <ResilienceScreen data={data} onUpdate={updateData} onNext={() => setStep(4)} onBack={() => setStep(2)} />;
      case 4: return <FinancialDashboard results={results} projectData={data} onUpdate={updateData} onNext={() => setStep(5)} onBack={() => setStep(3)} />;
      case 5: return <SecureReportScreen results={results} projectData={data} onUpdate={updateData} onBack={() => setStep(4)} onReportGenerated={() => setShowReport(true)} />;
      default: return <WelcomeScreen onStart={() => setStep(1)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7f8] font-display">
      <Header isSyncing={isSyncing} onDashboard={() => setIsAdminView(true)} onNewEstimate={() => { setStep(1); setShowReport(false); setIsAdminView(false); }} />
      <div className="flex-1 flex flex-col">
        {step > 0 && !showReport && !isAdminView && (
          <div className="w-full max-w-4xl mx-auto px-6 py-6"><ProgressBar current={step} total={5} /></div>
        )}
        <div className="flex-1">{renderStep()}</div>
      </div>
    </div>
  );
};

export default App;
