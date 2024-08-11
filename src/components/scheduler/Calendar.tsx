import { useEffect, useState, useCallback } from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
  ChangeSet,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  MonthView,
  WeekView,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Appointment } from "../../types/CalendarTypes";
import { LocaleSwitcher } from "../localeSwitcher/LocaleSwitcher";
import {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../firebase/firebaseService";
import { getAllDayMessages } from "../allDayLocalization/localization";

export default function Calendar() {
  const [data, setData] = useState<Appointment[]>([]);
  const [locale, setLocale] = useState<Locale>("en-US");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointments = await getAppointments();
        setData(appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchData();
  }, []);

  const commitChanges = useCallback(
    async ({ added, changed, deleted }: ChangeSet) => {
      if (added) {
        const newAppointment = { ...added } as Omit<Appointment, "id">;
        const newId = await addAppointment(newAppointment);
        setData((prevData) => [...prevData, { id: newId, ...newAppointment }]);
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
        setData((prevData) =>
          prevData.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted) {
        const idToDelete = deleted as string;
        await deleteAppointment(idToDelete);
        setData((prevData) =>
          prevData.filter((appointment) => appointment.id !== idToDelete)
        );
      }
    },
    []
  );

  return (
    <Paper>
      <LocaleSwitcher
        currentLocale={locale}
        onLocaleChange={(event) => setLocale(event.target.value as Locale)}
      />
      <Scheduler data={data} locale={locale} height={660}>
        <ViewState
          defaultCurrentDate="2024-08-11"
          defaultCurrentViewName="Week"
        />
        <EditingState onCommitChanges={commitChanges} />
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
        <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
        <AppointmentForm />
        <AllDayPanel messages={getAllDayMessages(locale)} />
      </Scheduler>
    </Paper>
  );
}
