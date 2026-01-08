import React, { useState } from 'react';
import { db } from '../data/mockDatabase';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function VerifyPage() {
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);

    const handleVerify = (e) => {
        e.preventDefault();
        if (!code) return;
        const verification = db.verifyAuthenticity(code.trim());
        setResult(verification);
    };

    return (
        <div className="min-h-screen pt-32 pb-12 bg-white flex flex-col items-center">
            <div className="container max-w-md text-center">
                <ShieldCheck size={64} className="mx-auto mb-6 text-black" />
                <h1 className="font-heading text-4xl mb-4">Authenticity Check</h1>
                <p className="text-gray-500 mb-8">Enter the unique code found on your product tag to verify its origin.</p>

                <form onSubmit={handleVerify} className="relative mb-12">
                    <input
                        className="text-center font-mono text-lg tracking-widest uppercase"
                        placeholder="SC-XXXX-XXXX"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                    <button className="btn w-full mt-4">Verify Code</button>
                </form>

                {result && (
                    <div className={`p-8 border ${result.status === 'authentic' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} animate-fade-in`}>
                        {result.status === 'authentic' ? (
                            <>
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">✓</div>
                                <h3 className="font-heading text-xl mb-2 text-green-900">Verified Authentic</h3>
                                <p className="text-sm text-green-800 mb-4">{result.message}</p>
                                <div className="text-xs uppercase tracking-widest text-green-700">Scan Count: {result.scans}</div>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">✕</div>
                                <h3 className="font-heading text-xl mb-2 text-red-900">Verification Failed</h3>
                                <p className="text-sm text-red-800">{result.message}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
