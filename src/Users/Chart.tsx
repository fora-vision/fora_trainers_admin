import React, { FC, useMemo } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { UserDTO } from "../store/models";
import { formatDate, getMonday } from "../components/date";

interface Period {
  count: number;
  start: number;
  end: number;
  date: string;
}

export const prepareData = (user: UserDTO): Period[] => {
  const msInWeek = 3600 * 24 * 7 * 1000;
  const endOfWeek = +getMonday(new Date()) + msInWeek;

  const collection: Period[] = [];
  for (let i = 6; i >= 0; i--) {
    const end = endOfWeek - i * msInWeek;
    const start = endOfWeek - (i + 1) * msInWeek;
    const workouts = user.workouts.filter((wrk) => {
      const ts = wrk.timestamp * 1000;
      return ts >= start && ts < end;
    });

    collection.push({ count: workouts.length, start, end, date: formatDate(start) + " - " + formatDate(end) });
  }

  return collection;
};

const WorkoutsChart: FC<{ user: UserDTO }> = ({ user }) => {
  const data = useMemo(() => prepareData(user), [user]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        style={{ fontSize: 13 }}
        data={data}
        margin={{
          top: 32,
          right: 32,
          left: 0,
          bottom: 16,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#5e7eaf" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WorkoutsChart;
