import { Observable, timer } from 'rxjs';

console.log('App had started');

/*
//timer observable

timer(2000).subscribe({
  next: value => console.log(value),
  complete: () => console.log('Finished')
});
*/

/*
// new observable constructor

const timer$ = new Observable<number>(subscriber => {
  setTimeout(() => {
    subscriber.next(0);
    subscriber.complete();
  }, 2000);
});

timer$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Done')
});
*/

/*
//Unsubscribing from timer observable
const subscription = timer(2000).subscribe({
  next: value => console.log(value),
  complete: () => console.log('Completed')
});

setTimeout(() => {
  subscription.unsubscribe();
}, 1000);
*/

// Unsubscribing from created observable
const timer$ = new Observable<number>(subscriber => {
  const timeoutId = setTimeout(() => {
    console.log('Timeout! Memory leak!');
    subscriber.next(0);
    subscriber.complete();
  }, 2000);

  return () => clearTimeout(timeoutId);
});

const subscription = timer$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Executed')
});

setTimeout(() => {
  subscription.unsubscribe();
  console.log('Unsubscribed');
}, 1000);
