import { type Dispatch } from "redux";

let dispatchFunction: Dispatch<any> | null = null;
export const setDispatchFunction = (dispatch: Dispatch<any>) => {
  dispatchFunction = dispatch;
};

export const dispatchAction = (action: any) => {
  if (dispatchFunction != null) {
    dispatchFunction(action);
  }
};
