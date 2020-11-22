export class BarMessagesLibrary {
  static loaded:boolean = false;
  constructor() {
  }

  static makeBar(): void {
    let container:HTMLDivElement = document.createElement('div');
    container.id ='message-float';
    container.className = 'mat-snack-bar-container hide ';

    const element: Element | null = document.querySelector('body');
    if (element !== null) {
      element.appendChild(container);
      this.loaded = true;
    }
  }

  static addMessage(message:string, messageclass:string):void{
    if(!this.loaded)
      this.makeBar();

    let bar:object= document.getElementById('message-float');
    bar['innerHTML']=message;
    bar['className'] = 'mat-snack-bar-container show '+messageclass;
    console.log('listo');
  }

  static closeMessage():void | null{
    if(!this.loaded)
      return;
    let bar:object= document.getElementById('message-float');
    bar['className'] = 'mat-snack-bar-container hide ';
  }


}
