
import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { CountryKey, RegionConfig } from '../types';

export const useRegionalData = (initialData: Record<CountryKey, RegionConfig>) => {
    const [activeRegionalData, setActiveRegionalData] = useState<Record<CountryKey, RegionConfig>>(initialData);
    const [isSyncing, setIsSyncing] = useState(false);

    const syncLiveRates = useCallback(async (country: CountryKey) => {
        setIsSyncing(true);
        try {
            // Note: In a production environment, API keys should be handled more securely.
            const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
            if (!apiKey) {
                console.warn("API Key not found");
                setIsSyncing(false);
                return;
            }

            const ai = new GoogleGenAI({ apiKey });
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash-thinking-exp-01-21",
                contents: `Fetch current residential construction rates for ${country}. Include rates for Luxury and Premium standards.`,
                config: {
                    thinkingConfig: { thinkingBudget: 1024 },
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
                                    "High End": { type: Type.NUMBER },
                                    "Premium": { type: Type.NUMBER },
                                    "Luxury": { type: Type.NUMBER }
                                },
                                required: ["Basic", "Standard", "High End", "Premium", "Luxury"]
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

            const text = response.text();
            // Only parse if text is present
            if (!text) throw new Error("No response text");

            const rawData = JSON.parse(text);
            const locationsRecord: Record<string, number> = {};
            if (Array.isArray(rawData.locations)) {
                rawData.locations.forEach((loc: { name: string; multiplier: number }) => {
                    locationsRecord[loc.name] = loc.multiplier;
                });
            }

            setActiveRegionalData((prev: Record<CountryKey, RegionConfig>) => ({
                ...prev,
                [country]: { ...rawData, locations: locationsRecord, isLive: true, lastSync: new Date().toLocaleTimeString() }
            }));
        } catch (error) {
            console.error("Sync Failed:", error);
        } finally {
            setIsSyncing(false);
        }
    }, []);

    return { activeRegionalData, isSyncing, syncLiveRates };
};
