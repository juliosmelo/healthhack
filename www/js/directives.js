angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr, $http) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-22.918248, -43.374064),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var hospitals = [
          ['Clínica do Detran da Estação Penha', 'Rua Plínio de Oliveira, 29 - Penha, Rio de Janeiro - RJ, 21070-040, Brazil', -22.841306, -43.279485, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Relais et Chateaux Santa Teresa', 'Rua Almirante Alexandrino, 660 - Santa Teresa, Rio de Janeiro - RJ, 20241-260, Brazil', -22.921786, -43.187768, 'http://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png'],
          ['Fontes – Alimentação Natural', 'Rua Visconde de Pirajá, 605 - Ipanema, Rio de Janeiro - RJ, 22410-002, Brazil', -22.984139, -43.213081, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Farmácia Nova Parada Modelo Ltda', 'Rua Alcindo José Ferreira, 31 - Parada Modelo, Guapimirim - RJ, 25940-000, Brazil', -22.546581, -42.985446, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Hemorio', 'Rua Frei Caneca, 8 - Centro, Rio de Janeiro - RJ, 20211-030, Brazil', -22.909119, -43.189628, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Mantecorp', 'Rua Frota Aguiar Filho, 3091 - Taquara, Rio de Janeiro - RJ, 22775-111, Brazil', -22.950622, -43.373134, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Hospital Municipal da Piedade', 'Rua da Capela, 96 - Piedade, Rio de Janeiro - RJ, 20740-310, Brazil', -22.891811, -43.309827, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Hospital Universitário Gaffrée e Guinle', 'Rua Mariz e Barros, 775 - Tijuca, Rio de Janeiro - RJ, 20270-004, Brazil', -22.915921, -43.221224, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Hospital Badim', 'Rua São Francisco Xavier, 390 - Tijuca, Rio de Janeiro - RJ, 20550-013, Brazil', -22.914746, -43.232467, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['CREB- Centro Reumatologia Ortopedia Botafogo', 'Rua Voluntários da Pátria, 408 - Botafogo, Rio de Janeiro - RJ, 22270-010, Brazil', -22.955316, -43.195632, 'http://maps.gstatic.com/mapfiles/place_api/icons/fitness-71.png'],
          ['Sesc Copacabana', 'Rua Domingos Ferreira, 160 - Copacabana, Rio de Janeiro - RJ, 22050-012, Brazil', -22.973071, -43.187441, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Hospital de Olhos de Niterói', 'Avenida Sete de Setembro, 221 - Icaraí, Niterói - RJ, 24230-251, Brazil', -22.904493, -43.100881, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Hospital São Zacharias', 'Rio de Janeiro - State of Rio de Janeiro, Brazil', -22.958772, -43.177639, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Casa de Saúde Santa Lúcia', 'Rua Capitão Salomão, 27 - Botafogo, Rio de Janeiro - RJ, 22271-040, Brazil', -22.956534, -43.196254, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Hospital Pasteur', 'Avenida Amaro Cavalcânti, 495 - Méier, Rio de Janeiro - RJ, 20735-040, Brazil', -22.899244, -43.281532, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Sérgio Franco', 'Lojas C e D - Avenida das Américas, 505 - Barra da Tijuca, Rio de Janeiro - RJ, 22631-000, Brazil', -23.004982, -43.321382, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Promed e Prosaúde Clínica Assistência Médica', 'Rua Silva Cardoso, 689 - Bangu, Rio de Janeiro - RJ, 21810-030, Brazil', -22.881861, -43.463484, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Espaço Nirvana', 'Praça Santos Dumont, 31 - Gávea, Rio de Janeiro - RJ, 22470-060, Brazil', -22.97283, -43.223927, 'http://maps.gstatic.com/mapfiles/place_api/icons/fitness-71.png'],
          ['Instituto Nacional de Cardiologia', 'Rua das Laranjeiras, 374 - Laranjeiras, Rio de Janeiro - RJ, 22240-006, Brazil', -22.936786, -43.190681, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png'],
          ['Pronto Clinica', 'Avenida Graça Aranha, 416, Rio de Janeiro - RJ, Brazil', -22.90612, -43.175031, 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png']
        ];

        var map = new google.maps.Map($element[0], mapOptions);
        var infowindow = new google.maps.InfoWindow();

        var image = {
          url: 'http://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png',
          // This marker is 20 pixels wide by 32 pixels tall.
          size: new google.maps.Size(32, 32),
          // The origin for this image is 0,0.
          origin: new google.maps.Point(0,0),
          // The anchor for this image is the base of the flagpole at 0,32.
          anchor: new google.maps.Point(0, 32),
          scaledSize: new google.maps.Size(20, 20)
        };
        for (var i = 0; i < hospitals.length; i++){
          var hospital = hospitals[i];
          var myLatLng = new google.maps.LatLng(hospital[2], hospital[3]);

          var html_info = '<p><img src='+hospital[4]+'></p><h5>'+hospital[0]+'</h5></br><p>'+hospital[1]+'</p>';
          var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              icon: image,
              title: hospital[0],
              info: html_info,
              size: new google.maps.Size(120, 110),
              title: hospital[0]
          });

         google.maps.event.addListener(marker, 'click', function () {
           infowindow.setContent(this.info);
           infowindow.open(map, this);
         });

        }
        $scope.onCreate({map: map});
        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });

      }
      if (document.readyState === "complete"){
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
