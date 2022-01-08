import { action, makeObservable, observable, toJS } from "mobx";
import { ExerciseDTO } from "./models";

class ExerciseModel {
  isDraft: boolean;
  type: "REPEATS" | "TIME";
  value: number;
  label: string;
  modificators: [] = [];

  constructor(dto?: ExerciseDTO) {
    makeObservable(this, {
      type: observable,
      value: observable,
      label: observable,
      modificators: observable,

      setValue: action,
      setLabel: action,
      setType: action,
    });

    this.isDraft = dto == null;
    this.type = dto?.type ?? "REPEATS";
    this.value = dto?.value ?? 5;
    this.label = dto?.label ?? "pushups";
  }

  getExecuteValue() {
    if (this.type === "REPEATS") return `${this.value} повторов`;
    else return `${this.value} секунд`;
  }

  setValue(value: number) {
    this.value = value;
  }

  setLabel(label: string) {
    this.label = label;
  }

  setType(type: "REPEATS" | "TIME") {
    this.type = type;
  }

  serialize(): ExerciseDTO {
    return {
      type: toJS(this.type),
      value: toJS(this.value),
      label: toJS(this.label),
      modificators: toJS(this.modificators),
    };
  }
}

export default ExerciseModel;
