$(document).ready(function () {

  let idDict = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      idDict[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      delete idDict[$(this).attr('data-name')];
    }
    let list = [];
    $.each(idDict, function (index, value) {
      list.push(index);
    });
    if (list.length === 0) {
      $('.amenities h4').html("&nbsp;");
    } else {
      $('.amenities h4').text(list.join(', '));
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status', function (data) {
    if (data['status'] === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  }, 'json');

  $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      dataType: 'json',
      data: '{}',
      success: create_places
    });

  function create_places (data) {
    let places = '';
    for (let i in data) {
      const name = data[i].name;
      const price = data[i].price_by_night;
      const desc = data[i].description;
      const guest = data[i].max_guest;
      const bed = data[i].number_rooms;
      const bath = data[i].bathrooms;
      let place = `
      <ARTICLE>
         <div class="price_title">
	   <div class="article_title"><h2>${name}</h2></div>
	   <div class="price_by_night"><div class="price">$${price}</div></div>
         </div>
	 <div class="information">
	   <div class="max_guest">
             <div class="guest_icon"></div>
             <div class="guest_number"><h2>${guest} Guests</h2></div>
           </div>
           <div class="number_rooms">
             <div class="rooms_icon"></div>
             <div class="rooms_number"><h2>${bed} Bedrooms</h2></div>            
           </div>
           <div class="number_bathrooms">
             <div class="bathrooms_icon"></div>
             <div class="bathrooms_number"><h2>${bath} Bathrooms</h2></div>
           </div>
	 </div>
         <div class="discription">${desc}</div>
      </ARTICLE>
      `
      places += place;
    };
    $('.places').append(places);
  };

});
