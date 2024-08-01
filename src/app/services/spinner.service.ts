import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public loadingSubject = signal(false);

  public showSpinner(): void {
    this.loadingSubject.set(true);
  }

  public hideSpinner(): void {
    this.loadingSubject.set(false);
  }
}