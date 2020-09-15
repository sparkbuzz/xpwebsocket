/**
 * Main application class
 */
class Application {

    constructor() {
        /**
         * Static reference to Application singleton instance.
         * @type {Application}
         * @private
         */
        Application._instance = this;

        // Configure application configuration
        Config.loadDefaults();
        console.info('XPWebSocket running in ' + (Config.DEBUG ? 'DEBUG' : 'RELEASE') + ' mode');

        this.app_router = new AppRouter();
        this._flight_data = new FlightData();
        this.xpWebSocket = new XpWebSocket('ws://127.0.0.1:9999', this.flight_data);

        // Start Backbone navigation/routing engine.
        Backbone.history.start();
    }

    /**
     * Returns the singleton instance of Application
     * @returns {Application}
     */
    static getInstance() {
        return Application._instance;
    }

    /**
     * Return application flight data
     * @returns {*}
     */
    get flight_data() {
        return this._flight_data;
    }
}
