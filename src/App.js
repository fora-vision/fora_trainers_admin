import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Course from "./Course";
import Courses from "./Courses";
import CreateCourse from "./Courses/Create";

import Header from "./components/Header";
import RequireAuth from "./components/RequireAuth";

import SetupSet from "./Exercise/SetupSet";
import Modifiers from "./Exercise/Modifiers";
import SetupModifier from "./Exercise/SetupModifier";
import SetupExercise from "./Exercise/SetupExercise";
import { Outlet } from "react-router-dom";

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
            <Route path="/courses/create" element={<CreateCourse />} />
          </Route>

          <Route
            path="/courses/:course"
            element={
              <RequireAuth>
                <Course />
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:course/:exercise"
            element={
              <RequireAuth>
                <SetupExercise />
                <Outlet />
              </RequireAuth>
            }
          >
            <Route path=":set/:ex" element={<SetupSet />} />
            <Route path=":set/:ex/modifiers" element={<Modifiers />} />
            <Route
              path=":set/:ex/modifiers/:modifier"
              element={<SetupModifier />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
