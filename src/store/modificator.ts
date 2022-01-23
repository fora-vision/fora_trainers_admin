import { action, computed, makeObservable, observable, toJS } from "mobx";
import { ModifierDTO } from "./models";

class ModificatorModel {
  isDraft: boolean;
  type: "SKIP" | "COMPLICATE" | "SIMPLIFY";
  bodyType: null | "strong" | "normal" | "weak";
  value: number;

  minAge: number;
  maxAge: number;
  sex: null | 1 | 2;

  constructor(dto?: ModifierDTO) {
    makeObservable(this, {
      type: observable,
      value: observable,
      bodyType: observable,
      minAge: observable,
      maxAge: observable,
      sex: observable,

      setGender: action,
      setType: action,
      setValue: action,
      setBodyType: action,
      formattedName: computed,
    });

    this.isDraft = dto == null;
    this.type = dto?.type ?? "SKIP";
    this.value = dto?.value ?? 5;
    this.bodyType = dto?.body_type ?? null;
    this.minAge = dto?.min_age ?? 0;
    this.maxAge = dto?.max_age ?? 100;
    this.sex = dto?.sex ?? null;
  }

  get formattedName() {
    const types = {
      SKIP: "Пропуски",
      COMPLICATE: "Усложнения",
      SIMPLIFY: "Упрощения",
    };

    const gender = {
      1: "мужчин",
      2: "женщин",
    };

    const bodyType = {
      weak: "полных",
      normal: "обычных",
      strong: "спортивных",
    };

    const value = this.type === "SKIP" ? "" : `${this.value}%`;
    const sex = this.sex ? gender[this.sex] : "всех";
    const type = this.bodyType ? bodyType[this.bodyType] : "";
    return `${types[this.type]} ${value} для ${sex} ${type}`;
  }

  setBodyType(value: "strong" | "normal" | "weak") {
    this.bodyType = value;
  }

  setType(value: "SKIP" | "COMPLICATE" | "SIMPLIFY") {
    this.type = value;
  }

  setGender(sex: 1 | 2 | null) {
    this.sex = sex;
  }

  setValue(value: number) {
    this.value = value;
  }

  serialize(): ModifierDTO {
    return {
      type: toJS(this.type),
      body_type: toJS(this.bodyType),
      value: toJS(this.value),
      min_age: toJS(this.minAge),
      max_age: toJS(this.maxAge),
      sex: toJS(this.sex),
    };
  }
}

export default ModificatorModel;
