import { action, makeObservable, observable, toJS } from "mobx";
import { WorkoutDTO } from "./models";
import ExerciseModel from "./exercise";
import CourseModel from "./course";
import uuid4 from "uuid4";

class WorkoutModel {
  name: string;
  isDraft: boolean;

  draftExercise = new ExerciseModel();
  sets: {
    id: string;
    name: string;
    repeats: number;
    exercises: ExerciseModel[];
  }[];

  constructor(dto?: WorkoutDTO) {
    makeObservable(this, {
      name: observable,
      sets: observable,
      draftExercise: observable,

      setName: action,
      changeSetName: action,
      changeSetRepeats: action,
      removeExercise: action,
      saveDraftExercise: action,
      removeSet: action,
      addSet: action,
      moveSet: action
    });

    this.isDraft = dto == null;
    this.name = dto?.name ?? "";
    this.sets =
      dto?.sets.map((set) => ({
        id: uuid4(),
        name: set.name,
        repeats: set.repeats,
        exercises: set.exercises.map((ex) => new ExerciseModel(ex)),
      })) ?? [];
  }

  getExercise(set: number, exercise: number): ExerciseModel | null {
    return this?.sets[set]?.exercises[exercise] ?? null;
  }

  setName(name: string) {
    this.name = name;
  }

  addSet() {
    this.sets.push({ name: "", id: uuid4(), repeats: 1, exercises: [] });
  }

  changeSetName(set: number, name: string) {
    this.sets[set].name = name;
  }

  changeSetRepeats(set: number, repeat: number) {
    this.sets[set].repeats = repeat;
  }

  removeSet(set: number) {
    const isConfirm = window.confirm("Вы уверены, что хотите удалить сет?");
    if (!isConfirm) return;
    this.sets.splice(set, 1);
  }

  moveSet(set: number, move: number) {
    const item = this.sets[set]
    this.sets[set] = this.sets[set + move]
    this.sets[set + move] = item
  }

  removeExercise(set: number, exercise: number) {
    const isConfirm = window.confirm("Вы уверены, что хотите удалить упражнение?");
    if (!isConfirm) return;

    this.sets[set].exercises.splice(exercise, 1);
  }

  saveDraftExercise(set: number) {
    const dto = this.draftExercise.serialize();
    this.sets[set].exercises.push(new ExerciseModel(dto));
    this.draftExercise = new ExerciseModel();
  }

  serialize(): WorkoutDTO {
    return {
      name: toJS(this.name),
      sets: toJS(
        this.sets.map((set) => ({
          name: set.name,
          repeats: set.repeats,
          exercises: set.exercises.map((ex) => ex.serialize()),
        }))
      ),
    };
  }
}

export default WorkoutModel;
