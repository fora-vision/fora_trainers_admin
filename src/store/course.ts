import { action, computed, makeObservable, observable, runInAction, toJS } from "mobx";
import { CourseDTO } from "./models";
import WorkoutModel from "./workout";
import api from "./api";

class CourseModel {
  id: number;
  name: string;
  description: string;
  workouts: WorkoutModel[] = [];
  draftWorkout = new WorkoutModel();

  inviteCode?: string;
  deadline?: number;

  constructor(dto: CourseDTO) {
    makeObservable(this, {
      name: observable,
      description: observable,
      workouts: observable,
      inviteCode: observable,
      removeWorkout: action,
      cloneWorkout: action,
      saveDraftWorkout: action,
      publicate: action,

      isEditable: computed
    });

    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
    this.deadline = (dto.deadline ?? 0) * 1000;
    this.inviteCode = dto.invite_code;
    this.workouts =
      dto.program?.workouts.map((wrk) => new WorkoutModel(wrk)) ?? [];
  }

  get isEditable() {
    return this.inviteCode == null
  }

  get path() {
    return `/courses/${this.id}`
  }

  async publicate(deadline: number) {
    const inviteCode = await api.publicateCourse(this.id, deadline);
    runInAction(() => {
      this.inviteCode = inviteCode;
      this.deadline = deadline;
    });
  }

  async runClassroom(workout: number) {
    const url = await api.testWorkout(this.id, workout);
    window.open(url, "_blank")?.focus();
  }

  async removeWorkout(id: number) {
    const isConfirm = window.confirm("Вы уверены, что хотите удалить тренировку?")
    if (!isConfirm) return;
    
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
      deadline: toJS(this.deadline ?? 0) / 1000,
    };
  }
}

export default CourseModel;
