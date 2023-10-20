import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Constants } from '../core/etc/constants/constants';
import { ProgFormStatus } from '../core/services/progFormStatus.service';
import { DialogService } from '../shared/dialogs/dialog.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(private router: Router,
    private dialogService: DialogService,
    private progFromStatus: ProgFormStatus) { }

  ngOnInit(): void {

  }


  async goProg(path: string) {

    const resp = this.progFromStatus.getProgFromStatus();

        if(resp === Constants.FROM_DIRTY){
          const resp = await lastValueFrom(this.dialogService.dirtyConfirm('資料已被異動，是否要離開此程式').afterClosed());

          if(!resp){
            return;
          }
        }

        this.router.navigateByUrl("/" + path);
      


  }
}
