import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faEraser, faGripLinesVertical, faPen, faTimes, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { VERSION } from './version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly auth: AngularFireAuth) {}
  readonly version = VERSION;

  ngOnInit(): void {
    this.auth.signInAnonymously();

    library.add(faEraser, faPen, faTimes, faGripLinesVertical, faCloudUploadAlt);
    dom.watch();
  }
}
