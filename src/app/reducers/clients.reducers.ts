import { Client } from './../models/client.models';
import * as clientActions from "../actions/clientes.actions";

export type Action = clientActions.All;

export function clientReducer(state: Client, action: Action){

    switch (action.type) {
        case clientActions.GET_CLIENT:
          return { ...state, loading: true };
        case clientActions.GET_CLIENT_SUCCESS:
          return { ...state, clients : action.payload, loading: false };
        case clientActions.POST_CLIENT:
          return { ...state, ...action.payload, loading: true };
        case clientActions.POST_CLIENT_SUCCESS:
          return { ...state, loading: false };
        case clientActions.POST_CLIENT_FAIL:
          return { ...state, ...action.payload, loading: false };
        default:
          return state;
      }
}