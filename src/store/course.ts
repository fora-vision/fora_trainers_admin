import { action, makeObservable, observable, toJS } from "mobx";
import api from "./api";
import { CourseDTO, WorkoutDTO } from "./models";
import WorkoutModel from "./workout";

class CourseModel {
  id: number;
  name: string;
  description: string;
  deadline?: number;
  workouts: WorkoutModel[] = [];
  draftWorkout = new WorkoutModel();

  constructor(dto: CourseDTO) {
    makeObservable(this, {
      name: observable,
      workouts: observable,
      removeWorkout: action,
      cloneWorkout: action,
      saveDraftWorkout: action,
    });

    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
    this.deadline = dto.deadline;
    this.workouts =
      dto.program?.workouts.map((wrk) => new WorkoutModel(wrk)) ?? [];
  }

  async runClassroom(workout: number) {
    const url = await api.testWorkout(this.id, workout);
    window.open(url, "_blank")?.focus();
  }

  async removeWorkout(id: number) {
    this.workouts.splice(id, 1);
    await this.save();
  }

  async cloneWorkout(id: number) {
    const w = this.workouts[id];
    const newWorkout = new WorkoutModel(w.serialize());
    this.workouts.splice(id, 0, newWorkout);
    await this.save();
  }

  async saveDraftWorkout() {
    const dto = this.draftWorkout.serialize();
    this.workouts.push(new WorkoutModel(dto));
    this.draftWorkout = new WorkoutModel();
    await this.save();
  }

  async save() {
    await api.updateCourse(this.id, this.serialize());
  }

  serialize(): any {
    const workouts = this.workouts.map((w) => w.serialize());
    return {
      avatar: "",
      max_users_count: 0,

      program: { workouts },
      name: toJS(this.name),
      description: toJS(this.description),
      deadline: toJS(this.deadline),
    };
  }
}

export default CourseModel;
