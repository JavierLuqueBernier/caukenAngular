import { SECTION_NAME, REGISTER_ACTIVE, LOGIN_ACTIVE, DECISION_ACTIVE, ROUTE_AFTER, POST_DATA, ID_PADRE, SEARCH } from './actions';
import { tassign } from 'tassign';


export interface IAppState {
  sectionName: string;
  registerActive: boolean;
  decisionActive: boolean;
  loginActive: boolean;
  // Es volver a la ruta en la que estábamos tras hacer login;
  routeAfter: string;
  postData: any;
  idPadre: number;
  search: string;


}

export const INITIAL_STATE: IAppState = {
  sectionName: '',
  registerActive: false,
  loginActive: false,
  decisionActive: false,
  routeAfter: '',
  postData: {

  },
  idPadre: null,
  search: null,
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
    case DECISION_ACTIVE: {
      return tassign(state, { decisionActive: action.decisionActive });
    }
    case ROUTE_AFTER: {
      return tassign(state, { routeAfter: action.routeAfter });
    }
    case POST_DATA: {
      return tassign(state, { postData: action.postData });
    }
    case ID_PADRE: {
      return tassign(state, { idPadre: action.idPadre });
    }
    case SEARCH: {
      return tassign(state, { search: action.search });
    }
  }
  return state;
}
