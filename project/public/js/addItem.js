let postDesktop = (desktopData) => {
    $.ajax({
        url: 'http://localhost:8080/Controller/AdministratorController/save',
        type: 'POST',
        data: desktopData,
        success: function(data){
            alert("success!");
            console.log(data);
        },
        error: function(error){
            console.log(error);
        }
    })
}
let addDesktop = () => {
    alert("in add method");
    let desktopData = $('form').serializeArray().reduce((obj, desktop) => {
        obj[desktop.name] = desktop.value;
        return obj;
    }, {});
    alert("in add desktop");
        postDesktop(desktopData);
}