export interface AuthorDataTable {
    'paginator'?: {
        'currentPage': number,
        'firstPageUrl': String,
        'previousPageUrl': String
        'nextPageUrl': String,
        'perPage': number,
        'from': number,
        'to': number,
        'total': number
    }
    'data': {
        'id': number,
        'name': String,
        'last_name': String,
        'date_at': Date,
        'acciones':any
    }[]
  }

export class InputConvertAuthor {

    constructor(private authors: any) { }

    public convertAuthorForDataTable(): AuthorDataTable {
        let authors: AuthorDataTable = { 'data': null, 'paginator': null };
        authors.data = this.authors.data.map((author: any) => {
            return {
                'id': author.id,
                'name': author.name,
                'last_name': author.last_name,
                'created_at': author.created_at ,
            };
        });
        authors.paginator = {
            'currentPage': this.authors.current_page,
            'firstPageUrl': this.authors.first_page_url,
            'from': this.authors.from,
            'nextPageUrl': this.authors.next_page_url,
            'perPage': this.authors.per_page,
            'previousPageUrl': this.authors.prev_page_url,
            'to': this.authors.to,
            'total': this.authors.total
        };
        return authors;
    }


}