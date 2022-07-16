var zoom = 1;

$('.zoom').on('click', function() {
    zoom += 0.1;
    $('.body-sub').css('zoom', zoom);
});
$('.zoom-init').on('click', function() {
    zoom = 1;
    $('.body-sub').css('zoom', zoom);
});
$('.zoom-out').on('click', function() {
    zoom -= 0.1;
    $('.body-sub').css('zoom', zoom);
});

