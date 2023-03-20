import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  getCollection<T>(collectionName: string): Observable<T[]> {
    return this.firestore.collection<T>(collectionName).valueChanges();
  }

  getDocument<T>(documentPath: string): AngularFirestoreDocument<T> {
    return this.firestore.doc<T>(documentPath);
  }

  addDocument<T>(collectionName: string, data: T): Promise<DocumentReference<T>> {
    return this.firestore.collection<T>(collectionName).add(data);
  }
}
