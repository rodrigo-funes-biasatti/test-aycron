import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  getCollection<T>(collectionName: string): Observable<T[]> {
    return this.firestore.collection<T>(collectionName, ref => ref.orderBy('code')).valueChanges();
  }

  getDocument<T>(documentPath: string): AngularFirestoreDocument<T> {
    return this.firestore.doc<T>(documentPath);
  }

  addDocument<T>(collectionName: string, data: T): Promise<DocumentReference<T>> {
    return this.firestore.collection<T>(collectionName).add(data);
  }

  getDocumentByProp<T>(collectionName: string, prop: string, propValue: any): Observable<T[]> {
    return this.firestore.collection<T>(collectionName, ref => ref.where(prop, '==', propValue)).valueChanges();
  }

  deleteDocument(collectionName: string, prop: string, propValue: any): void {
    this.firestore
      .collection(collectionName, ref => ref.where(prop, '==', propValue))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
  }
}