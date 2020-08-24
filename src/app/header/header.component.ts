import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchTableUsecase } from '../shared/match-table/match-table.usecase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private readonly matchTableUsecase: MatchTableUsecase) {}

  readonly state$ = combineLatest([this.matchTableUsecase.readonly$]).pipe(
    map(([readonly]) => ({
      readonly,
    }))
  );

  saveMatchTable() {
    this.matchTableUsecase.saveMatchTable();
  }
}
