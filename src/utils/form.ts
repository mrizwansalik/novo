import { FormEvent } from "react";
import get from "lodash/get";

export function formReset(formName: string): void {
  if (!formName) return;
  const elements: NodeListOf<HTMLElement> = document?.getElementsByName(
    formName
  );
  //INFO: using any because of HTMLElement don't have reset method
  elements.forEach((form: any) => {
    form?.reset();
  });
}

export function makeInputTextUppercase(e) {
  e.target.value = ("" + e.target.value).toUpperCase();
}

export function parseCommaStringToNumber(commaString: string): number {
  return Number(commaString ? commaString.replace(/\D/g, "") : "0");
}

export function thousandSeparatorByComma(number: number): string {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
}

export function thousandSeparatorByDot(number: number): string {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
}

export function handleNumberSeparatorInput(
  event: FormEvent<HTMLInputElement>
): void {
  const formattedNumberValue = parseCommaStringToNumber(
    event.currentTarget.value
  );
  event.currentTarget.value = thousandSeparatorByComma(formattedNumberValue);
}

export function validateNumber(event: Event): void {
  const firstCharacter: string = get(event, "currentTarget.value[0]", "");
  (event.target as any).value =
    firstCharacter === "0"
      ? (event.target as any).value.replace(/.*/g, "")
      : (event.target as any).value.replace(/[^0-9]/g, "");
}
