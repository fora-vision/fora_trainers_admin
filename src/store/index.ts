import { action, makeObservable, observable, runInAction } from "mobx";

class ForaStore {
  isLoged = true;
  courses = [
    {
      id: 0,
      title: "Курс",
      created: +new Date(),
      exercises: [
        { id: 0, title: "Тренировка 1", created: +new Date(), sex: 0, sets: [] },
        { id: 1, title: "Тренировка 2", created: +new Date(), sex: 0, sets: [] },
      ],
    },
    {
      id: 1,
      title: "Курс",
      created: +new Date(),
      exercises: [
        { id: 2, title: "Курс", created: +new Date(), sex: 0, sets: [] },
        { id: 3, title: "Курс", created: +new Date(), sex: 0, sets: [] },
      ],
    },
  ];

  constructor() {
    makeObservable(this, {
      isLoged: observable,
      login: action,
      logout: action,
    });
  }

  getCourse(course: number) {
    return this.courses.find((item) => item.id == course);
  }

  getExercise(course: number, exercise: number) {
    return this.getCourse(course)?.exercises.find((ex) => ex.id == exercise);
  }

  login(email: string, pass: string) {
    this.isLoged = true;
  }

  logout() {
    this.isLoged = false;
  }
}

export default new ForaStore();
