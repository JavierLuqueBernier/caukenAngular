import { SECTION_NAME, REGISTER_ACTIVE, LOGIN_ACTIVE, ROUTE_AFTER } from './actions';
import { tassign } from 'tassign';

export interface IAppState {
  sectionName: string;
  registerActive: boolean;
  loginActive: boolean;
  //Es volver a la ruta en la que estábamos tras hacer login;
  routeAfter: string;


}

export const INITIAL_STATE: IAppState = {
  sectionName: '',
  registerActive: false,
  loginActive: false,
  routeAfter: ''
};

export function rootReducer(state, action): IAppState {
  console.log(action);
  switch (action.type) {
    case SECTION_NAME: {
      return tassign(state, { sectionName: action.sectionName });


    }
    case REGISTER_ACTIVE: {
      return tassign(state, { registerActive: action.registerActive });
    }
    case LOGIN_ACTIVE: {
      return tassign(state, { loginActive: action.loginActive });
    }
    case ROUTE_AFTER: {
      return tassign(state, { routeAfter: action.routeAfter })
    }
  }
  return state;
}
