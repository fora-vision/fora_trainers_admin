import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserDTO } from "../store/models";
import CourseModel from "../store/course";
import WorkoutModel from "../store/workout";
import ModificatorModel from "../store/modificator";
import ExerciseModel from "../store/exercise";
import store from "../store";

interface PageState {
  user?: UserDTO;
  users?: UserDTO[];
  modificator?: ModificatorModel;
  exercise?: ExerciseModel;
  course?: CourseModel;
  workout?: WorkoutModel;
  isLoading: boolean;
  error: any;
}

const useBreadcrumbs = (): PageState => {
  const params = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      let course;
      if (params.course != null) {
        course = await store.getCourse(+params.course);
      }

      let workout;
      if (params.workout != null) {
        if (params.workout === "create") workout = course?.draftWorkout;
        else workout = await course?.getWorkout(+params.workout);
      }

      let exercise;
      if (params.set != null && params.exercise != null) {
        if (params.exercise === "create") exercise = workout?.draftExercise;
        else exercise = workout?.getExercise(+params.set, +params.exercise);
      }

      let modificator;
      if (params.modificator != null) {
        if (params.modificator === "create") modificator = exercise?.draftModificator;
        else modificator = exercise?.getModificator(+params.modificator);
      }

      let user;
      if (params.user != null) {
        user = await course?.getUser(params.user);
      }

      setData({ course, workout, exercise, modificator, user });
    };

    setError(false);
    setLoading(true);
    fetch()
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [params]);

  return {
    ...data,
    error,
    isLoading,
  };
};

export default useBreadcrumbs;
