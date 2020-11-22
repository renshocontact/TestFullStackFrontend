import { Injectable } from '@angular/core';
import { IntervalLibrary } from './interval.library';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HeaderLibrary {
  private progress:any={
    disable:true,
    class:"progress-bar",
    color:"",
    mode:"",
    value:"0",
    bufferValue:""
  };
  private display:boolean = true;
  private currentTitle:string='';
  private currentRawTitle:string='';
  private interval:IntervalLibrary;

  constructor(public translate:TranslateService) {
    this.interval = new IntervalLibrary();
  }

  public setTitle(title:string, params:object={}):void{
    this.currentRawTitle = title;
    this.translate.get(title, params).subscribe(
      title => {
        this.currentTitle = title;
      }
    );
  }

  public canDisplay():boolean{
    return this.display;
  }

  public setDisplay(display:boolean):void{
    this.display = display;
  }

  public getRawTitle():string{
    return this.currentRawTitle;
  }

  public getTitle():string{
    return this.currentTitle;
  }

  public setForceDisableProgress():void {
    this.interval.cancelDelay();
    this.progress.value = 0;
    this.progress.disable = true;
  }

  public setDisableProgress(disable:boolean):void {
    this.progress.disable = disable;
  }

  public getDisableProgress():boolean {
    return this.progress.disable;
  }

  public setClassProgress(classValue:string):void {
    this.progress.class = classValue;
  }

  public getClassProgress():String {
    return this.progress.class;
  }

  public setColorProgress(color:string):void {
    this.progress.color = color;
  }

  public getColorProgress():String {
    return this.progress.color;
  }

  public setModeProgress(mode:string):void {
    this.progress.mode = mode;
  }

  public getModeProgress():String {
    return this.progress.mode;
  }

  public setValueProgress(value:string):void {
    if(parseInt(value)>0){
      this.interval.cancelDelay();
      this.setDisableProgress(false);
    }
    this.progress.value = value;

    if(parseInt(value)==100){
      this.interval.delay({
        duration:450,
        function:this.setForceDisableProgress.bind(this)
      });
    }
  }

  public geValueProgress():String {
    return this.progress.value;
  }

  public setBufferValueProgress(bufferValue:string):void {
    this.progress.bufferValue = bufferValue;
  }

  public geBufferValueProgress():String {
    return this.progress.bufferValue;
  }
}
