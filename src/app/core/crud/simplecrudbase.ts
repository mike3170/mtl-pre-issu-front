import { UntypedFormGroup } from "@angular/forms";
import { MtlMast } from "src/app/mtlmast/mtlmast.model";

export abstract class SimpleCrudBase{
    mtlMast = new MtlMast();
        
	clearForm(fg: UntypedFormGroup ) {
		fg.reset();
	}

}