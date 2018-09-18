
$(document).ready(function () {


    ymaps.ready(init);
    
    
});

function init() {


    var myMap = new ymaps.Map("map", {
        center: [55.753215, 37.622504]
        , zoom: 16
        , controls: ['zoomControl']
    });


    myMap.behaviors.disable('multiTouch');
    myMap.behaviors.disable('scrollZoom');
    var myGeoObjects = [];
    var flag_for_center = true;



    $(".contacts__show_on_map").each(function (e) {
        var latt = $(this).find('span').attr("data-lat");
        var longg = $(this).find('span').attr("data-lon");
        if (flag_for_center) {
            myMap.setCenter([latt, longg], 16, {
                checkZoomRange: false
            });
            flag_for_center = false;
        }
        myGeoObjects[e] = new ymaps.Placemark([latt, longg], {
            clusterCaption: 'Заголовок'
        }, {
            iconLayout: 'default#image'
            , iconImageHref: 'img/mark-map.png'
            , iconImageSize: [113, 122]
            , iconImageOffset: [-53.5, -85]
        });
    });


    var clusterIcons = [{
        href: 'img/marker-1.png'
        , size: [76, 70]
        , offset: [0, 0]
    }];


    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false
        , clusterOpenBalloonOnClick: false
        , clusterBalloonPanelMaxMapArea: 0
        , clusterBalloonContentLayoutWidth: 300
        , clusterBalloonContentLayoutHeight: 200
        , clusterBalloonPagerSize: 2
        , clusterBalloonPagerVisible: false
    });


    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);



    $('.contacts__show_on_map span').click(function(){
        myMap.setCenter(
            [parseFloat($(this).attr("data-lat"))
                , parseFloat($(this).attr("data-lon"))], 16, {
                checkZoomRange: false
            });

        if ($(window).width() < 768) {
            $('html, body').animate({scrollTop: $('#map').offset().top});
        }
    });



}
    

