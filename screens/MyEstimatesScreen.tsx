
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { ProjectData, CalculationResults } from '../types';

interface EstimateRecord {
    id: string;
    createdAt: string;
    projectName: string;
    data: ProjectData;
    results: CalculationResults;
}

interface MyEstimatesScreenProps {
    onLoadEstimate: (data: ProjectData) => void;
}

const MyEstimatesScreen: React.FC<MyEstimatesScreenProps> = ({ onLoadEstimate }) => {
    const { currentUser } = useAuth();
    const [estimates, setEstimates] = useState<EstimateRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEstimates = async () => {
            if (!currentUser) return;

            try {
                const q = query(
                    collection(db, 'estimates'),
                    where('userId', '==', currentUser.id),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const records: EstimateRecord[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    records.push({
                        id: doc.id,
                        createdAt: data.createdAt,
                        projectName: data.data.clientDetails?.name || 'Untitled Project',
                        data: data.data,
                        results: data.results
                    });
                });
                setEstimates(records);
            } catch (error) {
                console.error("Error fetching estimates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEstimates();
    }, [currentUser]);

    if (loading) return <div className="p-8 text-center">Loading estimates...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">My Estimates</h2>

            {estimates.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-slate-100">
                    <p className="text-slate-500 mb-4">You haven't saved any estimates yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {estimates.map((est) => (
                        <div key={est.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div>
                                <h3 className="font-semibold text-lg text-slate-800">{est.projectName}</h3>
                                <div className="text-sm text-slate-500 mt-1">
                                    {new Date(est.createdAt).toLocaleDateString()} • {est.data.country} • {est.results.currency} {est.results.totalFee.toLocaleString()}
                                </div>
                            </div>
                            <button
                                onClick={() => onLoadEstimate(est.data)}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium transition-colors"
                            >
                                Load
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEstimatesScreen;
