import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public loadingSubject = signal(false);

  public toggleSpinner(): void {
    this.loadingSubject.update((oldValue) => !oldValue);
  }
}