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
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      // alert("OK");
      $('div#api_status').addClass('available');
    } else {
      // alert("NOP");
      $('div#api_status').removeClass('available');
    }
  });
});
