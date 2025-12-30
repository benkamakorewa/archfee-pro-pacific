
import React, { useState, useMemo } from 'react';
import { ProjectData, BuildingType, ResidentialCategory, ConstructionStandard } from '../types';
import { DEFAULT_AREAS } from '../constants';

interface HomeProfileScreenProps {
  data: ProjectData;
  onUpdate: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const HomeProfileScreen: React.FC<HomeProfileScreenProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [internalStep, setInternalStep] = useState(1);

  const categories = [
    {
      id: ResidentialCategory.STANDALONE,
      label: 'Standalone Residential Dwellings',
      desc: 'Class 1a buildings, including standalone dwellings, duplexes, and townhouses built using simplified manuals.',
      icon: 'home_pin'
    },
    {
      id: ResidentialCategory.MULTI_UNIT,
      label: 'Multi-Unit and Group Accommodation',
      desc: 'Class 2 & 3 buildings, including vertically stacked apartments, hostels, and guest houses.',
      icon: 'apartment'
    },
    {
      id: ResidentialCategory.COMMERCIAL_RESORT,
      label: 'Commercial, Public & Resort',
      desc: 'Class 6 & 9 buildings, including shops, restaurants, public assembly, and complex resort infrastructure.',
      icon: 'corporate_fare'
    }
  ];

  const buildingTypesByCategory = {
    [ResidentialCategory.STANDALONE]: [
      { id: BuildingType.SINGLE_DWELLING, label: 'Single Dwelling', icon: 'house' },
      { id: BuildingType.TOWN_HOUSE_DUPLEX, label: 'Townhouse or Duplex', icon: 'holiday_village' }
    ],
    [ResidentialCategory.MULTI_UNIT]: [
      { id: BuildingType.APARTMENTS, label: 'Stacked Apartments', icon: 'domain' },
      { id: BuildingType.HOSTEL_GUEST_HOUSE, label: 'Hostel or Guest House', icon: 'groups' }
    ],
    [ResidentialCategory.COMMERCIAL_RESORT]: [
      { id: BuildingType.COMMERCIAL_FACILITY, label: 'Shop, Restaurant or Bar', icon: 'store' },
      { id: BuildingType.PUBLIC_FACILITY, label: 'Public or Health Facility', icon: 'account_balance' },
      { id: BuildingType.RESORT_COMPLEX, label: 'Island Resort Complex', icon: 'beach_access' }
    ]
  };

  const handleCategorySelect = (cat: ResidentialCategory) => {
    const firstType = buildingTypesByCategory[cat][0].id;
    onUpdate({
      category: cat,
      buildingType: firstType,
      floorArea: DEFAULT_AREAS[firstType],
      standard: cat === ResidentialCategory.COMMERCIAL_RESORT ? ConstructionStandard.PREMIUM : ConstructionStandard.STANDARD,
      unitCount: cat === ResidentialCategory.MULTI_UNIT ? 4 : 1,
      roomKeys: cat === ResidentialCategory.COMMERCIAL_RESORT ? 20 : 1
    });
    setInternalStep(2);
  };

  const handleTypeSelect = (type: BuildingType) => {
    onUpdate({ buildingType: type, floorArea: DEFAULT_AREAS[type] });
  };

  const toggleFacility = (facility: keyof NonNullable<ProjectData['sharedFacilities']>) => {
    if (!data.sharedFacilities) return;
    onUpdate({
      sharedFacilities: {
        ...data.sharedFacilities,
        [facility]: !data.sharedFacilities[facility]
      }
    });
  };

  const sliderConfig = useMemo(() => {
    switch (data.category) {
      case ResidentialCategory.STANDALONE: return { min: 30, max: 800, step: 10 };
      case ResidentialCategory.MULTI_UNIT: return { min: 200, max: 5000, step: 50 };
      case ResidentialCategory.COMMERCIAL_RESORT: return { min: 500, max: 30000, step: 100 };
      default: return { min: 30, max: 1000, step: 10 };
    }
  }, [data.category]);

  const subSteps = ["Category", "Specifications"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Sub-progress Indicator */}
      <div className="flex items-center justify-center gap-4 mb-4">
        {subSteps.map((s, idx) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div className={`size-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${internalStep > idx + 1 ? 'bg-green-500 border-green-500 text-white' :
                internalStep === idx + 1 ? 'border-[#13a4ec] text-[#13a4ec]' : 'border-gray-200 text-gray-300'
                }`}>
                {internalStep > idx + 1 ? <span className="material-symbols-outlined text-xs">check</span> : idx + 1}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${internalStep === idx + 1 ? 'text-[#111618]' : 'text-gray-300'}`}>{s}</span>
            </div>
            {idx < subSteps.length - 1 && <div className="w-8 h-px bg-gray-200" />}
          </React.Fragment>
        ))}
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tight mb-2">Project Profile</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Define the scope and category of your Pacific residential development for an accurate market estimate.</p>
      </div>

      {internalStep === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`p-10 rounded-[3rem] border-2 text-left transition-all flex flex-col gap-8 group relative overflow-hidden ${data.category === cat.id ? 'border-[#13a4ec] bg-white shadow-2xl' : 'border-white bg-white hover:border-gray-100'
                }`}
            >
              {data.category === cat.id && <div className="absolute top-0 right-0 size-20 bg-[#13a4ec]/5 rounded-bl-[4rem] flex items-start justify-end p-4 text-[#13a4ec]"><span className="material-symbols-outlined font-black">check_circle</span></div>}
              <div className={`size-16 rounded-3xl flex items-center justify-center transition-all ${data.category === cat.id ? 'bg-[#13a4ec] text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-[#13a4ec]/10 group-hover:text-[#13a4ec]'
                }`}>
                <span className="material-symbols-outlined text-4xl">{cat.icon}</span>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#13a4ec]">Group {categories.indexOf(cat) + 1}</p>
                <h3 className="text-xl font-black leading-tight">{cat.label}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{cat.desc}</p>
              </div>
              <div className={`mt-auto pt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${data.category === cat.id ? 'text-[#13a4ec]' : 'text-gray-300 opacity-0 group-hover:opacity-100'}`}>
                Configure Specs <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {internalStep === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
          {/* Left Column: Selection */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Building Type</p>
              <div className="grid grid-cols-1 gap-3">
                {buildingTypesByCategory[data.category].map(type => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${data.buildingType === type.id ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-500'
                      }`}
                  >
                    <div className={`size-10 rounded-xl flex items-center justify-center ${data.buildingType === type.id ? 'bg-[#13a4ec] text-white' : 'bg-white'}`}>
                      <span className="material-symbols-outlined text-xl">{type.icon}</span>
                    </div>
                    <span className="font-black text-sm">{type.label}</span>
                    {data.buildingType === type.id && <span className="material-symbols-outlined ml-auto text-sm">verified</span>}
                  </button>
                ))}
              </div>
            </div>

            {data.category === ResidentialCategory.STANDALONE && (
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Bedrooms</p>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        onClick={() => onUpdate({ bedroomCount: n })}
                        className={`flex-1 h-14 rounded-2xl font-black transition-all border-2 ${data.bedroomCount === n ? 'border-[#13a4ec] bg-[#13a4ec] text-white' : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'
                          }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onUpdate({ doubleStorey: !data.doubleStorey })}
                  className={`w-full h-16 rounded-2xl border-2 flex items-center justify-between px-6 transition-all ${data.doubleStorey ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-400'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">stairs</span>
                    <span className="font-black text-sm">Double Storey</span>
                  </div>
                  <span className="material-symbols-outlined">{data.doubleStorey ? 'toggle_on' : 'toggle_off'}</span>
                </button>
              </div>
            )}

            {data.category === ResidentialCategory.COMMERCIAL_RESORT && (
              <div className="bg-[#111618] p-8 rounded-[2.5rem] text-white space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Shared Support Facilities</p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'restaurant', label: 'Restaurant & Kitchen', icon: 'restaurant' },
                    { key: 'pool', label: 'Swimming Pool & Deck', icon: 'pool' },
                    { key: 'conference', label: 'Conference Facilities', icon: 'groups' }
                  ].map(f => (
                    <button
                      key={f.key}
                      onClick={() => toggleFacility(f.key as any)}
                      className={`w-full h-14 rounded-2xl flex items-center justify-between px-5 text-sm font-bold border-2 transition-all ${data.sharedFacilities?.[f.key as keyof typeof data.sharedFacilities] ? 'border-[#13a4ec] bg-[#13a4ec]/10 text-white' : 'border-white/10 text-white/40 opacity-60'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-sm">{f.icon}</span>
                        <span>{f.label}</span>
                      </div>
                      <span className="material-symbols-outlined text-xs">{data.sharedFacilities?.[f.key as keyof typeof data.sharedFacilities] ? 'check_box' : 'check_box_outline_blank'}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Standard Integrated */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">diamond</span>
                </div>
                <h3 className="font-black">Build Quality</h3>
              </div>
              <div className="space-y-3">
                {(data.category === ResidentialCategory.COMMERCIAL_RESORT
                  ? [ConstructionStandard.STANDARD, ConstructionStandard.HIGH_END, ConstructionStandard.PREMIUM, ConstructionStandard.LUXURY]
                  : [ConstructionStandard.BASIC, ConstructionStandard.STANDARD, ConstructionStandard.HIGH_END]
                ).map(s => (
                  <button
                    key={s}
                    onClick={() => onUpdate({ standard: s })}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${data.standard === s ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-500'
                      }`}
                  >
                    <span className="font-bold text-sm">{s} Standard</span>
                    {data.standard === s && <span className="material-symbols-outlined text-sm font-black">check</span>}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-bold leading-relaxed italic uppercase tracking-wider">
                * Premium and Luxury standards available for multi-unit and hospitality developments.
              </p>
            </div>
          </div>

          {/* Right Column: Quantitative & Area */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col gap-10 h-full">
              <div className="space-y-10">
                {/* Specific Density Inputs */}
                {data.category === ResidentialCategory.MULTI_UNIT && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Number of Units</label>
                      <input
                        type="number" min="2"
                        value={data.unitCount}
                        onChange={(e) => onUpdate({ unitCount: Number(e.target.value) })}
                        className="w-full h-16 bg-gray-50 rounded-2xl border-0 ring-1 ring-gray-100 text-3xl font-black px-6 focus:ring-2 focus:ring-[#13a4ec]"
                      />
                    </div>
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-dashed border-gray-200 flex flex-col justify-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Avg. Unit Size</p>
                      <p className="text-2xl font-black text-gray-700">{Math.round(data.floorArea / (data.unitCount || 1))} <span className="text-sm font-bold text-gray-400">m²</span></p>
                    </div>
                  </div>
                )}

                {data.category === ResidentialCategory.COMMERCIAL_RESORT && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Total Rooms / Keys</label>
                      <input
                        type="number" min="10"
                        value={data.roomKeys}
                        onChange={(e) => onUpdate({ roomKeys: Number(e.target.value) })}
                        className="w-full h-16 bg-gray-50 rounded-2xl border-0 ring-1 ring-gray-100 text-3xl font-black px-6 focus:ring-2 focus:ring-[#13a4ec]"
                      />
                    </div>
                    <div className="bg-[#13a4ec]/5 p-6 rounded-2xl border border-[#13a4ec]/10 flex flex-col justify-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#13a4ec] mb-1">Room Density</p>
                      <p className="text-2xl font-black text-[#13a4ec]">{Math.round(data.floorArea / (data.roomKeys || 1))} <span className="text-sm font-bold text-gray-400">m²/key</span></p>
                    </div>
                  </div>
                )}

                {/* Main Area Slider */}
                <div className="space-y-8 py-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Project GFA</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black tracking-tighter">{data.floorArea.toLocaleString()}</span>
                        <span className="text-xl font-bold text-gray-300">m²</span>
                      </div>
                    </div>
                    <div className="text-right pb-1">
                      <span className="material-symbols-outlined text-[#13a4ec] text-4xl opacity-20">architecture</span>
                    </div>
                  </div>

                  <div className="px-2">
                    <input
                      type="range"
                      min={sliderConfig.min}
                      max={sliderConfig.max}
                      step={sliderConfig.step}
                      value={data.floorArea}
                      onChange={(e) => onUpdate({ floorArea: Number(e.target.value) })}
                      className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#13a4ec]"
                    />
                    <div className="flex justify-between mt-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                      <span>{sliderConfig.min} m²</span>
                      <span>{sliderConfig.max} m²</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-6">
                <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <div className="size-10 rounded-full bg-white flex items-center justify-center text-[#13a4ec] shadow-sm">
                    <span className="material-symbols-outlined text-xl">insights</span>
                  </div>
                  <p className="text-xs font-bold text-gray-600 leading-relaxed">
                    Estimates automatically weight for multi-unit servicing, fire engineering, and structural density required by the <span className="text-[#13a4ec]">{data.country} Code</span>.
                  </p>
                </div>

                <label className="flex items-start gap-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={data.disclaimerAccepted}
                    onChange={(e) => onUpdate({ disclaimerAccepted: e.target.checked })}
                    className="mt-1 size-6 rounded border-gray-200 text-[#13a4ec] focus:ring-[#13a4ec] transition-all"
                  />
                  <div className="text-xs font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                    <span className="text-gray-900 font-black block mb-0.5">Indicative Acknowledgment</span>
                    I confirm these project parameters are indicative for {data.country} market planning.
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-10 border-t border-gray-200">
        <button
          onClick={() => internalStep === 1 ? onBack() : setInternalStep(1)}
          className="h-14 px-8 text-gray-400 font-bold hover:text-[#111618] transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          {internalStep === 1 ? 'Cancel' : 'Change Category'}
        </button>

        {internalStep === 2 && (
          <button
            onClick={onNext}
            disabled={!data.disclaimerAccepted}
            className="h-14 px-12 bg-[#13a4ec] text-white font-black rounded-2xl shadow-2xl shadow-[#13a4ec]/20 disabled:bg-gray-200 disabled:shadow-none transition-all flex items-center gap-2"
          >
            Continue: Market Factors
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeProfileScreen;
