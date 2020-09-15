class FlightData extends Backbone.Model {

    constructor() {
        this._raw = null;
        this._arFloat32 = new Float32Array(10);
    }

    get raw() {
        return this._raw;
    }

    set raw(value) {
        this._raw = value;
        this._arFloat32 = new Float32Array(value);
    }

    // Indicated Airspeed

    get indicated_airspeed() {
        return this.readFloat32(0);
    }

    set indicated_airspeed(value) {
        this._arFloat32[0] = value;
    }

    // Altitude

    get altitude() {
        return this.readFloat32(1);
    }

    set altitude(value) {
        this._arFloat32[1] = value;
    }

    // Barometer

    get barometer() {
        return this.readFloat32(2);
    }

    set barometer(value) {
        this._arFloat32[2] = value;
    }

    // Magnetic Heading

    get magnetic_heading() {
        return this.readFloat32(3);
    }

    set magnetic_heading(value) {
        this._arFloat32[3] = value;
    }

    // Autopilot Heading

    get autopilot_heading() {
        return this.readFloat32(4);
    }

    set autopilot_heading(value) {
        return this._arFloat32[4] = value;
    }

    // Slip Angle

    get slip_angle() {
        return this.readFloat32(5);
    }

    set slip_angle(value) {
        this._arFloat32[5] = value;
    }

    // Turn Rate

    get turn_rate() {
        return this.readFloat32(6);
    }

    set turn_rate(value) {
        this._arFloat32[6] = value;
    }

    // Vertical Speed

    get vertical_speed() {
        return this.readFloat32(7);
    }

    set vertical_speed(value) {
        this._arFloat32[7] = value;
    }

    // Pitch Angle

    get pitch_angle() {
        return this.readFloat32(8);
    }

    set pitch_angle(value) {
        this._arFloat32[8] = value;
    }

    // Roll Angle

    get roll_angle() {
        return this.readFloat32(9);
    }

    set roll_angle(value) {
        this._arFloat32[9] = value;
    }

    readFloat32(index) {
        if (this._arFloat32 != null && this._arFloat32.length > 0) {
            return parseFloat(this._arFloat32[index]);
        }
        return 0;
    }
}