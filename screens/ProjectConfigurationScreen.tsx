
import React, { useMemo } from 'react';
import { ProjectData, BuildingType, ResidentialCategory, ConstructionStandard, LandType } from '../types';
import { DEFAULT_AREAS, REGIONAL_DATA } from '../constants';

interface ProjectConfigurationScreenProps {
    data: ProjectData;
    onUpdate: (updates: Partial<ProjectData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const ProjectConfigurationScreen: React.FC<ProjectConfigurationScreenProps> = ({ data, onUpdate, onNext, onBack }) => {
    const region = REGIONAL_DATA[data.country];

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

    const sliderConfig = useMemo(() => {
        switch (data.category) {
            case ResidentialCategory.STANDALONE: return { min: 30, max: 800, step: 10 };
            case ResidentialCategory.MULTI_UNIT: return { min: 200, max: 5000, step: 50 };
            case ResidentialCategory.COMMERCIAL_RESORT: return { min: 500, max: 30000, step: 100 };
            default: return { min: 30, max: 1000, step: 10 };
        }
    }, [data.category]);

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
    };

    const toggleFacility = (facility: keyof NonNullable<ProjectData['sharedFacilities']>) => {
        onUpdate({
            sharedFacilities: {
                ...data.sharedFacilities,
                [facility]: !data.sharedFacilities[facility]
            }
        });
    };

    const toggleInfra = (key: keyof ProjectData['infrastructure']) => {
        onUpdate({
            infrastructure: {
                ...data.infrastructure,
                [key]: !data.infrastructure[key]
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-black tracking-tight text-[#111618]">Project Configuration</h1>
                <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
                    Complete your development profile below. All parameters are adjusted specifically for the <span className="text-[#13a4ec]">{data.country}</span> market.
                </p>
            </div>

            {/* 1. Category Selection */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-[#13a4ec] text-white flex items-center justify-center text-xs font-black">1</div>
                    <h2 className="text-xl font-black uppercase tracking-widest text-gray-400">Project Classification</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat.id)}
                            className={`p-8 rounded-[2.5rem] border-2 text-left transition-all flex flex-col gap-6 group relative overflow-hidden ${data.category === cat.id ? 'border-[#13a4ec] bg-white shadow-xl' : 'border-white bg-white hover:border-gray-100'
                                }`}
                        >
                            <div className={`size-14 rounded-2xl flex items-center justify-center transition-all ${data.category === cat.id ? 'bg-[#13a4ec] text-white' : 'bg-gray-50 text-gray-400'
                                }`}>
                                <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#13a4ec]">Group {categories.indexOf(cat) + 1}</p>
                                <h3 className="text-lg font-black leading-tight">{cat.label}</h3>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">{cat.desc}</p>
                            </div>
                            {data.category === cat.id && (
                                <div className="absolute top-4 right-4 text-[#13a4ec]">
                                    <span className="material-symbols-outlined font-black">check_circle</span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Specifications */}
                <div className="lg:col-span-8 space-y-10">

                    {/* 2. Primary Specifications */}
                    <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-[#13a4ec] text-white flex items-center justify-center text-xs font-black">2</div>
                            <h2 className="text-xl font-black uppercase tracking-widest text-gray-400">Development Specifications</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Building Type</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {buildingTypesByCategory[data.category].map(type => (
                                            <button
                                                key={type.id}
                                                onClick={() => onUpdate({ buildingType: type.id })}
                                                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${data.buildingType === type.id ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-500'}`}
                                            >
                                                <span className="material-symbols-outlined text-lg">{type.icon}</span>
                                                <span className="font-black text-sm">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {data.category === ResidentialCategory.STANDALONE && (
                                    <div className="space-y-6 pt-4">
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Configuration</p>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(n => (
                                                    <button key={n} onClick={() => onUpdate({ bedroomCount: n })} className={`flex-1 h-12 rounded-xl font-black transition-all border-2 ${data.bedroomCount === n ? 'border-[#13a4ec] bg-[#13a4ec] text-white' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>{n} Br</button>
                                                ))}
                                            </div>
                                        </div>
                                        <button onClick={() => onUpdate({ doubleStorey: !data.doubleStorey })} className={`w-full h-14 rounded-xl border-2 flex items-center justify-between px-5 transition-all ${data.doubleStorey ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>
                                            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">stairs</span><span className="font-black text-sm">Double Storey</span></div>
                                            <span className="material-symbols-outlined">{data.doubleStorey ? 'toggle_on' : 'toggle_off'}</span>
                                        </button>
                                    </div>
                                )}

                                {data.category === ResidentialCategory.MULTI_UNIT && (
                                    <div className="space-y-4 pt-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Unit Density</label>
                                        <input type="number" value={data.unitCount} onChange={(e) => onUpdate({ unitCount: Number(e.target.value) })} className="w-full h-14 bg-gray-50 rounded-xl border-0 ring-1 ring-gray-100 text-2xl font-black px-5 focus:ring-2 focus:ring-[#13a4ec]" />
                                        <p className="text-[10px] text-gray-400 font-bold italic">Avg Component Area: {Math.round(data.floorArea / (data.unitCount || 1))}m²</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Build Quality / Standard</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {(data.category === ResidentialCategory.COMMERCIAL_RESORT
                                            ? [ConstructionStandard.STANDARD, ConstructionStandard.HIGH_END, ConstructionStandard.PREMIUM, ConstructionStandard.LUXURY]
                                            : [ConstructionStandard.BASIC, ConstructionStandard.STANDARD, ConstructionStandard.HIGH_END]
                                        ).map(s => (
                                            <button key={s} onClick={() => onUpdate({ standard: s })} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${data.standard === s ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-500'}`}>
                                                <span className="font-black text-sm">{s} Standard</span>
                                                {data.standard === s && <span className="material-symbols-outlined text-sm font-black">check</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Floor Area (GFA)</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black tracking-tighter">{data.floorArea.toLocaleString()}</span>
                                        <span className="text-lg font-bold text-gray-300">m²</span>
                                    </div>
                                    <input type="range" min={sliderConfig.min} max={sliderConfig.max} step={sliderConfig.step} value={data.floorArea} onChange={(e) => onUpdate({ floorArea: Number(e.target.value) })} className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#13a4ec]" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. Site Context & Resilience */}
                    <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-[#13a4ec] text-white flex items-center justify-center text-xs font-black">3</div>
                            <h2 className="text-xl font-black uppercase tracking-widest text-gray-400">Regional Context & Resilience</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Site Location</p>
                                    <select value={data.location} onChange={(e) => onUpdate({ location: e.target.value })} className="w-full h-14 bg-gray-50 border-gray-100 rounded-xl px-4 font-black text-sm focus:ring-[#13a4ec]">
                                        {Object.keys(region.locations).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Land Tenure</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Object.values(LandType).map(t => (
                                            <button key={t} onClick={() => onUpdate({ landType: t })} className={`p-3 rounded-lg border-2 text-[10px] font-black uppercase tracking-widest transition-all ${data.landType === t ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>{t}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Off-Grid Sustainability</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { key: 'waterHarvesting', label: 'Rainwater Harvesting', icon: 'water_drop' },
                                        { key: 'septicSystem', label: 'Septic System', icon: 'waves' },
                                        { key: 'solarSystem', label: 'Solar PV & Battery', icon: 'solar_power' }
                                    ].map(item => (
                                        <button key={item.key} onClick={() => toggleInfra(item.key as any)} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${data.infrastructure[item.key as keyof typeof data.infrastructure] ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-500'}`}>
                                            <div className="flex items-center gap-3"><span className="material-symbols-outlined text-lg">{item.icon}</span><span className="font-black text-xs">{item.label}</span></div>
                                            <span className="material-symbols-outlined text-sm">{data.infrastructure[item.key as keyof typeof data.infrastructure] ? 'check_circle' : 'add_circle'}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 transition-all border-2 ${data.enhancedResilience ? 'bg-[#111618] border-[#111618] text-white' : 'bg-orange-50/30 border-orange-100 text-[#111618]'}`}>
                            <div className={`size-16 rounded-2xl flex items-center justify-center shrink-0 ${data.enhancedResilience ? 'bg-white/10' : 'bg-orange-100 text-orange-600'}`}>
                                <span className="material-symbols-outlined text-3xl font-black">{data.enhancedResilience ? 'verified' : 'cyclone'}</span>
                            </div>
                            <div className="flex-1 space-y-1">
                                <h4 className="font-black text-lg tracking-tight">Cyclone Grade Compliance</h4>
                                <p className={`text-xs font-medium leading-relaxed ${data.enhancedResilience ? 'text-white/60' : 'text-gray-500'}`}>Recommended for exposed coastal sites. Applies Grade C/D structural fasteners and rated joinery.</p>
                            </div>
                            <button onClick={() => onUpdate({ enhancedResilience: !data.enhancedResilience })} className={`h-12 px-8 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${data.enhancedResilience ? 'bg-green-500 text-white' : 'border-2 border-orange-200 text-orange-600 hover:bg-orange-100'}`}>
                                {data.enhancedResilience ? 'Applied' : 'Apply Upgrade'}
                            </button>
                        </div>
                    </section>
                </div>

                {/* Right Column: Execution & Summary */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="sticky top-28 bg-[#111618] rounded-[3.5rem] p-10 text-white space-y-8 shadow-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                            <span className="material-symbols-outlined text-[150px] font-black">analytics</span>
                        </div>
                        <div className="space-y-4 relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Configuration Summary</p>
                            <div className="space-y-6">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Selected Model</p>
                                    <p className="text-xl font-black text-[#13a4ec]">{data.buildingType}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Target Area</p>
                                        <p className="text-lg font-black">{data.floorArea}m²</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Quality</p>
                                        <p className="text-lg font-black">{data.standard}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/10 space-y-6 relative z-10">
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <input type="checkbox" checked={data.disclaimerAccepted} onChange={(e) => onUpdate({ disclaimerAccepted: e.target.checked })} className="mt-1 size-5 rounded border-white/20 bg-white/5 text-[#13a4ec] focus:ring-[#13a4ec]" />
                                <div className="text-[10px] font-medium text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-widest leading-relaxed">I acknowledge these parameters are for planning only.</div>
                            </label>
                            <button
                                onClick={onNext}
                                disabled={!data.disclaimerAccepted}
                                className="w-full h-20 bg-[#13a4ec] disabled:bg-white/10 disabled:text-white/20 text-white font-black rounded-3xl text-xl shadow-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[#13a4ec]/30"
                            >
                                Calculate Cost Plan
                                <span className="material-symbols-outlined">analytics</span>
                            </button>
                        </div>
                    </div>

                    {data.category === ResidentialCategory.COMMERCIAL_RESORT && (
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Resort & Commercial Support</p>
                            <div className="space-y-3">
                                {[
                                    { key: 'restaurant', label: 'Restaurant & Kitchen', icon: 'restaurant' },
                                    { key: 'pool', label: 'Swimming Pool & Deck', icon: 'pool' },
                                    { key: 'conference', label: 'Conference Facilities', icon: 'groups' }
                                ].map(f => (
                                    <button key={f.key} onClick={() => toggleFacility(f.key as any)} className={`w-full h-12 rounded-xl flex items-center justify-between px-4 text-xs font-bold border-2 transition-all ${data.sharedFacilities?.[f.key as keyof typeof data.sharedFacilities] ? 'border-[#13a4ec] bg-[#13a4ec]/5 text-[#13a4ec]' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>
                                        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">{f.icon}</span><span>{f.label}</span></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
                <button onClick={onBack} className="text-gray-400 font-black flex items-center gap-2 hover:text-[#111618] transition-all text-xs uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Return to Welcome Screen
                </button>
            </div>
        </div>
    );
};

export default ProjectConfigurationScreen;
