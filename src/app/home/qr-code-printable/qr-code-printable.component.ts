import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import QRCode from 'qrcode';
import { QrCodeService } from './qr-code.service';

@Component({
    selector: 'app-qr-code-printable',
    templateUrl: './qr-code-printable.component.html',
    styleUrls: [ './qr-code-printable.component.css' ]
})
export class QrCodePrintableComponent implements OnInit {
    id: string;
    dataQrCode: string;
    which: string;
    sala: any;
    estacao: any;

    nome: string;
    predio: string;
    empresas: any;
    andar: string;

    constructor(private route: ActivatedRoute, private service: QrCodeService) {}

    ngOnInit() {
        this.route.params.subscribe(async (params) => {
            this.which = params['which'];
            this.id = params['id'];
            this.dataQrCode = await QRCode.toDataURL(this.id, {
                errorCorrectionLevel: 'H',
                margin: 1,
                width: 250
            });
            if (this.which === 'estacao') {
                this.service.getEstacao(this.id).subscribe((estacao) => {
                    this.estacao = estacao;
                    this.nome = this.estacao.nome;
                    this.predio = this.estacao.predio.nome;
                    this.empresas = this.estacao.empresa;
                    this.andar = this.estacao.andar;
                });
            } else if (this.which === 'sala') {
                this.service.getSala(this.id).subscribe((sala) => {
                    this.sala = sala;
                    this.nome = this.sala.nome;
                    this.predio = this.sala.predio.nome;
                    this.empresas = this.sala.empresa;
                    this.andar = this.sala.andar;
                });
            }
        });
    }

    print() {
        const mywindow = window.open('', 'PRINT', 'height=screen.availHeight,width=screen.availWidth');
        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('</head><body style="display: flex; align-items: center; justify-content: center">');

        mywindow.document.write(
            '<div style="display: flex; flex-direction: row; border: 2px solid black; border-radius: 10px; padding: 10px;">'
        );
        mywindow.document.write('<img src="' + this.dataQrCode + '"/>');

        mywindow.document.write(
            '<div style="margin-left:16px; display: flex; flex-direction: column; align-items: flex-start;">'
        );
        mywindow.document.write('<span style="font-size: 30px;">' + this.nome + '</span>');
        mywindow.document.write('<div style="height:2px;background-color:black;width:100%;margin: 10px 0;"></div>');
        mywindow.document.write('<span style="font-size: 20px;">' + this.andar + 'º andar</span>');
        mywindow.document.write('<span style="font-size: 20px;">' + this.predio + '</span>');

        mywindow.document.write('<div style="display:flex;flex-direction:row;align-items:center;margin-top:10px">');
        let firstImage = true;
        if (this.empresas.find((emp) => emp.nome === 'Globalhitss')) {
            if (!firstImage) {
                mywindow.document.write('<span style="height:1px;width:10px;"></span>');
            }
            mywindow.document.write('<img style="max-height:100px;max-width:100px" src="/assets/globalhitss.png"/>');
            firstImage = false;
        }
        if (this.empresas.find((emp) => emp.nome === 'Claro')) {
            if (!firstImage) {
                mywindow.document.write('<span style="height:1px;width:10px;"></span>');
            }
            mywindow.document.write('<img style="max-height:100px;max-width:100px" src="/assets/claro.png"/>');
            firstImage = false;
        }
        if (this.empresas.find((emp) => emp.nome === 'Embratel')) {
            if (!firstImage) {
                mywindow.document.write('<span style="height:1px;width:10px;"></span>');
            }
            mywindow.document.write('<img style="max-height:100px;max-width:100px" src="/assets/embratel.png"/>');
            firstImage = false;
        }
        if (this.empresas.find((emp) => emp.nome === 'NET')) {
            if (!firstImage) {
                mywindow.document.write('<span style="height:1px;width:10px;"></span>');
            }
            mywindow.document.write('<img style="max-height:100px;max-width:100px" src="/assets/net.png"/>');
            firstImage = false;
        }
        mywindow.document.write('</div>');
        mywindow.document.write('</div>');
        mywindow.document.write('</div>');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();
    }
}
