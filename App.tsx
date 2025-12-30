
import React, { useState, useEffect } from 'react';
import {
  ProjectData,
  BuildingType,
  ConstructionStandard,
  FeeOption,
  CountryKey,
  LandType,
  ResidentialCategory,
  User,
  UserRole
} from './types';
import {
  REGIONAL_DATA as STATIC_REGIONAL_DATA,
  DEFAULT_AREAS
} from './constants';

// Hooks
import { useProjectCalculations } from './hooks/useProjectCalculations';
import { useRegionalData } from './hooks/useRegionalData';

// Optimized Screen Components
import WelcomeScreen from './screens/WelcomeScreen';
import ProjectConfigurationScreen from './screens/ProjectConfigurationScreen';
import FinancialDashboard from './screens/FinancialDashboard';
import SecureReportScreen from './screens/SecureReportScreen';
import PremiumReportPreview from './screens/PremiumReportPreview';
import AdminDashboard from './screens/AdminDashboard';

import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import AuthScreen from './screens/AuthScreen';
import MyEstimatesScreen from './screens/MyEstimatesScreen';
import Footer from './components/Footer';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const { currentUser, loading, logout } = useAuth();

  const [step, setStep] = useState(0);
  const [isAdminView, setIsAdminView] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showMyEstimates, setShowMyEstimates] = useState(false);
  const [adminRedirectPending, setAdminRedirectPending] = useState(false);

  // Data State
  const [data, setData] = useState<ProjectData>({
    country: CountryKey.FIJI,
    category: ResidentialCategory.STANDALONE,
    buildingType: BuildingType.SINGLE_DWELLING,
    disclaimerAccepted: false,
    bedroomCount: 3,
    doubleStorey: false,
    unitCount: 1,
    roomKeys: 1,
    floorArea: DEFAULT_AREAS[BuildingType.SINGLE_DWELLING],
    standard: ConstructionStandard.STANDARD,
    location: '',
    landType: LandType.FREEHOLD,
    infrastructure: { waterHarvesting: false, septicSystem: false, solarSystem: false },
    enhancedResilience: false,
    clientDetails: { name: '', email: '' },
    selectedFeeOption: FeeOption.PERCENTAGE,
    sharedFacilities: { restaurant: false, pool: false, conference: false }
  });

  // Custom Hooks
  const { activeRegionalData, isSyncing, syncLiveRates } = useRegionalData(STATIC_REGIONAL_DATA);
  const results = useProjectCalculations(data, activeRegionalData);

  // Effects
  useEffect(() => { syncLiveRates(data.country); }, [data.country, syncLiveRates]);

  useEffect(() => {
    const region = activeRegionalData[data.country];
    if (region && region.locations) {
      const firstLoc = Object.keys(region.locations)[0];
      setData(prev => ({ ...prev, location: firstLoc }));
    }
  }, [data.country, activeRegionalData]);

  const updateData = (newData: Partial<ProjectData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    if (showAuth) return <AuthScreen onSuccess={() => {
      setShowAuth(false);
      if (adminRedirectPending) {
        setIsAdminView(true);
        setAdminRedirectPending(false);
      }
    }} />;
    if (showMyEstimates) return <MyEstimatesScreen onLoadEstimate={(estData) => {
      setData(estData);
      setShowMyEstimates(false);
      setStep(3); // Go to Secure Report screen to see status or regenerate (Step 3 now)
    }} />;

    if (isAdminView) {
      if (!currentUser || currentUser.role !== 'admin') {
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
              <p className="text-slate-600 mb-6">You need administrator privileges to access this area.</p>
              <button onClick={() => setIsAdminView(false)} className="text-blue-600 hover:underline">Return to Home</button>
            </div>
          </div>
        );
      }
      return <AdminDashboard country={data.country} onExit={() => setIsAdminView(false)} />;
    }
    if (showReport) return <PremiumReportPreview results={results} projectData={data} onBack={() => setShowReport(false)} />;

    switch (step) {
      case 0: return <WelcomeScreen regionData={activeRegionalData[data.country]} selectedCountry={data.country} isSyncing={isSyncing} onCountrySelect={(c) => updateData({ country: c })} onStart={() => setStep(1)} />;
      case 1: return <ProjectConfigurationScreen data={data} onUpdate={updateData} onNext={() => setStep(2)} onBack={() => setStep(0)} />;
      case 2: return <FinancialDashboard results={results} projectData={data} onUpdate={updateData} onNext={() => setStep(3)} onBack={() => setStep(1)} />;
      case 3: return <SecureReportScreen results={results} projectData={data} onUpdate={updateData} onBack={() => setStep(2)} onReportGenerated={() => setShowReport(true)} />;
      default: return <WelcomeScreen onStart={() => setStep(1)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7f8] font-display">
      <Header
        isSyncing={isSyncing}
        onDashboard={() => {
          if (currentUser) {
            if (currentUser.role === 'admin') {
              setIsAdminView(true);
            } else {
              setShowMyEstimates(true);
            }
            setShowReport(false);
            setShowAuth(false);
          } else {
            setShowAuth(true);
          }
        }}
        onNewEstimate={() => { setStep(0); setShowReport(false); setIsAdminView(false); setShowAuth(false); setShowMyEstimates(false); }}
        onLogin={() => { setShowAuth(true); setIsAdminView(false); setShowReport(false); setShowMyEstimates(false); }}
        onLogout={async () => {
          await logout();
          setStep(0);
          setIsAdminView(false);
          setShowReport(false);
          setShowMyEstimates(false);
          setShowAuth(false);
        }}
        currentUser={currentUser}
      />
      <div className="flex-1 flex flex-col">
        {step > 0 && !showReport && !isAdminView && !showAuth && !showMyEstimates && (
          <div className="w-full max-w-4xl mx-auto px-6 py-6"><ProgressBar current={step} total={3} /></div>
        )}
        <div className="flex-1">{renderStep()}</div>
      </div>
      <Footer
        onNewEstimate={() => { setStep(0); setShowReport(false); setIsAdminView(false); setShowAuth(false); setShowMyEstimates(false); }}
        onAdmin={() => {
          if (currentUser && currentUser.role === 'admin') {
            setIsAdminView(true);
            setShowReport(false);
            setShowAuth(false);
            setShowMyEstimates(false);
          } else {
            setAdminRedirectPending(true);
            setShowAuth(true);
            setIsAdminView(false);
            setShowReport(false);
            setShowMyEstimates(false);
          }
        }}
        selectedCountry={data.country}
      />
    </div>
  );
};

export default App;
