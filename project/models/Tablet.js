Class Tablet extends Computer{
    constructor(processor_type, ram_size, number_cpu_cores, harddrive_size, display_size, dimensions, battery_info, os, camera_info, price, weight, brand_name, model_number){
		super(processor_type, ram_size, number_cpu_cores, harddrive_size, price, weight, brand_name, model_number);
        this.display_size = display_size;
        this.dimensions = dimensions;
		this.battery_info = battery_info;
		this.os = os;
		this.camera_info = camera_info;
    }
}

get_display_size(){
  return this.display_size;
}
get_dimensions(){
   return this.dimensions;
}
get_battery_info(){
  return this.battery_info;
}
get_os(){
  return this.os;
}
get_camera_info(){
  return this.camera_info;
}
set_display_size(display_size){
  this.display_size = display_size;
}
set_dimensions(dimensions){
  this.dimensions = dimensions;
}
set_battery_info(battery_info){
  this.battery_info = battery_info;
}
set_os(os){
  this.os = os;
}
set_camera_info(camera_info){
  this.camera_info = camera_info;
}

module.exports = Tablet;
