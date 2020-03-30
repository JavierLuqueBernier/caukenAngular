import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var google;

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.css']
})
export class GeoMapComponent implements OnInit {

  @Output() coordenadas: EventEmitter<any>;

  map: any;

  directionsService: any; // este sirve para recopilar datos
  directionsDisplay: any; // este sirve para pintarlos

  constructor() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.coordenadas = new EventEmitter();
  }

  ngOnInit() {
    const position = { coords: { latitude: 0, longitude: 0 } };
    position.coords.latitude = 40.41673;
    position.coords.longitude = -3.703587;
    this.loadMap(position);
  }

  loadMap(position = { coords: { latitude: 40, longitude: -3 } }) {
    /* console.log(position);*/
    const mapOptions = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), //donde queremos que se centre
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.HYBRID // Esto último en mayusculas es el tipo de mapa que queremos que se presente
    }

    this.map = new google.maps.Map(document.getElementById('mapaId'), mapOptions);
    this.directionsDisplay.setMap(this.map); // esto es para indicar sobre que mapa queremos que se muestren los displays y tiene que ser justo despues de la declaracion del mapa (es la linea anterior)

    const marker = new google.maps.Marker({ // Estas 5 lineas son para poner marcadores
      position: mapOptions.center,
      // position: new google.maps.LatLng(LATITUD, LONGITUD)
      title: 'Estamos Aquí!',
      // animation: google.maps.Animation.BOUNCE // Hacemos que el marcador salte de forma infinita
      animation: google.maps.Animation.DROP // Hacemos que el marcador caiga al principio y ya
    })
    marker.setMap(this.map);

    google.maps.event.addListener(this.map, 'click', (event) => { // esto es para poner un marcador donde clickemos
      const marker = new google.maps.Marker({
        position: event.latLng,
        // position: new google.maps.LatLng(LATITUD, LONGITUD)
        title: 'Lugar Seleccionado',
        animation: google.maps.Animation.DROP
      })
      marker.setMap(this.map);

      /*********************************************************/
      /*            DATOS DEL MARKER                           */
      /*********************************************************/
      console.log('datos de marker')
      console.log(event.latLng.lat());
      console.log(event.latLng.lng());
      //Esto envía las coordenadas a newC con los datos del marker
      this.coordenadas.emit({ latitud: event.latLng.lat(), longitud: event.latLng.lng() });
    })

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('inputPlaces'), {
      types: ['geocode', 'establishment'],  // el autocompletar de la casilla de busqueda de direcciones de google en el mapa
      origin: mapOptions.center
    });

    autocomplete.addListener('place_changed', function () { // esto es para que al buscar otra direccion en la casilla la busque en el mapa
      const place = autocomplete.getPlace();
      this.coordenadas.latitud = (place.geometry.location.lat());
      this.coordenadas.longitud = (place.geometry.location.lng());
      console.log(this.coordenadas);

      this.map.setCenter(place.geometry.location); // esto es para que centre el mapa en la nueva direccion

      const marker = new google.maps.Marker({ // esto es para que se ponga un marcador en la direccion que busquemos
        position: place.geometry.location,
      })
      marker.setMap(this.map);

      //Esto envía las coordenadas a newC con los datos de dirección por input
      this.coordenadas.emit({ latitud: place.geometry.location.lat(), longitud: place.geometry.location.lng() });
    }.bind(this))

  }

  manejarPosicionUsuario() {
    if (navigator.geolocation) {
      console.log('entra en el if');
      navigator.geolocation.getCurrentPosition((position) => { //Te lanza tus coordenadas en el momento de la carga
        console.log('entra en el navigator');

        this.loadMap(position);
        //Esto envía las coordenadas a newC con la posición del dispositivo
        console.log(position.coords.latitude);
        this.coordenadas.emit({ latitud: position.coords.latitude, longitud: position.coords.longitude });
      }, (error) => {
        console.log(error)
      });
    } else {
      console.log('No ha sido posible localizar su posición');
    }
  }


}
