import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatchValue } from '../../domain/enemy';

@Component({
  selector: 'app-match-input',
  templateUrl: './match-input.component.html',
  styleUrls: ['./match-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchInputComponent {
  @Input()
  value!: MatchValue;

  @Input()
  readonly = false;

  @Output()
  valueChange = new EventEmitter<MatchValue>();

  onButtonClick(match: 'win' | 'loss'): void {
    switch (match) {
      case 'win': {
        if (this.value === 'win') {
          this.valueChange.next(null);
        } else {
          this.valueChange.next('win');
        }
        return;
      }
      case 'loss': {
        if (this.value === 'loss') {
          this.valueChange.next(null);
        } else {
          this.valueChange.next('loss');
        }
        return;
      }
    }
  }
}
