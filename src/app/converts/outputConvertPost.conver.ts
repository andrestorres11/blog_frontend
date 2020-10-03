import { FormGroup } from '@angular/forms';


export class OutputConvertPost {

    constructor(private reactiveForm: FormGroup) { }

    public convertPost():any {
        return {
            'post':{ 
                'id':this.reactiveForm.get('id').value,
                'tittle':this.reactiveForm.get('tittle').value,
                'author_id':this.reactiveForm.get('author').value,
                'image':this.reactiveForm.get('image').value,
                'content':this.reactiveForm.get('content').value
            }
        };
        
    }


}