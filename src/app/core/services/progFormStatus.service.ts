import { Injectable } from "@angular/core";
import { Constants } from "../etc/constants/constants";

@Injectable({
    providedIn: 'root'
})

export class ProgFormStatus {
    status  = Constants.FORM_CLEANE;

    setProgFormStatus(value: string){
        this.status = value;
    }

    getProgFromStatus():string {
        return this.status;
    }
}