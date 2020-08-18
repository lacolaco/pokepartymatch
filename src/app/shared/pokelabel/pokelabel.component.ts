import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon';

@Component({
  selector: 'app-pokelabel',
  templateUrl: './pokelabel.component.html',
  styleUrls: ['./pokelabel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokelabelComponent {
  @Input()
  pokemon!: Pokemon;
}
