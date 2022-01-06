import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import Modifiers from "./Modifiers";
import SetupExercise from "./SetupExercise";
import SetupModifier from "./SetupModifier";
import SetupSet from "./SetupSet";

function ExerciseNavigation() {
  return (
    <>
      <SetupExercise />
    </>
  );
}

export default ExerciseNavigation;
