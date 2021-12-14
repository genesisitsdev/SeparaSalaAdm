import { Component, OnInit, ElementRef, NgZone, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CadastroPredioService } from './cadastro-predio.service';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Predio } from 'src/app/model/predioModel';
import { Subscription } from 'rxjs';

enum LocationTypes {
    ADDRESS,
    CEP,
    CITY,
    STATE
}

@Component({
    selector: 'app-cadastro-predio',
    templateUrl: './cadastro-predio.component.html',
    styleUrls: [ './cadastro-predio.component.css' ]
})
export class CadastroPredioComponent implements OnInit {
    @Input() edit: Predio;

    @ViewChild('enderecoPredio', null)
    public searchElementRef: ElementRef;
    public latitude: number;
    public longitude: number;
    place: google.maps.places.PlaceResult;
    predio: Predio = new Predio();
    endereco = '';

    fieldsDisabled = {
        address: false,
        city: false,
        state: false,
        cep: false
    };

    subscribtion: Subscription = null;

    constructor(
        private predioService: CadastroPredioService,
        private mapsAPILoader: MapsAPILoader,
        private changesDetector: ChangeDetectorRef,
        private ngZone: NgZone,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.subscribtion = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const nav = this.router.getCurrentNavigation();
                if (nav && nav.extras.state) {
                    this.edit = nav.extras.state as Predio;
                    this.predio = this.edit;
                    this.endereco = this.predio.endereco;
                    this.fieldsDisabled = {
                        address: false,
                        city: !!this.predio.cidade,
                        state: !!this.predio.estado,
                        cep: !!this.predio.cep
                    };
                    this.subscribtion.unsubscribe();
                }
            }
        });
    }

    ngOnInit() {
        this.mapsAPILoader.load().then(() => this.initMapsSearchField());
    }

    initMapsSearchField() {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            types: [ 'address' ]
        });
        autocomplete.addListener('place_changed', () => this.placeChanged(autocomplete));
    }

    placeChanged(autocomplete) {
        this.ngZone.run(() => {
            const place = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
                return;
            }
            this.predio.endereco = this.getField(LocationTypes.ADDRESS, place);
            this.predio.cidade = this.getField(LocationTypes.CITY, place);
            this.predio.estado = this.getField(LocationTypes.STATE, place);
            this.predio.cep = this.getField(LocationTypes.CEP, place);
            this.predio.lat = place.geometry.location.lat();
            this.predio.long = place.geometry.location.lng();
            this.place = place;
        });
    }

    cleanFields(ev) {
        ev.preventDefault();
        this.place = null;
        this.changesDetector.detectChanges();
        this.initMapsSearchField();
        this.endereco = '';
        this.predio.endereco = '';
        this.predio.cidade = '';
        this.predio.estado = '';
        this.predio.cep = '';
        this.predio.numero = null;
        this.predio.lat = null;
        this.predio.long = null;
        this.fieldsDisabled = {
            address: false,
            city: false,
            state: false,
            cep: false
        };
    }

    getField(field: LocationTypes, place) {
        switch (field) {
            case LocationTypes.ADDRESS: {
                const address = place.address_components.find((comp) => comp.types.includes('route'));
                if (address) {
                    this.fieldsDisabled.address = true;
                    return address.long_name;
                }
                return '';
            }
            case LocationTypes.CEP: {
                const cep = place.address_components.find((comp) => comp.types.includes('postal_code'));
                if (cep) {
                    this.fieldsDisabled.cep = true;
                    return cep.long_name;
                }
                return '';
            }
            case LocationTypes.CITY: {
                const city = place.address_components.find((comp) =>
                    comp.types.includes('administrative_area_level_2')
                );
                if (city) {
                    this.fieldsDisabled.city = true;
                    return city.long_name;
                }
                return '';
            }
            case LocationTypes.STATE: {
                const state = place.address_components.find((comp) =>
                    comp.types.includes('administrative_area_level_1')
                );
                if (state) {
                    this.fieldsDisabled.state = true;
                    return state.short_name;
                }
                return '';
            }
        }
    }

    isEdit() {
        return !!this.edit;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        if (this.isEdit()) {
            this.predioService.updatePredio(this.predio).subscribe(
                (resp) => {
                    this.router.navigateByUrl('admin/predios');
                    alert('Cadastro atualizado com sucesso');
                },
                (error) => {
                    alert('Erro ao atualizar predio');
                }
            );
        } else {
            this.predioService.createPredio(this.predio).subscribe(
                (resp) => {
                    this.router.navigateByUrl('admin/predios');
                    alert('Cadastro realizado com sucesso');
                },
                (error) => {
                    alert('Erro ao cadastrar predio');
                }
            );
        }
    }
}
