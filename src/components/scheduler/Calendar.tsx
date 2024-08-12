import { useCallback, useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import {
  EditingState,
  ChangeSet,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";

import {
  AllDayPanel,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  Toolbar,
  TodayButton,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";

import {
  addAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../../firebase/firebaseService";

import { LocaleSwitcher } from "../localeSwitcher/LocaleSwitcher";
import { getAllDayMessages } from "../allDayLocalization/localization";
import ErrorSnackbar from "../errorSnackbar/ErrorSnackbar";
import Loader from "../loader/Loader";

import { Appointment } from "../../types/CalendarTypes";

export default function Calendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [locale, setLocale] = useState<Locale>("en-US");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const showError = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const fetchedAppointments = await getAppointments();
        setAppointments(fetchedAppointments);
      } catch (error) {
        showError(`Error occured: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleCommitChanges = useCallback(
    async ({ added, changed, deleted }: ChangeSet) => {
      try {
        if (added) {
          const newAppointment = { ...added } as Omit<Appointment, "id">;
          const newId = await addAppointment(newAppointment);
          setAppointments((prevAppointments) => [
            ...prevAppointments,
            { id: newId, ...newAppointment },
          ]);
        }
        if (changed) {
          await Promise.all(
            Object.keys(changed).map((id) =>
              updateAppointment(
                id,
                changed[id] as Partial<Omit<Appointment, "id">>
              )
            )
          );
          setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              changed[appointment.id]
                ? { ...appointment, ...changed[appointment.id] }
                : appointment
            )
          );
        }
        if (deleted) {
          const idToDelete = deleted as string;
          await deleteAppointment(idToDelete);
          setAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) => appointment.id !== idToDelete
            )
          );
        }
      } catch (error) {
        showError(`Error occured: ${error}`);
      }
    },
    []
  );

  return (
    <Paper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <LocaleSwitcher
            currentLocale={locale}
            onLocaleChange={(event) => setLocale(event.target.value as Locale)}
          />
          <Scheduler data={appointments} locale={locale} height={660}>
            <ViewState
              defaultCurrentDate="2024-08-11"
              defaultCurrentViewName="Week"
            />
            <EditingState onCommitChanges={handleCommitChanges} />
            <IntegratedEditing />

            <DayView startDayHour={7} endDayHour={21} />
            <WeekView startDayHour={7} endDayHour={21} />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />

            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip
              showOpenButton
              showDeleteButton
              showCloseButton
            />
            <AppointmentForm />
            <AllDayPanel messages={getAllDayMessages(locale)} />
          </Scheduler>
        </>
      )}
      <ErrorSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </Paper>
  );
}
