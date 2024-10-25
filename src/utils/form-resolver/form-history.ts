import { FormResolver } from "./form-resolver";
import { FormSnapshot } from "./form-snapshot";

export class FormHistory {
  private backupSnapshots: FormSnapshot[] = [];
  public undo() {
    if (!this.backupSnapshots.length) return;
    this.backupSnapshots[this.backupSnapshots.length - 1].rollback();
    this.backupSnapshots.pop();
  }

  public createSnapshotBackup(resolver: FormResolver) {
    this.backupSnapshots.push(resolver.create());
  }
}

export const formHistory = new FormHistory();
