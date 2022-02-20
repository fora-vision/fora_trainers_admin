import CourseModel from "../store/course";
import { formatDate, formatSecs } from "../components/date";

export const getColumns = (course: CourseModel) => [
  {
    accessor: (row: any) => row.name || "Не указано",
    Header: "ФИО",
  },
  {
    Header: "Возраст",
    accessor: (row: any) => row.age || "Не указан",
  },
  {
    Header: "Пол",
    accessor: (row: any) => {
      const gender = ["Не указан", "Мужской", "Женский"];
      return gender[row.sex || 0];
    },
  },
  {
    Header: "Тренировок",
    accessor: (row: any) => {
      return `${row.workouts.length} из ${course.workouts.length}`;
    },
  },
  {
    Header: "Прогресс",
    accessor: (row: any) => {
      return Math.round((row.workouts.length / course.workouts.length) * 100) + "%";
    },
  },
];

export const workoutColumns = [
  {
    width: 360,
    minWidth: 360,
    accessor: (row: any) => row.name || "Не указано",
    Header: "Тренировка",
  },
  {
    accessor: (row: any) => formatDate(row.timestamp * 1000),
    Header: "Дата",
  },
  {
    accessor: (row: any) => formatSecs(row.total_time),
    Header: "Время",
  },
];
