import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Empresa } from "src/app/model/empresa";
import { CadastroEmpresaService } from "./cadastro-empresa.service";

@Component({
  selector: "app-cadastro-empresa",
  templateUrl: "./cadastro-empresa.component.html",
  styleUrls: ["./cadastro-empresa.component.css"],
})
export class CadastroEmpresaComponent implements OnInit {
  public empresa: Empresa = new Empresa();
  @Input() edit: Empresa;
  
  subscribtion: Subscription = null;

  constructor(
    private cadastroEmpresaService: CadastroEmpresaService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.subscribtion = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const nav = this.router.getCurrentNavigation();
        if (nav && nav.extras.state) {
          this.edit = nav.extras.state as Empresa;
          this.empresa = this.edit;
          this.subscribtion.unsubscribe();
        }
      }
    });
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (this.edit) {
      this.cadastroEmpresaService.atualizaEmpresa(this.empresa).subscribe(
        (res) => {
          this.router.navigateByUrl("admin/empresas");
          alert("Sua estação de trabalho foi atualizada");
        },
        (error) => {
          alert("Erro ao atualizar estação de trabalho");
        }
      );
    } else {
      const data = {
        ...form.value,
      };
      this.cadastroEmpresaService.createEmpresa(data).subscribe(
        (res) => {
          this.router.navigateByUrl("admin/empresas");
          alert("Cadastro realizado com sucesso");
        },
        (error) => {
          alert("Erro ao cadastrar estação de trabalho");
        }
      );
    }
  }
}
