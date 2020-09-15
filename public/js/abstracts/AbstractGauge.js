/**
 * Abstract base class for implementing flight simulator gauges.
 */
class AbstractGauge {

    /**
     * @param {int} w Width in pixels
     * @param {int} h Height in pixels
     * @param {FlightData} flight_data
     */
    constructor(w, h, flight_data) {
        if (this.constructor.name == 'Gauge') {
            throw new Error("Invalid instantiation of abstract class " + this.constructor.name);
        }

        this.data = flight_data;
        this.stage = null;
        this.sprites = new Map();

        this.max_width = 400;
        this.max_height = 400;
        this.width = w;
        this.height = h;

        Config.DEBUG ? this.initializeFpsMeter() : null;
        this.initializeStage(w, h);
        this.loadAssets();
    }

    /**
     * Returns the PixiJS render view
     * @returns {null}
     */
    get view() {
        return this.renderer.view;
    }

    /**
     * Returns the FPS DOM element
     * @returns {f|*}
     */
    get fpsView() {
        if (this.fps_meter) {
            return this.fps_meter.hasOwnProperty('domElement') ? this.fps_meter.domElement : null;
        }
        return null;
    }

    /**
     * Add child sprites to the gauge's stage.
     */
    addToStage() {
        this.container = new PIXI.DisplayObjectContainer();
        this.container.width = this.width;
        this.container.height = this.height;
        this.container.scale.x = this.container.scale.y = this.width / this.max_width;
        this.stage.addChild(this.container);

        for (var [key, sprite] of this.sprites.entries()) {

            // Configure sprite position
            let position = this.textures.get(key).position;
            if (typeof position !== 'undefined') {
                sprite.position.set(
                    this._resolve(position.x, this.max_width),
                    this._resolve(position.y, this.max_height)
                );
            }

            // Configure sprite anchor point
            let anchor = this.textures.get(key).anchor;
            if (typeof anchor !== 'undefined') {
                sprite.anchor.set(
                    this._resolve(anchor.x, this.max_width),
                    this._resolve(anchor.y, this.max_height)
                );
            }

            this.container.addChild(sprite);
        }
    }

    /**
     * Draw guides to aid in needle positioning.
     */
    drawGuides() {
        let g = new PIXI.Graphics();
        g.lineStyle(1, 0x00FF00);
        g.moveTo(0, this.height / 2);
        g.lineTo(this.width, this.height / 2);
        g.moveTo(this.width / 2, 0);
        g.lineTo(this.width / 2, this.height);
        this.stage.addChild(g);
    }

    /**
     * Initialize and append the FPS meter to the stage.
     */
    initializeFpsMeter() {
        this.fps_meter = new Stats();
        this.fps_meter.setMode(0);
    }

    /**
     *
     * @param w
     * @param h
     */
    initializeStage(w, h) {
        this.stage = new PIXI.Stage(0);
        this.renderer = new PIXI.CanvasRenderer(w, h, {transparent: true});
    }

    /**
     * Create sprites from textures.
     */
    initializeSprites() {
        for (var [key, texture] of this.textures.entries()) {
            let pixi_tex = new PIXI.Texture.fromImage(this.base_path + texture.filename);
            this.sprites.set(key, new PIXI.Sprite(pixi_tex));
        }
    }

    /**
     * Load assets from the textures Map.
     */
    loadAssets() {
        let assets = [];

        for (let texture of this.textures.values()) {
            assets.push(this.base_path + texture.filename);
        }

        var loader = new PIXI.AssetLoader(assets);
        loader.onComplete = this.onAssetsLoaded.bind(this);

        loader.load();
    }

    /**
     * Event fired when initialization for the gauge has completed.
     */
    onInitializationComplete() {
        Config.DEBUG ? console.info('['+ this.constructor.name + '] Initialization complete') : null;
    }

    /**
     * Event fired when all assets have been loaded for the gauge.
     */
    onAssetsLoaded() {
        this.initializeSprites();
        this.addToStage();
        requestAnimationFrame(this.render.bind(this));

        if (Config.GRID_LINES) {
            this.drawGuides();
        }

        this.onInitializationComplete();
    }

    /**
     * Render the frame and optionally, in debug mode, update the FPS meter.
     */
    render() {
        Config.DEBUG ? this.fps_meter.begin() : null;

        requestAnimFrame(this.render.bind(this));
        this.updateFrame();
        this.renderer.render(this.stage);

        Config.DEBUG ? this.fps_meter.end() : null;
    }

    /**
     * Inline function to resolve x, y positions and anchors
     * @param val A value to be resolved. Can be a function, number or string like '50%'.
     * @param boundary A boundary value, typically width or height of the parent within which val is resolved.
     * @returns {number}
     * @private
     */
    _resolve(val, boundary) {
        let result = null;

        switch (typeof val) {
            case 'function':
                result = position.x.bind(this)();
                break;

            case 'string':
                if (val.lastIndexOf('%' != -1)) {
                    result = boundary * parseFloat(val) / 100;
                }
                break;

            case 'number':
                result = val;
                break;

            default:
                throw new Error(this.constructor.name + ".addToStage unable resolve metric!");
        }

        return result;
    }

    /**
     * Update needle positions and counters.
     */
    updateFrame() {
        throw new Error('Abstract method ' + this.constructor.name + '.updateFrame has not been implemented!');
    }

}