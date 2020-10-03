import { FormGroup } from '@angular/forms';


export class OutputConvertAuthor {

    constructor(private reactiveForm: FormGroup) { }

    public convertAuthor():any {
        let authors: any = {
            'author':{ 
                'id':this.reactiveForm.get('id').value,
                'name':this.reactiveForm.get('name').value,
                'last_name':this.reactiveForm.get('last_name').value
            }
        };
        return authors;
    }


}