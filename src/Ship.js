const createShip = function(length) {
    return {
        length,
        hitNumberTimes : 0,

        getLength: function() {
            return this.length;
        },
        getHitNumberTimes: function() {
            return this.hitNumberTimes;
        },

        hit: function() {
            this.hitNumberTimes +=1;
        },

        isSunk: function() {
            if(this.hitNumberTimes >= this.length) return true ;
            else return false;
        }
    }
}

export { createShip }; 