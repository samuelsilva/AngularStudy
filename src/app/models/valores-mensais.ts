import { Clientes } from "./clientes";
import { Servicos } from "./servicos";

export class ValoresMensais {
    nrCliente: number;
    dtCompetencia: Date;
    cdServico: number;
    qtdServico: number;
    valorServico: number;
    qtdDesc: number;
    valorDesc: number;
    dtcarga: Date;
    cliente: Clientes;
    servico: Servicos;

    constructor(nrCliente: number, dtCompetencia: Date, cdServico: number, qtdServico: number, 
        valorServico: number, qtdDesc: number, valorDesc: number, dtcarga: Date, cliente: Clientes,
        servico: Servicos) {
            this.nrCliente = nrCliente;
            this.dtCompetencia = dtCompetencia;
            this.cdServico = cdServico;
            this.qtdServico = qtdServico;
            this.valorServico = valorServico;
            this.qtdDesc = qtdDesc;
            this.valorDesc = valorDesc;
            this.dtcarga = dtcarga;
            this.cliente = cliente;
            this.servico = servico;
    }
}

export class Pagination {
    path: string;
    page: string;
    prev_page_url: number | false;
    next_page_url: number | string;
    lastPage: number;
    total: number;
    limit: number;

    constructor(path: string, page: string, prev_page_url: number | false, next_page_url: number | string, lastPage: number, total: number, limit: number) {
        this.path = path;
        this.page = page;
        this.prev_page_url = prev_page_url;
        this.next_page_url = next_page_url;
        this.lastPage = lastPage;
        this.total = total;
        this.limit = limit;
    }
}