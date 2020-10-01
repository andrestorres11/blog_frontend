import { AuthorModel } from './author-model';

export class PostModel {
    'id': string;
    'tittle': string;
    'image': string;
    'autors': AuthorModel;
}
