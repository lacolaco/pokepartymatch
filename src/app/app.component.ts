import { Component, OnInit } from '@angular/core';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faEraser, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { VERSION } from './version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly version = VERSION;

  ngOnInit(): void {
    library.add(faEraser, faPen, faTimes);
    dom.watch();
  }
}
