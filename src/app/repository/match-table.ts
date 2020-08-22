import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { MatchTable } from '../domain/match-table';

type MatchTableDocument = {
  json: string;
};

// TODO: migrate name to "pokepartymatch"
const localStorageMatchTableDefaultKey = 'pokemonbuild.matchTable.v1.1';

@Injectable({ providedIn: 'root' })
export class MatchTableRepository {
  constructor(private readonly firestore: AngularFirestore, private readonly auth: AngularFireAuth) {}

  get matchTableCollection(): AngularFirestoreCollection {
    return this.firestore.collection('matchTables');
  }

  findById(id: string): Promise<MatchTable | null> {
    return this.matchTableCollection
      .doc<MatchTableDocument>(id)
      .valueChanges()
      .pipe(
        map((doc) => {
          if (!doc) {
            return null;
          }
          return MatchTable.fromJSON(JSON.parse(doc.json));
        }),
        first()
      )
      .toPromise();
  }

  async save(matchTable: MatchTable): Promise<string> {
    const user = await this.auth.currentUser;
    if (user == null) {
      throw new Error('User not authenticated.');
    }
    return this.matchTableCollection
      .add({
        uid: user.uid,
        json: JSON.stringify(matchTable.toSerializable()),
        createdAt: new Date(),
      })
      .then((ref) => ref.id);
  }

  getLocalSave(): MatchTable | null {
    const matchTable = localStorage.getItem(localStorageMatchTableDefaultKey);
    if (!matchTable) {
      return null;
    }
    return MatchTable.fromJSON(JSON.parse(matchTable));
  }

  setLocalSave(matchTable: MatchTable): void {
    const json = JSON.stringify(matchTable.toSerializable());
    localStorage.setItem(localStorageMatchTableDefaultKey, json);
  }
}
