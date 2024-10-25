import { IFormResolverState } from "../../interfaces";
import { IMemento } from "../../interfaces/memento";
import { FormResolver } from "./form-resolver";

export class FormSnapshot implements IMemento {
  constructor(
    private originator: FormResolver,
    private state: IFormResolverState
  ) {}

  rollback(): void {
    this.originator.state = this.state;
  }
}
