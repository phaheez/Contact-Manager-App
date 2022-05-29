import { IContact } from 'src/app/models/IContact';
import { IDesignation } from './../../models/IDesignation';
import { ContactService } from './../../services/contact.service';
import { NotificationService } from './../../services/notification.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public loading: boolean = false;
  contactForm!: FormGroup;
  public contact: IContact = {} as IContact;
  public designations: IDesignation[] = [] as IDesignation[];
  public actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private notifyService: NotificationService,
    private spinnerService: NgxSpinnerService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: IContact
  ) { }

  ngOnInit(): void {
    this.getAllDesignations();

    this.contactForm = this.formBuilder.group({
      contactName: ['', Validators.required],
      mobile: ['', Validators.required],
      photoUrl: ['', Validators.required],
      contactEmail: ['', Validators.required],
      company: ['', Validators.required],
      designationId: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.contactForm.controls['contactName'].setValue(this.editData.contactName);
      this.contactForm.controls['mobile'].setValue(this.editData.mobile);
      this.contactForm.controls['contactEmail'].setValue(this.editData.contactEmail);
      this.contactForm.controls['designationId'].setValue(this.editData.designationId);
      this.contactForm.controls['photoUrl'].setValue(this.editData.photoUrl);
      this.contactForm.controls['company'].setValue(this.editData.company);
      this.contactForm.controls['date'].setValue(this.editData.date);
      this.contactForm.controls['address'].setValue(this.editData.address);
    }
  }

  addContact() {
    if (!this.editData) {
      if (this.contactForm.valid) {
        this.showLoader();
        this.contact = this.contactForm.value;
        this.contactService.createContact(this.contactForm.value).subscribe({
          next: (data) => {
            this.hideLoader();
            this.showSuccessAlert('Contact added successfully');
            this.contactForm.reset();
            this.dialogRef.close({ event: 'Save' });
          },
          error: (err) => {
            this.hideLoader();
            this.showErrorAlert(`Error while adding contact ${err}`);
          }
        });
      }
    } else {
      this.updateContact();
    }
  }

  updateContact() {
    this.showLoader();
    this.contactService.updateContact(this.contactForm.value, this.editData.id!).subscribe({
      next: (data) => {
        this.hideLoader();
        this.showSuccessAlert('Contact Updated successfully');
        this.contactForm.reset();
        this.dialogRef.close({ event: 'Update' });
      },
      error: (err) => {
        this.hideLoader();
        this.showErrorAlert(`Error while updating contact ${err}`);
      }
    })
  }

  getAllDesignations() {
    this.contactService.getAllDesignations().subscribe({
      next: (data) => {
        this.designations = data;
      },
      error: (err) => {
        this.showErrorAlert(`Error while getting designations ${err}`);
      }
    })
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
