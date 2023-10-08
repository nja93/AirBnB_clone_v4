$(document).ready(function () {
  const currAmenities = {};

  $("input[type='checkbox']").on('change', function () {
    if (this.checked) {
      currAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete currAmenities[$(this).data('id')];
    }
    const amenities = Object.values(currAmenities);
    $('div.amenities > h4').text(amenities.join(', '));
  });
  $.get("http://127.0.0.1:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("div#api_status").addClass("available");

      $.ajax({
	      type: "POST",
	      url: "http://127.0.0.1:5001/api/v1/places_search/",
	      data: "{}",
	      contentType: "application/json",
	      dataType: "json",
	      success: function (data) {
		      // alert(Object.keys(data[0]));
		      for (let i = 0; i < data.length; i++) {
			      let place = data[i];
			      // alert(place.name);
			      let article = $("<article></article>");
			      let placeHtml = `
			      <div class="title_box">
			      	<h2>${place.name}</h2>
				<div class="price_by_night">
				  $${place.price_by_night}
				</div>
			      </div>
			      <div class="information">
			      	<div class="max_guest">
				  ${place.max_guest} Guests
				</div>
			      <div class="number_rooms">
				  ${place.number_rooms} Bedrooms
			      </div>
			      <div class="number_bathrooms">
				  ${place.number_bathrooms} Bathrooms
				</div>
			      </div>
			      <div class="user"><b>Owner</b>: ${place.usernames}</div>
			      <div class="description">${place.description}</div>
			      `;
			      article.html(placeHtml);
			      $(".places").append(article);
		      }
	      },
	      error: function (xhr, status, error) {
		      alert("error");
	      }
      });
    } else {
      // alert("NOP");
      $('div#api_status').removeClass('available');
    }
  });
});
