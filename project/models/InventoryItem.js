Class Dimensions{
    constructor(depth, height, width){
        this.depth = depth;
        this.height = height;
		this.width = width;
    }
}


get_depth(){
  return this.depth;
}
get_height(){
   return this.height;
}
get_width(){
   return this.width;
}


set_depth(depth){
  this.depth= depth;
}
set_height(){
  this.height = height;
}
set_width(){
  this.width = width;
}

module.exports = Dimensions;
