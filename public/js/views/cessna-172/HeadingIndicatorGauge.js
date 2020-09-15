class HeadingIndicatorGauge extends AbstractGauge {

    constructor(w, h, flight_data) {
        this.base_path = 'images/cessna-172/heading_indicator/';

        this.textures = new Map([
            ['background', {
                filename: 'background.png'
            }], ['bezel', {
                filename: 'bezel.png'
            }], ['bug', {
                filename: 'bug.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 8.35}
            }], ['compass', {
                filename: 'compass.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 0.5}
            }]
        ]);

        super(w, h, flight_data);
    }

    updateFrame() {
        this.sprites.get('compass').rotation = -Math.rad(this.data.magnetic_heading);
        this.sprites.get('bug').rotation = -Math.rad(this.data.magnetic_heading - this.data.autopilot_heading);
    }
}
