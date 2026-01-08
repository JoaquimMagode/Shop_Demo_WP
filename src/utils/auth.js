// Authentication Utilities

const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

const SESSION_KEY = 'admin_session';

export function login(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const session = {
            username,
            loginTime: new Date().toISOString(),
            token: generateToken()
        };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return { success: true, session };
    }
    return { success: false, error: 'Invalid credentials' };
}

export function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = '/admin.html';
}

export function isAuthenticated() {
    const session = sessionStorage.getItem(SESSION_KEY);
    return !!session;
}

export function getSession() {
    const sessionData = sessionStorage.getItem(SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
}

export function requireAuth() {
    if (!isAuthenticated()) {
        return false;
    }
    return true;
}

function generateToken() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
