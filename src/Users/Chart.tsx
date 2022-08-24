import React, { FC, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { UserDTO } from "../store/models";
import { formatDate, getMonday } from "../components/date";

interface Period {
  completed: number;
  unfinished: number;
  start: number;
  end: number;
  date: string;
}

export const prepareData = (user: UserDTO): Period[] => {
  const msInWeek = 3600 * 24 * 7 * 1000;
  const endOfWeek = +getMonday(new Date()) + msInWeek;

  const collection: Period[] = [];
  for (let i = 24; i >= 0; i--) {
    const end = endOfWeek - i * msInWeek;
    const start = endOfWeek - (i + 1) * msInWeek;
    const workouts = user.workouts.filter((wrk) => {
      const ts = wrk.timestamp * 1000;
      return ts >= start && ts < end;
    });

    collection.push({
      date: formatDate(start) + " - " + formatDate(end),
      completed: workouts.filter((w: any) => w.status === 4).length,
      unfinished: workouts.filter((w: any) => w.status !== 4).length,
      start,
      end,
    });
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
        <Bar stackId="A" dataKey="completed" fill="#5e7eaf" />
        <Bar stackId="A" dataKey="unfinished" fill="#929ba9" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WorkoutsChart;
