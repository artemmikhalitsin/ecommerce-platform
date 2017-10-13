class Dimensions {
    constructor(depth, height, width) {
        this.depth = depth;
        this.height = height;
        this.width = width;
    }

    getDepth() {
      return this.depth;
    }
    getHeight() {
       return this.height;
    }
    getWidth() {
       return this.width;
    }

    setDepth(depth) {
      this.depth= depth;
    }
    setHeight() {
      this.height = height;
    }
    setWidth() {
      this.width = width;
    }
}

module.exports = Dimensions;
