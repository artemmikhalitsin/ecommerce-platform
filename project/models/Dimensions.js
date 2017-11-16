/**
 * Class representing Dimensions
 * @extends {Computer}
 * @author TODO: IF YOU'RE THE AUTHOR OF THIS CLASS PLEASE
 * ATTRIBUTE THIS TO YOURSELF
 */

class Dimensions {
    /**
     * Given depth, height and width creates a dimension object
     * @param {String} id id
     * @param {number} depth depth a product
     * @param {number} height height of a product
     * @param {number} width width of a product
     */
    constructor(id, depth, height, width) {
        this.id = id;
        this.depth = depth;
        this.height = height;
        this.width = width;
    }
    /**
     * depth accessor
     * @return {number} depth
     */
    getDepth() {
      return this.depth;
    }
    /**
     * height accessor
     * @return {number} height
     */
    getHeight() {
       return this.height;
    }
    /**
     * width accessor
     * @return {number} width
     */
    getWidth() {
       return this.width;
    }
    /**
     * depth mutator
     * @param {number} depth new depth
     */
    setDepth(depth) {
      this.depth = depth;
    }
    /**
     * height mutator
     * @param {number} height new height
     */
    setHeight() {
      this.height = height;
    }
    /**
     * width mutator
     * @param {number} width new width
     */
    setWidth() {
      this.width = width;
    }
}

module.exports = Dimensions;
