import { Component, OnInit, ElementRef, NgZone, ViewChild, NgModule, Directive, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { } from '@types/googlemaps';

import { LocationsService } from '../../services/locations/locations.service';
import { Location } from '../../models/location';
import { FormComponent } from '../form/form.component';
import { FormStepComponent } from '../form/form-step.component';

@Component({
    moduleId: module.id,
    selector: 'cotw-add-map',
    templateUrl: 'addMap.component.html',
    styleUrls: ['addMap.component.css'],
    providers: [LocationsService]
})

export class AddMapComponent implements OnInit {
  private climbUpload: FormGroup;
  private errorMessage: string;
  private db_locations: Location[];
  private map: any;
  private temp_marker: google.maps.Marker;

  @ViewChild('nearbySearch')
  public originSearchElementRef: ElementRef;

  constructor(
    private locationsService: LocationsService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.climbUpload = new FormGroup({
      nearbySearchControl: new FormControl(''),
      cragNameControl: new FormControl('', Validators.required),
      latControl: new FormControl('', Validators.required),
      longControl: new FormControl('', Validators.required),
      userNameControl: new FormControl(''),
      userLocationControl: new FormControl('')
    });

    this.mapsAPILoader.load().then(() => {
      let mapConfig = {
              center: new google.maps.LatLng(39.8282, -98.5795),
              zoom: 4,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              draggableCursor: 'crosshair'
          };
      this.map = new google.maps.Map(document.getElementById("map-container"), mapConfig);

      this.locationsService.getLocations()
          .subscribe(locations => {
                                    this.db_locations = locations;
                                    this.initMarkers();
                                  },
                     error => this.errorMessage = <any>error);

      let globalsRef = this;
      this.map.addListener('click', function(event: any) {
          if(globalsRef.temp_marker) {
              globalsRef.temp_marker.setMap(null);
          }
          let tempLat = event.latLng.lat();
          let tempLng = event.latLng.lng();
          let tempLoc = new google.maps.LatLng(tempLat, tempLng);

          globalsRef.climbUpload.patchValue(
            {
              latControl: tempLat,
              longControl: tempLng
            },
            {onlySelf: true}
          );

          globalsRef.temp_marker = new google.maps.Marker({
              position: tempLoc,
              map: globalsRef.map,
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });
      });

      let originAutocomplete = new google.maps.places.Autocomplete(this.originSearchElementRef.nativeElement, {
        types: []
      });

      originAutocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = originAutocomplete.getPlace();
          if (place.geometry === undefined) {
            return;
          }

          this.setMapFocus(place.geometry.location.lat(), place.geometry.location.lng());
        });
      });
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.locationsService.addLocation(value.cragNameControl,
                                      value.latControl,
                                      value.longControl,
                                      value.userNameControl,
                                      value.userLocationControl)
      .subscribe(loc => {
                          // why can't I just pass loc to placeMarker() ?
                          let newLoc: Location = {
                            name: value.cragNameControl,
                            lat: value.latControl,
                            long: value.longControl,
                            verified: 0,
                            submitter: value.userNameControl,
                            home: value.userLocationControl
                          };
                          this.placeMarker(newLoc);
                          this.db_locations.push(newLoc);
                          this.climbUpload.reset();
                          this.temp_marker.setMap(null);
                        },
                 error => this.errorMessage = <any>error);
  }

  private initMarkers() {
    for (let n = 0; n < this.db_locations.length; n++) {
      this.placeMarker(this.db_locations[n]);
    }
  }

  private placeMarker(loc: Location) {
    let temp_loc = new google.maps.LatLng(loc.lat, loc.long);

    let temp_title;
    if(loc.verified == 0) {
        temp_title = "(Unverified): " + loc.name;
    } else {
        temp_title = loc.name;
    }

    let infowindow = new google.maps.InfoWindow({
      content: temp_title,
      maxWidth: 200
    });

    let marker = new google.maps.Marker({
        position: temp_loc,
        map: this.map,
        title: temp_title
    });

    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });

    if(loc.verified == 0) {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    }
  }

  private setMapFocus(lat: number, long: number) {
    this.map.setCenter(new google.maps.LatLng(lat, long));
    this.map.setZoom(12);
  }
}
