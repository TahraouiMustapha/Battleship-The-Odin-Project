const createShip = function(length) {
    return {
        length,
        hitNumberTimes : 0,
        haveSunk : false,
        getHitNumberTimes: function() {
            return this.hitNumberTimes;
        },

        hit: function() {
            this.hitNumberTimes +=1;
        },

        isSunk: function() {
            
        }
    }
}

export { createShip }; 