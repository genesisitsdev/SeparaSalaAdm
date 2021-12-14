import { Component, OnInit, OnDestroy } from '@angular/core';
import { CadastroSalaService } from './cadastro-sala.service';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Sala } from 'src/app/model/salaModel';
import { Empresa } from 'src/app/model/empresa';
import { Observable, Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-cadastro-sala',
    templateUrl: './cadastro-sala.component.html',
    styleUrls: [ './cadastro-sala.component.css' ]
})
export class CadastroSalaComponent implements OnInit, OnDestroy {
    public predios: any;

    empresaCtrl = new FormControl();
    public empresas: any = [];
    empresasFiltradas: Observable<Empresa[]>;
    empresasSelecionada: Empresa[] = [];

    public checkboxInit: boolean = false;
    public Sala: Sala = new Sala();
    edit: Sala;

    predioSelecionado: any;

    routerSubscribtion: Subscription = null;
    urlSubscribtion: Subscription = null;

    constructor(
        private cadastroSalaService: CadastroSalaService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.empresasFiltradas = this.empresaCtrl.valueChanges.pipe(
            startWith(null),
            map((empresa: string | null) => (empresa ? this.filter(empresa) : this.empresas.slice()))
        );
        this.routerSubscribtion = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const nav = this.router.getCurrentNavigation();
                if (nav && nav.extras.state) {
                    this.edit = nav.extras.state as Sala;
                    this.Sala = this.edit;
                    this.routerSubscribtion.unsubscribe();
                }
                this.urlSubscribtion = this.route.url.subscribe((url) => {
                    if (url[0].path === 'edita') {
                        // Edição
                        this.loadData(true);
                    } else {
                        // Criação
                        this.loadData(false);
                    }
                });
            }
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        if (this.urlSubscribtion) {
            this.urlSubscribtion.unsubscribe();
        }
        if (this.routerSubscribtion) {
            this.routerSubscribtion.unsubscribe();
        }
    }

    loadData(edit: boolean) {
        this.cadastroSalaService.getPredios().subscribe(
            (res) => {
                this.predios = res;
                if (edit && this.edit) {
                    this.predioSelecionado = this.edit.predio;
                }
            },
            (error) => {
                console.error(error);
            }
        );
        this.cadastroSalaService.getEmpresas().subscribe(
            (res) => {
                this.empresas = res;
                if (edit && this.edit) {
                    this.empresasSelecionada = this.edit.empresa;
                }
                this.empresasFiltradas = new Observable((sub) =>
                    sub.next(
                        this.empresas.filter(
                            (empresa) => !this.empresasSelecionada.find((emp) => emp._id === empresa._id)
                        )
                    )
                );
            },
            (error) => {
                console.error(error);
            }
        );
        if (this.urlSubscribtion) {
            this.urlSubscribtion.unsubscribe();
        }
    }

    onSubmit(form: NgForm) {
        if (this.edit) {
            this.Sala.predio = this.predioSelecionado;
            this.Sala.empresa = this.empresasSelecionada;
            this.cadastroSalaService.updateSala(this.Sala).subscribe(
                (res) => {
                    this.router.navigateByUrl('admin/salas');
                    alert('Sua sala foi atualizada');
                },
                (error) => {
                    alert('Erro ao atualizar');
                }
            );
        } else {
            const data = {
                ...form.value,
                predio: this.predioSelecionado._id,
                empresa: this.empresasSelecionada,
                _id: this.predioSelecionado.cep + form.value.andar + form.value.numero
            };
            this.cadastroSalaService.createSala(data).subscribe(
                (res) => {
                    this.router.navigateByUrl('admin/salas');
                    alert('Cadastro realizado com sucesso');
                },
                (error) => {
                    alert('Erro ao cadastrar sala');
                }
            );
        }
    }

    addEmpresa(event: MatAutocompleteSelectedEvent): void {
        const empresa = this.empresas.find((empresa) => empresa._id === event.option.value);
        this.empresasSelecionada.push(empresa);
        this.empresasFiltradas = new Observable((sub) =>
            sub.next(
                this.empresas.filter((empresa) => !this.empresasSelecionada.find((emp) => emp._id === empresa._id))
            )
        );
        this.empresaCtrl.setValue(null);
    }

    removeEmpresa(empresa) {
        const index = this.empresasSelecionada.indexOf(empresa);
        if (index >= 0) {
            this.empresasSelecionada.splice(index, 1);
        }
        this.empresasFiltradas = new Observable((sub) =>
            sub.next(
                this.empresas.filter((empresa) => !this.empresasSelecionada.find((emp) => emp._id === empresa._id))
            )
        );
    }

    filter(name) {
        return this.empresas.filter((empresa) => empresa.nome.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
}
