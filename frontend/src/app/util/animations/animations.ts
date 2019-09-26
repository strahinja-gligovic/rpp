import { trigger, transition, style, animate, state } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
        animate(1000, style({ opacity: 0 }))
    ])
]);
export const slideIn = trigger('slideIn', [
    state('*', style({
        transform: 'translateX(100%)',
    })),
    state('in', style({
        transform: 'translateX(0)',
    })),
    state('out', style({
        transform: 'translateX(-100%)',
    })),
    transition('* => in', animate('600ms ease-in')),
    transition('in => out', animate('600ms ease-in'))
]);

export const flyInOut = trigger('flyInOut', [
    state('in', style({ transform: 'translateY(0)' })),
    transition('void => *', [
        style({ transform: 'translateY(+100%)' }),
        animate(200)
    ]),
    transition('* => void', [
        animate(200, style({ transform: 'translateY(100%)' }))
    ])
]);

export const shrinkOut = trigger('shrinkOut', [
    state('in', style({ height: '*' })),
    transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
    ])
]);

export const ease = trigger('ease', [
    state('in', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('void => *', [
        style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
        animate('0.3s ease-in')
    ]),
    transition('* => void', [
        animate('0.3s 0.1s ease-out', style({
            opacity: 0,
            transform: 'translateX(100%)'
        }))
    ])
]);

export const easeTitleRight = trigger('easeTitleRight', [
    state('in', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('void => *', [
        style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
        animate('1.0s ease-in')
    ]),
    transition('* => void', [
        animate('1.0s 0.2s ease-out', style({
            opacity: 1,
            transform: 'translateX(100%)'
        }))
    ])
]);

export const easeTitleLeft = trigger('easeTitleLeft', [
    state('in', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('void => *', [
        style({
            opacity: 0,
            transform: 'translateX(5%)'
        }),
        animate('1s ease-in')
    ]),
    transition('* => void', [
        animate('1s 0.2s ease-out', style({
            opacity: 1,
            transform: 'translateX(100%)'
        }))
    ])
]);
