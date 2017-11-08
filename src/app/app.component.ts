import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  MqttMessage,
  MqttModule,
  MqttService
} from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public myOtherMessage$: Observable<MqttMessage>;
  public message;
  
    constructor(private mqtt: MqttService) {
      mqtt.observe('/vejron79/lamp').subscribe((message: MqttMessage) => {
        this.message = message.payload.toString();
        console.log('wtf');
      });
      //this.myOtherMessage$ = this.mqtt.observe('my/other/topic');
    }

    ngOnInit() {
      this.mqtt.onConnect.subscribe((e) => console.log('onConnect', e));
      this.mqtt.onError.subscribe((e) => console.log('onError', e));
      this.mqtt.onClose.subscribe(() => console.log('onClose'));
      this.mqtt.onReconnect.subscribe(() => console.log('onReconnect'));
      this.mqtt.onMessage.subscribe((e) => console.log('onMessage', e));
    }
  
    public emit(msg: any): void {
      try {
        this.mqtt.unsafePublish('/vejron79/lamp', JSON.stringify({msg}), {qos: 0, retain: false}); 
      } catch (error) {
        console.warn(error);
      }
    }
  }  