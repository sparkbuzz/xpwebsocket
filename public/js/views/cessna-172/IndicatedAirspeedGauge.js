class IndicatedAirspeedGauge extends AbstractGauge {

    constructor(w, h, flight_data) {
        this.base_path = 'images/cessna-172/indicated_airspeed/';

        this.textures = new Map([
            ['background', {
                filename: 'background.png'
            }], ['needle', {
                filename: 'needle.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 0.725}
            }]
        ]);

        super(w, h, flight_data);
    }

    static interpolate(knots) {
        let a1, a2, k1, k2;

        let intervals = {
            0: 0.00,
            40: 29.73,
            50: 49.00,
            60: 69.67,
            70: 91.25,
            80: 114.51,
            90: 137.42,
            100: 162.68,
            110: 185.38,
            120: 206.40,
            130: 222.46,
            140: 238.30,
            150: 252.54,
            160: 267.25,
            170: 279.28,
            180: 291.76,
            190: 304.81,
            200: 317.29,
            210: 317.19 + 12.5,
            220: 317.19 + (12.5 * 2),
            230: 317.19 + (12.5 * 3),
            240: 317.19 + (12.5 * 4)
        };

        for (var key in intervals) {
            var float_key = parseFloat(key);
            if (knots < float_key) {
                k1 = float_key - 10;
                if (typeof intervals[k1] == 'undefined') {
                    a1 = 0;
                    k1 = 0;
                } else {
                    a1 = intervals[k1];
                }

                k2 = float_key;
                a2 = intervals[k2];

                break;
            }
        }

        return a1 + (a2 - a1) * (knots - k1) / (k2 - k1);
    }

    updateFrame() {
        var knots = this.data.indicated_airspeed;
        var needle_degrees = IndicatedAirspeedGauge.interpolate(knots);
        this.sprites.get('needle').rotation = Math.rad(Math.clip(0, 360, needle_degrees));
    }
}