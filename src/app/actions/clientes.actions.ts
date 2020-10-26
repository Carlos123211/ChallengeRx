import { Action } from "@ngrx/store";
import { Client } from "../models/client.models";

export const GET_CLIENT = "Client get";
export const GET_CLIENT_SUCCESS = "Client get success";

export const POST_CLIENT = "Client post";
export const POST_CLIENT_SUCCESS = "Client post success";
export const POST_CLIENT_FAIL = "Client post fail";

export class GetClient implements Action {
  readonly type = GET_CLIENT;
  constructor(public payload: string) {}
}

export class GetClientSuccess implements Action {
  readonly type = GET_CLIENT_SUCCESS;
  constructor(public payload: Client[]) {}
}

export class PostClient implements Action {
  readonly type = POST_CLIENT;
  constructor(public payload: any) {}
}

export class PostClientSuccess implements Action {
  readonly type = POST_CLIENT_SUCCESS;
  constructor(public payload?: any) {}
}

export class PostClientFail implements Action {
  readonly type = POST_CLIENT_FAIL;
  constructor(public payload?: any) {}
}

export type All =
  | GetClient
  | GetClientSuccess
  | PostClient
  | PostClientSuccess
  | PostClientFail;
