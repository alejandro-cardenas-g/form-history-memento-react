import { IFormResolverState } from "../../interfaces";
import { IOrigiantor } from "../../interfaces/memento";
import { FormSnapshot } from "./form-snapshot";

export class FormResolver implements IOrigiantor {
  private _state!: IFormResolverState;

  set state(state: IFormResolverState) {
    this._state = state;
  }

  get state() {
    if (!this._state) throw new Error("");
    return this._state;
  }

  public create(): FormSnapshot {
    return new FormSnapshot(this, this._state);
  }
}
