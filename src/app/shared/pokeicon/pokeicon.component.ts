import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon';

@Component({
  selector: 'app-pokeicon',
  templateUrl: './pokeicon.component.html',
  styleUrls: ['./pokeicon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeiconComponent {
  @Input()
  pokemon!: Pokemon;

  @Input()
  height = 56;

  get width(): number {
    return (68 / 56) * this.height;
  }
}
