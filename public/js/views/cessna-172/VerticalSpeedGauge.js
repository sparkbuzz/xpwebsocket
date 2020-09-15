class VerticalSpeedGauge extends AbstractGauge {

    constructor(w, h, flight_data) {
        this.base_path = 'images/cessna-172/vertical_speed/';

        this.textures = new Map([
            ['background', {
                filename: 'background.png'
            }], ['needle', {
                filename: 'needle.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 0.65}
            }], ['bezel', {
                filename: 'bezel.png'
            }]
        ]);

        super(w, h, flight_data);
    }

    updateFrame() {
        this.sprites.get('needle').rotation = Math.rad((this.data.vertical_speed / 100 * 8) - 90);
    }

}