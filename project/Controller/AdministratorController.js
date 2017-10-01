let AdministratorController = function() {
    let deskTopRepo = new DesktopRepository();
};

AdministratorController.prototype.save = function(desktop) {
    console.log('Im alive');
    deskTopRepo.save(desktop);
};
