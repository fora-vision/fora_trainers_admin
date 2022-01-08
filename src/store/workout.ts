import { action, makeObservable, observable, toJS } from "mobx";
import { WorkoutDTO } from "./models";
import ExerciseModel from "./exercise";

class WorkoutModel {
  name: string;
  isDraft: boolean;

  draftExercise = new ExerciseModel();
  sets: {
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
    });

    this.isDraft = dto == null;
    this.name = dto?.name ?? "";
    this.sets =
      dto?.sets.map((set) => ({
        name: set.name,
        repeats: set.repeats,
        exercises: set.exercises.map((ex) => new ExerciseModel(ex)),
      })) ?? [];
  }

  getExercise(set: number, exercise: number | "create"): ExerciseModel | null {
    console.log(this);
    if (exercise === "create") return this?.draftExercise ?? null;
    return this?.sets[set]?.exercises[exercise] ?? null;
  }

  setName(name: string) {
    this.name = name;
  }

  addSet() {
    this.sets.push({ name: "", repeats: 1, exercises: [] });
  }

  changeSetName(set: number, name: string) {
    this.sets[set].name = name;
  }

  changeSetRepeats(set: number, repeat: number) {
    this.sets[set].repeats = repeat;
  }

  removeSet(set: number) {
    this.sets.splice(set, 1);
  }

  removeExercise(set: number, exercise: number) {
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
