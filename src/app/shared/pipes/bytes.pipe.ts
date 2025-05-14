import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytes',
})
export class BytesPipe implements PipeTransform {
  static formats: { [key: string]: { max: number; prev?: string } } = {
    B: { max: 1024 },
    kB: { max: Math.pow(1024, 2), prev: 'B' },
    MB: { max: Math.pow(1024, 3), prev: 'kB' },
    GB: { max: Math.pow(1024, 4), prev: 'MB' },
    TB: { max: Number.MAX_SAFE_INTEGER, prev: 'GB' },
  };

  transform(input: any, decimal: number = 0): any {
    let bytes = input;
    for (const key in BytesPipe.formats) {
      const format = BytesPipe.formats[key];
      if (bytes <= format.max) {
        const result = Math.trunc(BytesPipe.calculateResult(format, bytes));
        return BytesPipe.formatResult(result, key);
      }
    }
  }

  static formatResult(result: number, unit: string): string {
    return `${result} ${unit}`;
  }

  static calculateResult(format: { max: number; prev?: string }, bytes: number) {
    const prev = format.prev ? BytesPipe.formats[format.prev] : undefined;
    return prev ? bytes / prev.max : bytes;
  }
}
