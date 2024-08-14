import { Component, ElementRef, inject, OnInit, ViewChild, signal, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../services/user.service';
import { NgStyle } from '@angular/common';
import { IUser } from '../../interfaces/user.interface';
import { NotificationService } from '../../services/notification.service';
import { DropdownModule } from 'primeng/dropdown';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, InputGroupModule, InputGroupAddonModule, ButtonModule, NgStyle, DropdownModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnDestroy {
  @ViewChild('pfpInput') pfpInput!: ElementRef;

  public userService = inject(UserService);
  private _notificationService = inject(NotificationService);
  private _currencyService = inject(CurrencyService);
  private _languageService = inject(LanguageService);

  public inputedPfP?: HTMLInputElement;
  public languageOptions = signal<string[]>(['English', 'Serbian']);
  public currencyOptions = signal<string[]>(['Dollar - $', 'Euro - €']);
  public onDestroy$: Subject<void> = new Subject();


  public onPfpClick(): void {
    this.pfpInput.nativeElement.click();
  }

  public onPfpSelected(event: Event): void {
    this.inputedPfP = event.target as HTMLInputElement;
    if (this.inputedPfP && this.inputedPfP.files && this.inputedPfP.files.length > 0) {
      this.userService.userData!.profile_picture_url = URL.createObjectURL(this.inputedPfP.files[0]);
    }
  }

  public onSubmit(): void {
    const changedInputs = this.userService.checkChangedInputs();
  
    if (this.inputedPfP?.files) {
      this._uploadProfilePicture(this.inputedPfP.files[0]);
    }
  
    if (Object.keys(changedInputs).length > 0) {
      this._uploadUserData(changedInputs);
    } else if (this.inputedPfP?.files) {
      this._notificationService.showSnackbar('Success', 'Profile picture updated successfully');
      this.inputedPfP = undefined;
    }
  }

  private _uploadProfilePicture(file: File): void {
    const formData = new FormData();
    formData.append('profile_picture', file, file.name);
    this.userService.profilePictureCall(formData).subscribe();
  }

  private _uploadUserData(changedInputs: Partial<IUser>): void {
    this.userService.updateUserData(changedInputs).subscribe({
      next: response => {
        this.userService.accountSettingsForm.get('password')?.setValue('');
        this._currencyService.setCurrencySymbol(response);
        this._languageService.setPreferredLanguage(response);
      },
      error: error => {
        this._notificationService.showSnackbar('Error', 'Oops something went wrong while saving the data!');
      },
      complete: () => {
        this.userService.accountSettingsForm.markAsPristine();
        this._notificationService.showSnackbar('Success', 'Data saved successfully');
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
