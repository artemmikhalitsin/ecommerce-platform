Class Laptop extends Computer{
    constructor(processor_type, ram_size, number_cpu_cores, harddrive_size, display_size, battery_info, os, touchscreen, camera, price, weight, brand_name, model_number){
		super(processor_type, ram_size, number_cpu_cores, harddrive_size, price, weight, brand_name, model_number);
        this.display_size = display_size;
		this.battery_info = battery_info;
		this.os = os;
		this.touchscreen = touchscreen;
		this.camera = camera;
    }
}

get_display_size(){
  return this.display_size;
}
get_touchscreen(){
   return this.touchscreen;
}
get_battery_info(){
  return this.battery_info;
}
get_os(){
  return this.os;
}
get_camera(){
  return this.camera;
}
set_display_size(display_size){
  this.display_size = display_size;
}
set_touchscreen(touchscreen){
  this.touchscreen = touchscreen;
}
set_battery_info(battery_info){
  this.battery_info = battery_info;
}
set_os(os){
  this.os = os;
}
set_camera(camera){
  this.camera = camera;
}

module.exports = Laptop;
