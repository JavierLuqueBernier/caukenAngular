import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';


export const slideInAnimation =
  trigger('routeAnimations', [
    /* transition('* => *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateY(-100%)', opacity: '0%' }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(0%)', opacity: '100%' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)', opacity: '0%' }))
        ], { optional: true }),
      ])
    ]), */
    transition('New => *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateY(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({
            width: '4rem', height: '4rem', right: '1rem', bottom: '1rem'
          }),
          animate('0.5s ease-in-out', style({
            width: '500rem', height: '500rem', right: '-260rem', bottom: '-260rem'
          }))
        ], { optional: true }),
      ])
    ]),
    /*
    transition('New => *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('Home => New', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('Login => New', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]), */
  ]);
