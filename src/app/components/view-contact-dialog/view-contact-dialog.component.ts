import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IContact } from 'src/app/models/IContact';

@Component({
  selector: 'app-view-contact-dialog',
  templateUrl: './view-contact-dialog.component.html',
  styleUrls: ['./view-contact-dialog.component.css']
})
export class ViewContactDialogComponent implements OnInit {

  public contact: IContact = {} as IContact;

  constructor(@Inject(MAT_DIALOG_DATA) public viewData: IContact) { }

  ngOnInit(): void {
    this.contact = this.viewData;
  }
}
