export interface PostDataTable {
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
        'tittle': String,
        'content': String,
        'author': any,
        'image':string,
        'date_at': Date,
        'acciones':any
    }[]
  }

export class InputConvertPost {

    constructor(private posts: any) { }

    public convertPostForDataTable(): PostDataTable {
        let posts: PostDataTable = { 'data': null, 'paginator': null };
        posts.data = this.posts.data.map((post: any) => {
            return {
                'id': post.id,
                'tittle': post.tittle,
                'author': post.author_id,
                'image': post.image,
                'content':post.content,
                'created_at': post.created_at ,
            };
        });
        posts.paginator = {
            'currentPage': this.posts.current_page,
            'firstPageUrl': this.posts.first_page_url,
            'from': this.posts.from,
            'nextPageUrl': this.posts.next_page_url,
            'perPage': this.posts.per_page,
            'previousPageUrl': this.posts.prev_page_url,
            'to': this.posts.to,
            'total': this.posts.total
        };
        return posts;
    }


}