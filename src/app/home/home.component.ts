import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObservableSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObservableSubscription = interval( 1000 ).subscribe( count => {
    //   console.log(count);
      
    // });

    const customIntervalObservable = Observable.create( observer  => {
      let count = 0;
      setInterval( () =>{
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3 ) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000);
    });

    this.firstObservableSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error);
    }, () => {
      console.log('Completed');
      
    });
  }

  ngOnDestroy(): void {
    this.firstObservableSubscription.unsubscribe();
  }

}
