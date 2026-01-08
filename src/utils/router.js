// Simple Hash-based Router for SPA

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;

        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    handleRoute() {
        const hash = window.location.hash.slice(1);
        // Remove leading slash if present to handle both '#/path' and '#path'
        const cleanPath = hash.startsWith('/') ? hash.slice(1) : hash;
        const [path, ...paramParts] = cleanPath.split('/');

        // If path is empty (e.g. root hash), default to empty string which matches '/' in addRoute if handled properly
        // Actually, let's normalize: if path is empty, it's root.
        const normalizedPath = path ? `/${path}` : '/';
        const params = this.parseParams(paramParts);

        this.currentRoute = { path: normalizedPath, params };

        const handler = this.routes[this.currentRoute.path] || this.routes['/404'];
        if (handler) {
            handler(params);
        }
    }

    parseParams(parts) {
        const params = {};
        for (let i = 0; i < parts.length; i += 2) {
            if (parts[i] && parts[i + 1]) {
                params[parts[i]] = decodeURIComponent(parts[i + 1]);
            }
        }
        return params;
    }

    navigate(path) {
        window.location.hash = path;
    }

    getParam(key) {
        return this.currentRoute?.params?.[key];
    }
}

export const router = new Router();
