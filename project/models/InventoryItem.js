Class InventoryItem{
    constructor(price, weight, brand_name, model_number){
        this.price = price;
        this.weight = weight;
		this.brand_name = brand_name;
		this.model_number = model_number;
    }
}

get_price(){
  return this.price;
}
get_weight(){
   return this.weight;
}
get_brand_name(){
  return this.brand_name;
}
get_model_number(){
  return this.model_number;
}


set_price(price){
  this.price = price;
}
set_weight(weight){
  this.weight = weight;
}
set_brand_name(brand_name){
  this.brand_name = brand_name;
}
set_model_number(model_number){
  this.model_number = model_number;
}


module.exports = InventoryItem;
