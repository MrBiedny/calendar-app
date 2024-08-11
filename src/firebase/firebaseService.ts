import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { Appointment } from "../types/CalendarTypes";

export const getAppointments = async (): Promise<Appointment[]> => {
  const appointmentsCollection = collection(db, "appointments");
  const appointmentSnapshot = await getDocs(appointmentsCollection);
  const appointmentList = appointmentSnapshot.docs.map((doc) => {
    const data = doc.data();
    const appointment: Appointment = {
      id: doc.id,
      title: data.title,
      startDate: (data.startDate as Timestamp).toDate(),
      endDate: (data.endDate as Timestamp).toDate(),
      notes: data.notes,
      allDay: data.allDay,
      rRule: data.rRule,
    };
    return appointment;
  });
  return appointmentList;
};

export const addAppointment = async (
  appointment: Omit<Appointment, "id">
): Promise<string> => {
  const appointmentsCollection = collection(db, "appointments");
  const docRef = await addDoc(appointmentsCollection, appointment);
  return docRef.id;
};

export const updateAppointment = async (
  id: string,
  updatedFields: Partial<Omit<Appointment, "id">>
): Promise<void> => {
  const appointmentDoc = doc(db, "appointments", id);
  await updateDoc(appointmentDoc, updatedFields);
};

export const deleteAppointment = async (id: string): Promise<void> => {
  const appointmentDoc = doc(db, "appointments", id);
  await deleteDoc(appointmentDoc);
};
