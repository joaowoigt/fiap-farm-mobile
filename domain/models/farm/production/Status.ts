export enum StatusType {
  waiting = "waiting",
  inProgress = "inProgress",
  done = "done",
}

export enum Status {
  waiting = "waiting",
  inProgress = "in Progress",
  done = "done",
}

export function getStatusFromDb(status: string) {
  switch (status) {
    case "waiting":
      return Status.waiting;
    case "in Progress":
      return Status.inProgress;
    case "done":
      return Status.done;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
}

export const getStatusFromUi = (status: StatusType): Status => {
  switch (status) {
    case StatusType.waiting:
      return Status.waiting;
    case StatusType.inProgress:
      return Status.inProgress;
    case StatusType.done:
      return Status.done;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};
