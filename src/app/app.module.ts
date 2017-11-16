import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatSliderModule } from '@angular/material';
import { AppComponent } from './app.component';
import {
  MqttModule,
  MqttService
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS = {
  connectOnCreate: true,
  hostname: 'iot.eclipse.org',
  port: 80,
  path: '/ws'
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
