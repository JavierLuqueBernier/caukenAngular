import {
  SECTION_NAME,
  /*  REGISTER_ACTIVE,
  LOGIN_ACTIVE, */
  DECISION_ACTIVE,
  ROUTE_AFTER,
  POST_DATA,
  ID_PADRE,
  SEARCH,
  SEARCH_ACTIVE,
  OCULTAR_NAV
} from './actions';

import { tassign } from 'tassign';


export interface IAppState {
  sectionName: string;
  ocultarNav: boolean;
  decisionActive: boolean;
  /* loginActive:boolean;
    registerActive:boolean; */
  routeAfter: string;
  postData: any;
  idPadre: number;
  search: any;
  searchActive: boolean;


}

export const INITIAL_STATE: IAppState = {
  sectionName: '',
  ocultarNav: false,
  decisionActive: false,
  /* registerActive: false, */
  /* loginActive: false, */
  routeAfter: '',
  postData: {

  },
  idPadre: null,
  search: {},
  searchActive: false,
};

export function rootReducer(state, action): IAppState {
  console.log(action);
  switch (action.type) {
    case SECTION_NAME: {
      return tassign(state, { sectionName: action.sectionName });


    }
    /*  case REGISTER_ACTIVE: {
       return tassign(state, { registerActive: action.registerActive });
     }
     case LOGIN_ACTIVE: {
       return tassign(state, { loginActive: action.loginActive });
     }
     case DECISION_ACTIVE: {
       return tassign(state, { decisionActive: action.decisionActive });
     } */
    case DECISION_ACTIVE: {
      return tassign(state, { decisionActive: action.decisionActive });
    }
    case OCULTAR_NAV: {
      return tassign(state, { ocultarNav: action.ocultarNav });
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

    case SEARCH_ACTIVE: {
      return tassign(state, { searchActive: action.searchActive })
    }
  }
  return state;
}
