let postDesktop = (desktopData) => {
    $.ajax({
        url: '/addItem/save',
        type: 'POST',
        data: $('#desktop-into').serialize(),
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
      let desktopData = $('form').serializeArray().reduce((obj, desktop) => {
          obj[desktop.name] = desktop.value;
          return obj;
      }, {});
          postDesktop(desktopData);
  }
