import React from "react";
import DatePicker from "react-datepicker";

export interface IDateInputProps {
  showMonthYearPicker?: boolean;
  showYearDropdown?: boolean;
  dateFormat?: string;
  placeholderText?: string;
  startDate?: string | Date;
  setStartDate?: (date: Date) => void;
  onChange?: (date: Date) => void;
}

const DateInput = (props: IDateInputProps) => {
  return <DatePicker {...props} />;
};

export default DateInput;
