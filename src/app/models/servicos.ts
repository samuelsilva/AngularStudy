export class Servicos {
    cdServicos: number;
    descServicos: string;

    constructor(cdServicos: number, descServicos: string){
        this.cdServicos = cdServicos;
        this.descServicos = descServicos;
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
