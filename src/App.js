import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Login from "./Login";
import Users from "./Users";

import Courses from "./Courses";
import CreateCourse from "./Courses/Create";

import Course from "./Course";
import PublishCourse from "./Course/Publish";
import RenameCourse from "./Course/Rename";

import Header from "./components/Header";
import RequireAuth from "./components/RequireAuth";

import Modifiers from "./Workout/Modifiers";
import SetupWorkout from "./Workout/SetupWorkout";
import SetupModifier from "./Workout/SetupModifier";
import SetupExercise from "./Workout/SetupExercise";
import CreateAccount from "./Login/Create";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<CreateAccount />} />
          <Route path="/" element={<Navigate to="/courses" />} />

          <Route
            path="/courses"
            element={
              <RequireAuth>
                <Courses />
                <Outlet />
              </RequireAuth>
            }
          >
            <Route path="create" element={<CreateCourse />} />
          </Route>

          <Route
            path="/courses/:course"
            element={
              <RequireAuth>
                <Course />
                <Outlet />
              </RequireAuth>
            }
          >
            <Route path="publish" element={<PublishCourse />} />
            <Route path="rename" element={<RenameCourse />} />
          </Route>

          <Route
            path="/courses/:course/users"
            element={
              <RequireAuth>
                <Users />
                <Outlet />
              </RequireAuth>
            }
          />

          <Route
            path="/courses/:course/:workout"
            element={
              <RequireAuth>
                <SetupWorkout />
                <Outlet />
              </RequireAuth>
            }
          >
            <Route path=":set/:exercise" element={<SetupExercise />} />
            <Route path=":set/:exercise/modifiers" element={<Modifiers />} />
            <Route path=":set/:exercise/modifiers/:modificator" element={<SetupModifier />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
