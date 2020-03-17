import { SECTION_NAME } from './actions';
import { tassign } from 'tassign';

export interface IAppState {
  sectionName: string;


}

export const INITIAL_STATE: IAppState = {
  sectionName: ''
};

export function rootReducer(state, action): IAppState {
  console.log(action);
  switch (action.type) {
    case SECTION_NAME: {
      return tassign(state, { sectionName: action.sectionName });


    }
      }
  return state;
}
