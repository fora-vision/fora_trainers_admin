import { action, makeObservable, observable, runInAction } from "mobx";
import { AccountData, AccountSettings, ExerciseRuleDTO } from "./models";
import CourseModel from "./course";
import api from "./api";

class ForaStore {
  isLoged = false;
  courses: CourseModel[] = [];
  exercises: Record<string, ExerciseRuleDTO> = {};
  user: AccountData = {
    avatar_url: "",
    email: "",
    free_time: 0,
    name: "",
    organization: "",
  };

  constructor() {
    makeObservable(this, {
      isLoged: observable,
      courses: observable,
      user: observable,
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
    return this.exercises[id]?.name ?? `${id} [Deleted]`;
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
    const model = await this.getCourse(id);
    if (!model) return;

    const course = model.serialize();
    await api.updateCourse(model.id, course);
  }

  async getCourse(course: number): Promise<CourseModel | null> {
    if (!this.courses.length) await this.loadCourses();
    return this.courses.find((item) => item.id === course) ?? null;
  }

  async removeCourse(id: number) {
    const isConfirm = window.confirm("Вы уверены, что хотите удалить курс?");
    if (!isConfirm) return;

    this.courses = this.courses.filter((item) => item.id !== id);
    await api.deleteCourse(id);
  }

  async cloneCourse(id: number) {
    const index = this.courses.findIndex((c) => c.id === id);
    const course = this.courses[index].serialize();
    const newCourse = await api.createCourse(course.name, course.description);

    newCourse.program = course.program;
    newCourse.name = course.name + " (copy)";
    await api.updateCourse(newCourse.id, newCourse);

    runInAction(() => {
      this.courses.push(new CourseModel(newCourse));
    });
  }

  async loadUser() {
    const user = await api.getUser();
    runInAction(() => {
      this.user = user;
    });
  }

  async loadCourses() {
    this.loadUser();
    const courses = await api.getCourses();
    const exercises = await api.getExercises();
    runInAction(() => {
      this.exercises = exercises;
      this.courses = courses.map((course) => new CourseModel(course));
    });
  }

  async create(settings: AccountSettings) {
    const session = await api.createAccount(settings);
    runInAction(() => {
      api.setAuthToken(session);
      localStorage.setItem("session", session);
      this.isLoged = true;
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
    this.courses = [];
    this.isLoged = false;
  }
}

export default new ForaStore();
