import { SECTION_NAME, REGISTER_ACTIVE, LOGIN_ACTIVE } from './actions';
import { tassign } from 'tassign';

export interface IAppState {
  sectionName: string;
  registerActive: boolean;
  loginActive:boolean;


}

export const INITIAL_STATE: IAppState = {
  sectionName: '',
  registerActive: false,
  loginActive: false,
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
  }
  return state;
}
