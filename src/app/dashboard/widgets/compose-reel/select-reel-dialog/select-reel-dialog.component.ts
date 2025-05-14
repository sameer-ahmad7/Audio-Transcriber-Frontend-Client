import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SizzleReel } from 'src/app/models/sizzlereel';

@Component({
  selector: 'app-select-reel-dialog',
  templateUrl: './select-reel-dialog.component.html',
  styleUrls: ['./select-reel-dialog.component.scss']
})
export class SelectReelDialogComponent implements OnInit {

  @Input() OpenReels: SizzleReel[];

  SelectedReelId: string;

  IsNewReel: boolean;


  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  SelectReel() {
    this.modal.close({ reelId: this.SelectedReelId, isNewReel: this.IsNewReel });
  }

}
