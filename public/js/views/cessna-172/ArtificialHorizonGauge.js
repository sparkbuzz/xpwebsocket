class ArtificialHorizonGauge extends AbstractGauge {

    constructor(w, h, flight_data) {
        this.base_path = 'images/cessna-172/artificial_horizon/';

        this.textures = new Map([
            ['background', {
                filename: 'background.png'
            }], ['horizon', {
                filename: 'horizon.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 0.5}
            }], ['sight', {
                filename: 'sight.png',
                position: {x: '50%', y: '47%'},
                anchor: {x: 0.5, y: 0}
            }], ['bank_index', {
                filename: 'bank-index.png',
                position: {x: '50%', y: '50%'},
                anchor: {x: 0.5, y: 0.5}
            }], ['bank_marker', {
                filename: 'bank-marker.png',
                position: {x: '50%', y: '12%'},
                anchor: {x: 0.5, y: 0.5}
            }], ['bezel', {
                filename: 'bezel.png'
            }]
        ]);

        super(w, h, flight_data);
    }

    addToStage() {
        super.addToStage();

        // Move the horizon sprite to a blank parent, to manage pitch and rotation separately
        let parent_sprite = new PIXI.Sprite();
        let horizon_sprite = this.container.removeChildAt(1);
        parent_sprite.addChild(horizon_sprite);

        parent_sprite.position.set(this.max_width * 0.5, this.max_height * 0.5);
        parent_sprite.anchor.set(0.5, 0.5);
        horizon_sprite.position.set(0, 0);

        this.container.addChildAt(parent_sprite, 1);
        this.sprites.set('horizon_parent', parent_sprite);
    }

    updateFrame() {
        let roll_angle = Math.rad(this.data.roll_angle);
        this.sprites.get('horizon_parent').rotation = -roll_angle;
        this.sprites.get('bank_index').rotation = -roll_angle;

        var p = this.data.pitch_angle / (15 / 34);
        this.sprites.get('horizon').y = Math.clip(-90, 90, p);
    }

}