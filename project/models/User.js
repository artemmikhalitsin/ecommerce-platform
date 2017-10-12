Class User{
    constructor(email, name, address, password, isAdmin){
        this.email = email;
		this.name = name;
		this.address = address;
		this.password = password;
		this.isAdmin = isAdmin;
    }
}

get_email(){
  return this.email;
}
get_name(){
   return this.name;
}
get_password(){
  return this.password;
}
get_address(){
  return this.address;
}
get_isAdmin(){
  return this.isAdmin;
}


set_email(email){
  this.email = email;
}
set_name(name){
  this.name = name;
}
set_password(password){
  this.password = password;
}
set_address(address){
  this.address = address;
}
set_isAdmin(isAdmin){
  this.isAdmin = isAdmin;
}

module.exports = User;
