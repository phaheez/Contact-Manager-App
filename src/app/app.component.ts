import { DeleteContactDialogComponent } from './components/delete-contact-dialog/delete-contact-dialog.component';
import { IDesignation } from './models/IDesignation';
import { NotificationService } from './services/notification.service';
import { ContactService } from './services/contact.service';
import { IContact } from './models/IContact';
import { ViewContactDialogComponent } from './components/view-contact-dialog/view-contact-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Contact Manager';
  public loading: boolean = false;
  public contacts: IContact[] = [];
  public designation: IDesignation[] = [];

  displayedColumns: string[] = ['contactName', 'mobile', 'contactEmail', 'designation', 'company', 'date', 'action'];
  dataSource!: MatTableDataSource<IContact>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private contactService: ContactService,
    private notifyService: NotificationService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.showLoader();
    this.getAllContacts();
  }

  showCreateContactDialog() {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      width: '50%'
    }).afterClosed().subscribe(result => {
      if (result.event === 'Save') {
        this.getAllContacts();
      }
    });
  }

  showViewContactDialog(row: IContact) {
    this.dialog.open(ViewContactDialogComponent, {
      disableClose: true,
      width: '50%',
      data: row
    });
  }

  showEditContactDialog(row: IContact) {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      width: '50%',
      data: row
    }).afterClosed().subscribe(result => {
      if (result.event === 'Update') {
        this.getAllContacts();
      }
    });
  }

  showDeleteContactDialog(row: IContact) {
    this.dialog.open(DeleteContactDialogComponent, {
      disableClose: true,
      width: '30%',
      data: row
    }).afterClosed().subscribe(result => {
      if (result.event === 'Delete') {
        this.getAllContacts();
      }
    });
  }

  getAllContacts() {
    this.contactService.getAllContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.hideLoader();

        // Get Designation
        data.forEach(element => {
          this.contactService.getDesignation(element).subscribe((data) => {
            element.designation = data.name;
          })
        });

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.hideLoader();
        this.showErrorAlert(`Error while fetching contact ${err}`);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
