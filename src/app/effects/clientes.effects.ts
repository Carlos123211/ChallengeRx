import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

import { AngularFirestore } from "@angular/fire/firestore";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError, delay } from "rxjs/operators";

import * as clientActions from "../actions/clientes.actions";
import { Client, clients } from "../models/client.models";

import { v4 as uuidv4 } from 'uuid';
export type Action = clientActions.All;

@Injectable()
export class ClientEffects {
  constructor(private actions: Actions, private db: AngularFireDatabase, private firestore:AngularFirestore) {}

  @Effect()
  getClient: Observable<Action> = this.actions.pipe(
    ofType(clientActions.GET_CLIENT),
    map((action: clientActions.GetClient) => action.payload),
    mergeMap((payload) => this.db.list(payload).valueChanges()),
    map((client: any) => {
      return new clientActions.GetClientSuccess(client);
    })
  );

  @Effect()
  postClient: Observable<Action> = this.actions.pipe(
    ofType(clientActions.POST_CLIENT),
    map((action: clientActions.PostClient) => action.payload),
    mergeMap((payload) =>
      of(this.db.object(`Clientes/${uuidv4()}`).set(payload))
    ),
    map(() => new clientActions.PostClientSuccess()),
    catchError((err) =>
      of(new clientActions.PostClientFail({ error: err.message }))
    )
  );
}
