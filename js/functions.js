
function slideonlyone(thechosenone) {
     $('.fbe-hidden').each(function(index) {
          if ($(this).attr("id") == thechosenone) {
               $(this).slideDown(200);
          }
          else {
               $(this).slideUp(600);
          }
     });
}