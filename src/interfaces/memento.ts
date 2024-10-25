export interface IOrigiantor {
  create(): IMemento;
}

export interface IMemento {
  rollback(): void;
}
