$(function(){ // jQuery DOM ready
    $('.test').click(function () { // click event for <a class="test">
      var level = $(this).data('level'); // from data-level="N"
      var url = '/test?level=' + escape(level);
      console.log('client url:', url);
  
      // HTTP GET http://localhost:3000/test?level=
      $.get(url, function (data) {
        console.log('client data:', data); // browser console
      });
  
      return false; // don't navigate to href="#"
    });
  });