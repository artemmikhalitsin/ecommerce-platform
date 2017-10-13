Class Monitor extends ProductDescription{
    constructor(display_size, touchescreen, price, weight, brand_name, model_number){
		super(price, weight, brand_name, model_number);
        this.display_size = display_size;
        this.touchescreen = touchescreen;
    }
}

get_display_size(){
  return this.display_size;
}
get_touchescreen(){
   return this.touchescreen;
}


set_display_size(display_size){
  this.display_size = display_size;
}
set_touchescreen(touchescreen){
  this.touchescreen = touchescreen;
}

module.exports = Monitor;
