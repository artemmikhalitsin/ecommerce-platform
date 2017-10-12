Class Desktop extends Computer{
    constructor(processor_type, ram_size, number_cpu_cores, harddrive_size, dimensions, price, weight, brand_name, model_number){
		super(processor_type, ram_size, number_cpu_cores, harddrive_size, price, weight, brand_name, model_number);
        this.dimensions = dimensions;
    }
}

get_dimensions(){
  return this.dimensions;
}
set_dimensions(dimensions){
  this.dimensions = dimensions;
}

module.exports = Desktop;


