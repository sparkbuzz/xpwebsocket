(function () {
    /**
     * Clips the given value fall within the low and high values. result = (low <= value <= high)
     *
     * @param low
     * @param high
     * @param value
     * @returns {number}
     */
    Math.clip = function (low, high, value) {
        return Math.max(Math.min(high, value), low);
    };

    /**
     * Converts the given amount in degrees to a radian
     * @param deg
     * @returns {number}
     */
    Math.rad = function (deg) {
        return deg * Math.PI / 180;
    };
})();