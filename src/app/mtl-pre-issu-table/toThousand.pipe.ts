import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "toThousandPipe",
})
export class toThousandPipe implements PipeTransform {
  transform(value: number) {
    return this.toThousandNumber(value);
  }

  toThousandNumber(param: number) {
    const paramStr = param.toString();
    if (paramStr.length > 3) {
      return paramStr.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    return paramStr;
  }
}