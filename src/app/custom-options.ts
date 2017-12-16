import {ToastOptions} from 'ng2-toastr';

// objeto de configuraçao do componente de notificaçoes
export class CustomOption extends ToastOptions {
  animate = 'fade';
  showCloseButton = true;
  dismiss = 'auto';
  positionClass = 'toast-bottom-full-width';
  maxShown = 3;
  toastLife = 3000;
}
