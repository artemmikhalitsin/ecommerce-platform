class ProductDescription {
    constructor(price, weight, brandName, modelNumber) {
        this.price = price;
        this.weight = weight;
        this.brandName = brandName;
        this.modelNumber = modelNumber;
    }

    getPrice() {
      return this.price;
    }
    getWeight() {
       return this.weight;
    }
    getBrandName() {
      return this.brandName;
    }
    getModelNumber() {
      return this.modelNumber;
    }


    setPrice(price) {
      this.price = price;
    }
    setWeight(weight) {
      this.weight = weight;
    }
    setBrandName(brandName) {
      this.brandName = brandName;
    }
    setModelNumber(modelNumber) {
      this.modelNumber = modelNumber;
    }
}

module.exports = ProductDescription;
