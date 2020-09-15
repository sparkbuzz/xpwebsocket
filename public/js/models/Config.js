class Config {

    static loadDefaults() {
        let defaults = new Map([
            ['DEBUG', false],
            ['GRID_LINES', false]
        ]);

        for (let [k, v] of defaults.entries()) {
            localStorage.setItem(k, v);
        }
    }

    static get DEBUG() {
        return localStorage.getItem('DEBUG') === 'true';
    }

    static get GRID_LINES() {
        return localStorage.getItem('GRID_LINES') === 'true';
    }
}