import { Component, OnInit } from "@angular/core";

import { Client, clients } from "./models/client.models";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as ClientActions from "./actions/clientes.actions";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

interface AppState {
  client: clients;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  clients$: Observable<clients>;
  clicked: boolean = false;

  dateval: NgbDateStruct;
  date: { year: number; month: number };

  clientPost: Client = {
    apellido: "",
    edad: null,
    fecha_nac: "",
    nombre: "",
  };

  constructor(private store: Store<AppState>, private calendar: NgbCalendar) {
    this.clients$ = this.store.select("client");
  }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.store.dispatch(new ClientActions.GetClient("/Clientes/"));
  }

  calculateAge(e) {
    let dateString = new Date(
      `${e.year}/${e.month}/${e.day < 10 ? e.day : "0" + e.day}`
    );
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.clientPost.fecha_nac = `${e.day > 10 ? e.day : "0" + e.day}-${
      e.month
    }-${e.year}`;
    this.clientPost.edad = age;
  }

  average(arr) {
    if (arr)
      return (
        arr.reduce((a, b) => {
          return a + b.edad;
        }, 0) / arr.length
      );
  }

  standardDeviation(arr) {
    if (arr) {
      const n = arr.length;
      const mean =
        arr.reduce((a, b) => {
         return a + b.edad;
        }, 0) / n;
      return Math.sqrt(
        arr.map((x) => Math.pow(x.edad - mean, 2)).reduce((a, b) => a + b) / n
      );
    }
  }

  postClients() {
    this.store.dispatch(new ClientActions.PostClient(this.clientPost));
    this.clientPost = {
      apellido: "",
      edad: null,
      fecha_nac: "",
      nombre: "",
    };
  }
}
