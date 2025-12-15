const KEY = "rps_stats_v1";

export function loadStats() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : { player: 0, computer: 0, games: 0 };
    } catch {
        return { player: 0, computer: 0, games: 0 };
    }
}

export function saveStats(stats) {
    localStorage.setItem(KEY, JSON.stringify(stats));
}

export function clearStats() {
    localStorage.removeItem(KEY);
}