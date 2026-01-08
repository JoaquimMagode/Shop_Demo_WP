// QR Code Generation Utilities
import QRCode from 'qrcode';

export function generateAuthCode() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9).toUpperCase();
    return `SC-${timestamp}-${random}`;
}

export async function generateQRCode(data, size = 200) {
    try {
        const qrDataURL = await QRCode.toDataURL(data, {
            width: size,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });
        return qrDataURL;
    } catch (error) {
        console.error('QR Code generation error:', error);
        return null;
    }
}

export function createVerificationURL(authCode) {
    const baseURL = window.location.origin;
    return `${baseURL}/verify.html#/verify/code/${authCode}`;
}

export async function renderQRCode(container, authCode) {
    const verifyURL = createVerificationURL(authCode);
    const qrDataURL = await generateQRCode(verifyURL);

    if (qrDataURL && container) {
        const img = document.createElement('img');
        img.src = qrDataURL;
        img.alt = 'QR Code for authenticity verification';
        img.className = 'qr-code-image';
        container.innerHTML = '';
        container.appendChild(img);
    }
}
