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
        this._id = id;
        this._depth = depth;
        this._height = height;
        this._width = width;
    }
    /**
     * id accessor
     * @return {number} the dimension id
     */
    get id() {
      return this._id;
    }
    /**
     * id mutator. id is immutable, so this function does nothing
     * and exists only for interfacing purposes
     * @param {number} newId the new Id (ignored)
     */
    set id(newId) {/* id is immutable */};
    /**
     * depth accessor
     * @return {number} depth
     */
    get depth() {
      return this._depth;
    }
    /**
    * depth mutator
    * @param {number} depth new depth
    */
    set depth(depth) {
      this._depth = depth;
    }
    /**
     * height accessor
     * @return {number} height
     */
    get height() {
       return this._height;
    }
    /**
    * height mutator
    * @param {number} height new height
    */
    set height(height) {
      this._height = height;
    }
    /**
     * width accessor
     * @return {number} width
     */
    get width() {
       return this._width;
    }
    /**
     * width mutator
     * @param {number} width new width
     */
    set width(width) {
      this._width = width;
    }
    /**
     * Creates a clone of the current dimension objects
     * @return {Dimensions} a copy of the object
     */
    clone() {
      return new Dimensions(
        this.id,
        this.depth,
        this.height,
        this.width
      );
    }
}

module.exports = Dimensions;
