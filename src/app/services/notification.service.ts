import { inject, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private _messageService = inject(MessageService);

   /**
   * Updates projects presets.
   * @param type Success, Info, Warn, Error.
   * @param message Short Message which will appear on screen.
   */
    public showSnackbar(type: string, message: string): void {
        this._messageService.add({severity: type.toLocaleLowerCase(), summary: type, detail: message});
    }
}