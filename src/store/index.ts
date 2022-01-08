import { action, makeObservable, observable, runInAction } from "mobx";
import CourseModel from "./course";
import { ExerciseRuleDTO } from "./models";
import WorkoutModel from "./workout";
import api from "./api";

class ForaStore {
  isLoged = false;
  courses: CourseModel[] = [];
  exercises: Record<string, ExerciseRuleDTO> = {};

  constructor() {
    makeObservable(this, {
      isLoged: observable,
      courses: observable,
      login: action,
      logout: action,
      cloneCourse: action,
      removeCourse: action,
    });

    const session = localStorage.getItem("session");
    if (session) {
      this.isLoged = true;
      api.setAuthToken(session);
    }
  }

  getExerciseName(id: string) {
    return this.exercises[id].name
  }

  getExercisesList() {
    return Object.entries(this.exercises)
      .map(([id, ex]) => ({
        value: id,
        label: ex.name,
      }))
      .sort((a, b) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });
  }

  async createCourse(name: string, description: string) {
    const course = await api.createCourse(name, description);
    runInAction(() => this.courses.push(new CourseModel(course)));
  }

  async updateCourse(id: number) {
    const model = this.getCourse(id);
    if (!model) return;

    const course = model.serialize();
    await api.updateCourse(model.id, course);
  }

  getCourse(course: number) {
    return this.courses.find((item) => item.id == course);
  }

  getWorkout(course: number, workout: number | "create"): WorkoutModel | null {
    const model = this.getCourse(course);
    if (workout === "create") return model?.draftWorkout ?? null;
    return model?.workouts[workout] ?? null;
  }

  async removeCourse(id: number) {
    this.courses = this.courses.filter((item) => item.id !== id);
    await api.deleteCourse(id);
  }

  async cloneCourse(id: number) {
    const index = this.courses.findIndex((c) => c.id == id);
    const course = this.courses[index].serialize();
    const newCourse = await api.createCourse(course.name, course.description);
    await api.updateCourse(newCourse.id, course);
    this.courses.splice(index, 0, new CourseModel(course));
  }

  async loadCourses() {
    const courses = await api.getCourses();
    const exercises = await api.getExercises();
    runInAction(() => {
      this.exercises = exercises;
      this.courses = courses.map((course) => new CourseModel(course));
    });
  }

  async login(email: string, pass: string) {
    const user = await api.login(email, pass);
    runInAction(() => {
      api.setAuthToken(user.session);
      localStorage.setItem("session", user.session);
      this.isLoged = true;
    });
  }

  async logout() {
    localStorage.setItem("session", "");
    this.isLoged = false;
  }
}

export default new ForaStore();
