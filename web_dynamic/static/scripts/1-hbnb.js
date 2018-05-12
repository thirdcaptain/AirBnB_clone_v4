$( document ).ready(function () {
  let id_dict = {};
  $('input:checkbox').change(function() {
    if ($(this).is(':checked')) {
      id_dict[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      delete id_dict[$(this).attr('data-name')];
    }
    let list = [];
    $.each(id_dict, function(index, value){
      list.push(index);
    });
    if (list.length === 0) {
      $('.amenities h4').html("&nbsp;");
    } else {
      $('.amenities h4').text(list.join(', '));
    }
  })
});
