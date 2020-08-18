import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { Pokemon } from 'src/app/domain/pokemon';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[pokepickerItem]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.pokepicker-item]': 'true',
    '[attr.tabindex]': 'active ? "0" : "-1"',
    '[class.active]': 'active',
  },
})
export class PokepickerItemDirective implements FocusableOption {
  @Input('pokepickerItem')
  pokemon!: Pokemon;

  @Input()
  active = false;

  disabled?: boolean | undefined;

  constructor(private readonly elRef: ElementRef<HTMLElement>, private readonly ngZone: NgZone) {}

  focus(origin?: 'touch' | 'mouse' | 'keyboard' | 'program' | null | undefined): void {
    this.ngZone.runOutsideAngular(() => {
      this.elRef.nativeElement.focus();
    });
  }
}
