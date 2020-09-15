/**
 * Main application view
 */
class HomeView extends Backbone.View {

    /**
     * Initialize the view and flight gauges.
     */
    constructor() {
        let app = Application.getInstance();

        this.gauges = new Map();

        var w = Math.min($('body').outerWidth() / 3, 1200 / 3);
        var h = w;

        this.gauges.set('indicated_airspeed', new IndicatedAirspeedGauge(w, h, app.flight_data));
        this.gauges.set('artificial_horizon', new ArtificialHorizonGauge(w, h, app.flight_data));
        this.gauges.set('altimeter', new AltimeterGauge(w, h, app.flight_data));
        this.gauges.set('turn_coordinator', new TurnCoordinatorGauge(w, h, app.flight_data));
        this.gauges.set('heading_indicator', new HeadingIndicatorGauge(w, h, app.flight_data));
        this.gauges.set('vertical_speed', new VerticalSpeedGauge(w, h, app.flight_data));

        for (let gauge of this.gauges.values()) {
            var $view = $('<span>')
                .append(gauge.fpsView)
                .append(gauge.view);
            $('div.gauges').append($view);
        }
    }
}