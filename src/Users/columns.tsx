import CourseModel from "../store/course";
import { formatDate, formatSecs } from "../components/date";
import { Row } from "react-table";
import { UserDTO, WorkoutDTO } from "../store/models";

const completed = (workouts: any[]) => workouts.reduce((acc, w) => acc + (w.status === 4 ? 1 : 0.5), 0);

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
    sortType: (rowA: Row<UserDTO>, rowB: Row<UserDTO>) => {
      const a = rowA.original.workouts.length;
      const b = rowB.original.workouts.length;
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    },
    accessor: (row: any) => {
      return `${completed(row.workouts)} из ${course.workouts.length}`;
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
    sortType: (rowA: Row<UserDTO["workouts"][0]>, rowB: Row<UserDTO["workouts"][0]>) => {
      const a = rowA.original.timestamp;
      const b = rowB.original.timestamp;
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    },
  },
  {
    accessor: (row: any) => formatSecs(row.total_time),
    Header: "Время",
    sortType: (rowA: Row<UserDTO["workouts"][0]>, rowB: Row<UserDTO["workouts"][0]>) => {
      const a = rowA.original.total_time;
      const b = rowB.original.total_time;
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    },
  },
];
