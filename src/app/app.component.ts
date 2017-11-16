import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class AppComponent implements OnInit {
  myOtherMessage$: Observable<MqttMessage>;
  message;
  lamp = new Lamp();
  position;

  constructor(private mqtt: MqttService) {
    mqtt.observe('/vejron79/lamp').subscribe((message: MqttMessage) => {
      this.message = message.payload.toString();
      console.log('wtf');
    });
  }

  ngOnInit() {
    this.mqtt.onConnect.subscribe((e) => console.log('onConnect', e));
    this.mqtt.onError.subscribe((e) => console.log('onError', e));
    this.mqtt.onClose.subscribe(() => console.log('onClose'));
    this.mqtt.onReconnect.subscribe(() => console.log('onReconnect'));
    this.mqtt.onMessage.subscribe((e) => console.log('onMessage', e));
  }

  emit(lamp: Lamp): void {
    try {
      this.mqtt.unsafePublish('/vejron79/lamp', JSON.stringify(lamp), { qos: 0, retain: false });
    } catch (error) {
      console.warn(error);
    }
  }
}  

class Lamp {

  constructor(
    public red: number = 100,
    public green: number = 100,
    public blue: number = 100,
    public position: number = 0
  ) {

  }

  off() {
    this.red = this.blue = this.green = this.position = 0;
  }
}