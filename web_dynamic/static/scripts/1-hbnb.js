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
});
