
import React, { useState } from 'react';

interface PaymentGatewayProps {
    amount: number;
    currency: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, currency, onSuccess, onCancel }) => {
    const [processing, setProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setProcessing(false);
            onSuccess();
        }, 2000);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(val).replace('US$', currency + ' ');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111618]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-[#111618] p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="size-10 bg-white/10 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined">lock</span>
                        </div>
                        <div>
                            <h3 className="font-black text-lg">Secure Checkout</h3>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">ArchFee Pro</p>
                        </div>
                    </div>
                    <button onClick={onCancel} className="text-white/50 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-8">
                    <div className="mb-8 text-center space-y-2">
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Total Amount</p>
                        <p className="text-4xl font-black text-[#111618]">{formatCurrency(amount)}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Card Number</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-300">credit_card</span>
                                <input
                                    required
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border-gray-100 rounded-xl font-bold font-mono focus:ring-[#13a4ec]"
                                    value={cardNumber}
                                    onChange={(e) => {
                                        const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                                        setCardNumber(v.replace(/(\d{4})(?=\d)/g, '$1 '));
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Expiry</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="MM/YY"
                                    className="w-full h-12 px-4 bg-gray-50 border-gray-100 rounded-xl font-bold font-mono text-center focus:ring-[#13a4ec]"
                                    value={expiry}
                                    onChange={(e) => {
                                        const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                        if (v.length >= 2) {
                                            setExpiry(`${v.slice(0, 2)}/${v.slice(2)}`);
                                        } else {
                                            setExpiry(v);
                                        }
                                    }}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">CVC</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="123"
                                    className="w-full h-12 px-4 bg-gray-50 border-gray-100 rounded-xl font-bold font-mono text-center focus:ring-[#13a4ec]"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-14 mt-4 bg-[#13a4ec] text-white font-black rounded-xl shadow-xl shadow-[#13a4ec]/20 hover:bg-[#118bc7] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                        >
                            {processing ? (
                                <>
                                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Pay {formatCurrency(amount)}
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-4 opacity-30">
                        <span className="material-symbols-outlined text-3xl">credit_card</span>
                        <span className="font-black text-xs">SECURE MOCK PAYMENT</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;
