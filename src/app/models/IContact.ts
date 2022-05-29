export interface IContact {
  id?: number;
  contactName: string;
  mobile: string;
  contactEmail: string;
  photoUrl: string;
  company: string;
  address: string;
  designationId: string;
  designation?: string;
  date: Date;
}
