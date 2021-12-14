import { Component, OnInit, OnDestroy } from '@angular/core';
import { CadastroEstacaoTrabalhoService } from './cadastro-estacao-trabalho.service';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EstacaoTrabalho } from 'src/app/model/estacao-trabalho';
import { MatChipInputEvent } from '@angular/material/chips';
import { Predio } from 'src/app/model/predioModel';
import { Empresa } from 'src/app/model/empresa';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-cadastro-estacao-trabalho',
    templateUrl: './cadastro-estacao-trabalho.component.html',
    styleUrls: [ './cadastro-estacao-trabalho.component.css' ]
})
export class CadastroEstacaoTrabalhoComponent implements OnInit, OnDestroy {
    public predios: any;

    empresaCtrl = new FormControl();
    public empresas: any = [];
    empresasFiltradas: Observable<Empresa[]>;
    empresasSelecionada: Empresa[] = [];

    public checkboxInit: boolean = false;
    public estacaoTrabalho: EstacaoTrabalho = new EstacaoTrabalho();
    edit: EstacaoTrabalho;
    predioSelecionado: Predio;

    routerSubscribtion: Subscription = null;
    urlSubscribtion: Subscription = null;

    constructor(
        private cadastroSalaService: CadastroEstacaoTrabalhoService,
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
                    this.edit = nav.extras.state as EstacaoTrabalho;
                    this.estacaoTrabalho = this.edit;
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
            this.estacaoTrabalho.predio = this.predioSelecionado;
            this.estacaoTrabalho.empresa = this.empresasSelecionada;

            this.cadastroSalaService.updateEstacaoTrabalho(this.estacaoTrabalho).subscribe(
                (res) => {
                    this.router.navigateByUrl('admin/estacoes');
                    alert('Sua estação de trabalho foi atualizada');
                },
                (error) => {
                    alert('Erro ao atualizar estação de trabalho');
                }
            );
        } else {
            const data = {
                ...form.value,
                predio: this.predioSelecionado,
                empresa: this.empresasSelecionada,
                perifericos: this.estacaoTrabalho.perifericos
            };
            this.cadastroSalaService.createEstacaoTrabalho(data).subscribe(
                (res) => {
                    this.router.navigateByUrl('admin/estacoes');
                    alert('Cadastro realizado com sucesso');
                },
                (error) => {
                    alert('Erro ao cadastrar estação de trabalho');
                }
            );
        }
    }

    addPeriferico(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.estacaoTrabalho.perifericos.push(value.trim());
        }

        if (input) {
            input.value = '';
        }
    }

    removePeriferico(fruit): void {
        const index = this.estacaoTrabalho.perifericos.indexOf(fruit);

        if (index >= 0) {
            this.estacaoTrabalho.perifericos.splice(index, 1);
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
