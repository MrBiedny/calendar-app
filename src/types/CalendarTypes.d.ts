type Appointment = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  notes: string;
  allDay?: boolean;
  rRule?: string;
};

export interface ChangeSet {
  added?: Partial<Appointment>;
  changed?: { [id: string]: Partial<Appointment> };
  deleted?: string;
}
