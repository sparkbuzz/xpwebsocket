class AltimeterGauge extends AbstractGauge {

    constructor(w, h, flight_data) {
        this.base_path = 'images/cessna-172/altimeter/';

        this.textures = new Map([
            ['barometer', {
                filename: 'barometer.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 0.5}
            }], ['background', {
                filename: 'background.png'
            }], ['needle_3', {
                filename: 'needle-3.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 0.645}
            }], ['needle_1', {
                filename: 'needle-1.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 0.665}
            }], ['needle_2', {
                filename: 'needle-2.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 0.66}
            }], ['bezel', {
                filename: 'bezel.png'
            }]
        ]);

        super(w, h, flight_data);
    }

    updateFrame() {
        this.sprites.get('needle_1').rotation = Math.rad(this.data.altitude / 1000 * 360);
        this.sprites.get('needle_2').rotation = Math.rad(this.data.altitude / 10000 * 360);
        this.sprites.get('needle_3').rotation = Math.rad(this.data.altitude / 100000 * 360);

        let baro = this.data.barometer > 0 ? this.data.barometer : 29.90;
        this.sprites.get('barometer').rotation = Math.rad((80 - ((baro - 29.10) / 1.6) * 160));
    }
}