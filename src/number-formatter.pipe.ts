/**
 * Created by aharutyunyan on 5/11/2017.
 */
import { Pipe, PipeTransform } from "@angular/core";

const PADDING = "0000000000000000";

@Pipe({ name: "numberTransform" })
export class NumberFormatterPipe implements PipeTransform {

  private PREFIX: string
  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  private SUFFIX: string

  constructor() {
    // TODO comes from configuration settings
    this.PREFIX = ''
    this.DECIMAL_SEPARATOR = ".";
    this.THOUSANDS_SEPARATOR = ",";
    this.SUFFIX = ''
  }

  transform(value: number, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").toString()
      .split(".");

    let newFraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fraction.length /*fractionSize*/)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

    return this.PREFIX + integer + newFraction + this.SUFFIX;
  }

  parse(value: string, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").replace(this.PREFIX, "")
      .replace(this.SUFFIX, "")
      .split(this.DECIMAL_SEPARATOR);

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");

    let newFraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fraction.length /*fractionSize*/)
      : "";

    return integer + newFraction;
  }

}
