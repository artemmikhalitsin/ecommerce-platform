var AdministratorController = function(){

    var deskTopRepo = new DesktopRepository(); 
    
};

AdministratorController.prototype.save = function(desktop){
    deskTopRepo.save(desktop);
}