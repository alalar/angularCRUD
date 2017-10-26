import { Component, Output } from '@angular/core';
import {Subject} from 'rxjs/Subject';

declare var $ :any;

@Component({
  selector: 'app-modal',
  template: `
  <div (click)="onContainerClicked($event)" class="modal fade" [ngClass]="{'show': visibleAnimate}" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content" >
        <div class="modal-header" >
          <h4 >{{modalHeader}}</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="hide()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" [innerHTML]=modalBody>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" (click)="nodoit()">No</button>
            <button type="button" class="btn btn-primary" (click)="doit()">Yes</button>
        </div>
      </div>
    </div>
  </div>
  `
})
export class ModalComponent {

    private clickStream = new Subject<boolean>();
    @Output() blnResult = this.clickStream.asObservable();

  public modalHeader:string;
  public modalBody:string;

  public show(strHeader:string,strBody:string): void {
    this.modalHeader = strHeader;
    this.modalBody = strBody;
    $('div.modal').modal('show');
  }

  public hide(): void {
    $('div.modal').modal('hide');
  }
  public doit() {
       this.clickStream.next(true);
       this.hide();
  }
  public nodoit() {
       this.clickStream.next(false);
       this.hide();
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}