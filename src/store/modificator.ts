import { action, computed, makeObservable, observable, toJS } from "mobx";
import { t } from "i18next";
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
      SKIP: t("store.modificator.skips"),
      COMPLICATE: t("store.modificator.complications"),
      SIMPLIFY: t("store.modificator.simplifications"),
    };

    const gender = {
      1: t("store.modificator.men"),
      2: t("store.modificator.women"),
    };

    const bodyType = {
      weak: t("store.modificator.complete"),
      normal: t("store.modificator.ordinary"),
      strong: t("store.modificator.sports"),
    };

    const value = this.type === "SKIP" ? "" : `${this.value}%`;
    const sex = this.sex ? gender[this.sex] : t("store.modificator.everyone");
    const type = this.bodyType ? bodyType[this.bodyType] : "";
    return `${types[this.type]} ${value} ${t("store.modificator.for")} ${sex} ${type}`;
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
