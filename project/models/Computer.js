Class Computer extends ProductDescription{
    constructor(processor_type, ram_size, number_cpu_cores, harddrive_size, price, weight, brand_name, model_number){
		super(price, weight, brand_name, model_number);
        this.processor_type = processor_type;
        this.ram_size = ram_size;
		this.number_cpu_cores = number_cpu_cores;
		this.harddrive_size = harddrive_size;
    }
}

get_processor_type(){
  return this.processor_type;
}
get_ram_size(){
   return this.ram_size;
}
get_number_cpu_cores(){
  return this.number_cpu_cores;
}
get_harddrive_size(){
  return this.harddrive_size;
}


set_processor_type(processor_type){
  this.processor_type = processor_type;
}
set_ram_size(ram_size){
  this.ram_size = ram_size;
}
set_number_cpu_cores(number_cpu_cores){
  this.number_cpu_cores = number_cpu_cores;
}
set_harddrive_size(harddrive_size){
  this.harddrive_size = harddrive_size;
}


module.exports = Computer;
