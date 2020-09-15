class TurnCoordinatorGauge extends AbstractGauge {

    constructor(w, h, flight_data) {
        this.base_path = 'images/cessna-172/turn_coordinator/';

        this.textures = new Map([
            ['background', {
                filename: 'background.png'
            }], ['ball', {
                filename: 'ball.png',
                position: {x: '50%', y: '-29%'},
                anchor: {x: 0.5, y: -10}
            }], ['bezel', {
                filename: 'bezel.png'
            }], ['plane', {
                filename: 'plane.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 0.72}
            }]
        ]);

        super(w, h, flight_data);
    }

    updateFrame() {
        this.sprites.get('plane').rotation = Math.rad( Math.clip(-65, 65, this.data.turn_rate) );
        this.sprites.get('ball').rotation = Math.rad( Math.clip(-13.5, 13.5, this.data.slip_angle) );
    }
}