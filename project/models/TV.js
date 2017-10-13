Class TV extends ProductDescription{
    constructor(dimensions, category_name, price, weight, brand_name, model_number){
		super(price, weight, brand_name, model_number);
        this.dimensions = dimensions;
        this.category_name = category_name;
    }
}

get_dimensions(){
  return this.dimensions;
}
get_category_name(){
   return this.category_name;
}


set_dimensions(dimensions){
  this.dimensions = dimensions;
}
set_category_name(category_name){
  this.category_name = category_name;
}

module.exports = TV;