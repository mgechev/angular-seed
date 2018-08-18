import { Component, OnInit, ElementRef, NgZone, ViewChild, NgModule, Directive, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { } from '@types/googlemaps';

import { DirectionsMapDirective } from '../../directives/directions.directive';
import { FormComponent } from '../form/form.component';
import { FormStepComponent } from '../form/form-step.component';

@Component({
    moduleId: module.id,
    selector: 'cotw-find-map',
    templateUrl: 'findMap.component.html',
    styleUrls: ['findMap.component.css'],
    providers: []
})

export class FindMapComponent implements OnInit {

  public orig: any;
  public dest: any;
  public climbSearch: FormGroup;
  public map: google.maps.Map;

  @ViewChild('originSearch')
  public originSearchElementRef: ElementRef;

  @ViewChild('destSearch')
  public destSearchElementRef: ElementRef;

  @ViewChild(DirectionsMapDirective)
  public directions: DirectionsMapDirective;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.climbSearch = new FormGroup({
      originSearchControl: new FormControl('', Validators.required),
      destSearchControl: new FormControl('', Validators.required),
      distanceControl: new FormControl('', Validators.required)
    });

    this.mapsAPILoader.load().then(() => {
      let mapConfig = {
          center: new google.maps.LatLng(39.8282, -98.5795),
          zoom: 4,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(document.getElementById("map-container"), mapConfig);
      this.directions.map = this.map;

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setMapFocus(position.coords.latitude, position.coords.longitude);
        });
      }

      let originAutocomplete = new google.maps.places.Autocomplete(this.originSearchElementRef.nativeElement, {
        types: []
      });
      let destAutocomplete = new google.maps.places.Autocomplete(this.destSearchElementRef.nativeElement, {
        types: []
      });

      this.setupPlaceChangedListener(originAutocomplete, 'ORG');
      this.setupPlaceChangedListener(destAutocomplete, 'DES');
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.directions.findCrags(value.distanceControl);
  }

  private setMapFocus(lat: number, long: number) {
    this.map.setCenter(new google.maps.LatLng(lat, long));
    this.map.setZoom(12);
  }

  private setupPlaceChangedListener(autocomplete: any, mode: any ) {
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined) {
          return;
        }

        if (mode === 'ORG') {
          this.directions.origin = {
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat()
          };
          this.directions.originPlaceId = place.place_id;
        } else {
          this.directions.destination = {
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat()
          };
          this.directions.destinationPlaceId = place.place_id;
        }

        console.log('orig: ' + this.directions.originPlaceId);
        console.log('dest: ' + this.directions.destinationPlaceId);
        this.setMapFocus(place.geometry.location.lat(), place.geometry.location.lng());

        this.directions.drawRoute();
      });
    });
  }
}
