import { trigger, state, animate, transition, style } from '@angular/animations';


export const openClose =
  trigger('openClose', [

    state('open', style({
      marginLeft: '52%',
    })),
    state('closed', style({
      marginRight: '52%',
      borderTopLeftRadius: '15px',
      borderBottomLeftRadius: '15px',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    })),
    state('openSignIn', style({
      opacity: '1',
    })),
    state('closedSignIn', style({
      opacity: '0',
      marginLeft: '48%',
    })),
    state('openSignUp', style({
      opacity: '1',
      marginLeft: '49%',
    })),
    state('closedSignUp', style({
      opacity: '0'
    })),

    transition('open <=> closed', [
      animate('0.6s')
    ]),
    transition('openSignIn <=> closedSignIn', [
      animate('0.6s')
    ]),
    transition('openSignUp <=> closedSignUp', [
      animate('0.6s')
    ]),
  ]);