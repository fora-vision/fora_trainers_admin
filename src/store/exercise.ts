import { action, makeObservable, observable, toJS } from "mobx";
import { ExerciseDTO } from "./models";
import ModificatorModel from "./modificator";

class ExerciseModel {
  isDraft: boolean;
  type: "REPEATS" | "TIME";
  value: number;
  label: string;

  modificators: ModificatorModel[] = [];
  draftModificator = new ModificatorModel();

  constructor(dto?: ExerciseDTO) {
    makeObservable(this, {
      type: observable,
      value: observable,
      label: observable,
      modificators: observable,
      draftModificator: observable,

      removeModificator: action,
      setValue: action,
      setLabel: action,
      setType: action,
    });

    this.isDraft = dto == null;
    this.value = dto?.value ?? 5;
    this.type = dto?.type ?? "REPEATS";
    this.label = dto?.label ?? "pushups";
    this.modificators = dto?.modificators.map((mod) => new ModificatorModel(mod)) ?? [];
  }

  getExecuteValue() {
    if (this.type === "REPEATS") return `${this.value} повторов`;
    else return `${this.value} секунд`;
  }

  getModificator(id: number): ModificatorModel | null {
    return this.modificators[id] ?? null;
  }

  saveDraftModificator() {
    const dto = this.draftModificator.serialize();
    this.modificators.push(new ModificatorModel(dto));
    this.draftModificator = new ModificatorModel();
  }

  removeModificator(id: number) {
    console.log("removeModificator", id);
    this.modificators.splice(id, 1);
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
      modificators: this.modificators.map((mod) => mod.serialize()),
    };
  }
}

export default ExerciseModel;
