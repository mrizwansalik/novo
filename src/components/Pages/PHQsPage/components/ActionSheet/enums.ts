export enum CsvState {
  IN_PROGRESS = "In Progress",
  COMPLETE = "Complete",
}

export enum Status {
  PROCESSING = "processing",
  FINISHED = "finished",
  CANNOT_PROCESS = "cannotProcess",
  IMMEDIATE_FINISHED = "immediateFinished",
}

export enum StatusMessage {
  GENERATING_CENSUS_REPORT = "Generating Census Report...",
  GENERATED_CENSUS_REPORT = "Census Report Generated!",
  GENERATING_HEALTH_REPORT = "Generating Health Report...",
  GENERATED_HEALTH_REPORT = "Health Report Generated!",
  GENERATING_STATUS_REPORT = "Generating Status Report...",
  GENERATED_STATUS_REPORT = "Status Report Generated!",
  THERE_ARE_NO_SELECTED_EMPLOYEES = "There are no selected employees",
  THERE_ARE_NO_SELECTED_EMPLOYEES_WITH_SIGNED_PHQS = "There are no selected employees with signed PHQs",
  SENDING_INVITE = "Sending invite...",
  INVITE_SENT = "Invite sent!",
  DELETED = "Employee deleted!",
  DELETING = "Deleting employee...",
  DOWNLOADING_SIGNED_PHQS = "Downloading signed PHQs...",
  DOWNLOADED_SIGNED_PHQS = "Signed PHQ documents downloaded.",
}
