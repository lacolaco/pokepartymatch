import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SearchParams {
  constructor(private readonly loc: Location) {}

  get(name: string): string | null {
    const searchParams = new URL(location.href).searchParams;
    return searchParams.get(name);
  }

  set(name: string, value: string): void {
    const searchParams = new URL(location.href).searchParams;
    searchParams.set(name, value);
    this.loc.go('', searchParams.toString());
  }

  delete(name: string): void {
    const searchParams = new URL(location.href).searchParams;
    searchParams.delete(name);
    this.loc.go('', searchParams.toString());
  }
}
