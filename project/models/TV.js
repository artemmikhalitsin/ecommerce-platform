class TV extends ProductDescription {
    constructor(dimensions, categoryName, price,
                weight, brandName, modelNumber) {
        super(price, weight, brandName, modelNumber);
        this.dimensions = dimensions;
        this.categoryName = categoryName;
    }
    getDimensions() {
      return this.dimensions;
    }
    getCategoryName() {
       return this.categoryName;
    }

    setDimensions(dimensions) {
      this.dimensions = dimensions;
    }
    setCategoryName(categoryName) {
      this.categoryName = categoryName;
    }
}

module.exports = TV;
