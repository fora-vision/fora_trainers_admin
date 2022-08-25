import { action, computed, makeObservable, observable, runInAction, toJS } from "mobx";
import { CourseDTO, UserDTO } from "./models";
import WorkoutModel from "./workout";
import api from "./api";

class CourseModel {
  id: number;
  name: string;
  description: string;
  usersCount: number;
  users: UserDTO[] = [];
  savePhotos: boolean;

  workouts: WorkoutModel[] = [];
  draftWorkout = new WorkoutModel();

  inviteCode?: string;
  deadline?: number;

  isExporting = false;

  constructor(dto: CourseDTO) {
    makeObservable(this, {
      name: observable,
      description: observable,
      workouts: observable,
      inviteCode: observable,
      users: observable,
      savePhotos: observable,
      isExporting: observable,

      loadUsers: action,
      removeWorkout: action,
      cloneWorkout: action,
      saveDraftWorkout: action,
      publicate: action,
      updateCourse: action,
      downloadXlsx: action,
      isEditable: computed,
    });

    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
    this.deadline = (dto.deadline ?? 0) * 1000;
    this.inviteCode = dto.invite_code;
    this.usersCount = dto.users_count;
    this.savePhotos = dto.save_photos;
    this.workouts = dto.program?.workouts.map((wrk) => new WorkoutModel(wrk)) ?? [];
  }

  get isEditable() {
    return this.inviteCode == null;
  }

  get path() {
    return `/courses/${this.id}`;
  }

  getWorkout(workout: number): WorkoutModel | null {
    return this.workouts[workout] ?? null;
  }

  async getUser(id: number | string) {
    if (this.users.length == 0) await this.loadUsers();
    return this.users.find((user) => user.id == +id);
  }

  async loadUsers() {
    const users = await api.getUsers(this.id);
    runInAction(() => (this.users = users));
    return users;
  }

  async publicate(deadline: number, savePhoto: boolean) {
    const inviteCode = await api.publicateCourse(this.id, deadline, savePhoto);
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
    const isConfirm = window.confirm("Вы уверены, что хотите удалить тренировку?");
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

  async updateCourse(name: string, description: string, deadline?: number) {
    this.name = name;
    this.description = description;
    this.deadline = deadline ?? this.deadline;
    await this.save();
  }

  async downloadXlsx() {
    this.isExporting = true;

    try {
      const data = await api.getUsersXlsx(this.id);
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", this.name + "_users.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch {}

    runInAction(() => {
      this.isExporting = false;
    });
  }

  async deleteUser(user: UserDTO) {
    const isConfirm = window.confirm(`Вы уверены, что хотите удалить пользователя "${user.name}"?`);
    if (!isConfirm) return;

    await api.deleteUser(this.id, user.id);
    runInAction(() => {
      this.users = this.users.filter((u) => u.id !== user.id);
    });
  }

  async save() {
    await api.updateCourse(this.id, this.serialize());
  }

  serialize() {
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
