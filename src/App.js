import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Login from "./Login";
import Course from "./Course";
import Courses from "./Courses";
import CreateCourse from "./Courses/Create";

import Header from "./components/Header";
import RequireAuth from "./components/RequireAuth";

import Modifiers from "./Workout/Modifiers";
import SetupWorkout from "./Workout/SetupWorkout";
import SetupModifier from "./Workout/SetupModifier";
import SetupExercise from "./Workout/SetupExercise";
import PublishCourse from "./Course/Publish";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
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
          </Route>
          
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
            <Route
              path=":set/:exercise/modifiers/:modifier"
              element={<SetupModifier />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
