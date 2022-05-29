import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-delete-contact-dialog',
  templateUrl: './delete-contact-dialog.component.html',
  styleUrls: ['./delete-contact-dialog.component.css']
})
export class DeleteContactDialogComponent implements OnInit {

  public title: string = 'Contact Manager';
  public loading: boolean = false;
  public contactId?: number;
  public contactName?: string;

  constructor(
    private contactService: ContactService,
    private notifyService: NotificationService,
    private spinnerService: NgxSpinnerService,
    private dialogRef: MatDialogRef<DeleteContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteData: IContact
  ) { }

  ngOnInit(): void {
    this.contactId = this.deleteData.id;
    this.contactName = this.deleteData.contactName;
  }

  deleteContact() {
    this.showLoader();
    this.contactService.deleteContact(this.contactId!).subscribe({
      next: () => {
        this.hideLoader();
        this.showSuccessAlert('Contact Deleted Successfully');
        this.dialogRef.close({ event: 'Delete' });
      },
      error: (err) => {
        this.hideLoader();
        this.showErrorAlert(`Error while deleting contact ${err}`);
      }
    });
  }

  showSuccessAlert(message: string) {
    this.notifyService.showSuccess(message, 'Contact Manager');
  }

  showErrorAlert(message: string) {
    this.notifyService.showError(message, 'Contact Manager');
  }

  showLoader() {
    this.loading = true;
    this.spinnerService.show();
  }

  hideLoader() {
    this.loading = false;
    this.spinnerService.hide();
  }

}
