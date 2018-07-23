import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteComponent } from './site/site.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChappComponent } from './chapp/chapp.component';
import { ChannelsComponent } from './channels/channels.component';
import { SubChannelsComponent } from './sub-channels/sub-channels.component';
import { TheBizComponent } from './the-biz/the-biz.component';
import { ProfileComponent } from './profile/profile.component';
import { ChannelUsersComponent } from './channel-users/channel-users.component';
import { MessageFieldComponent } from './message-field/message-field.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    SplashPageComponent,
    LoginComponent,
    RegistrationComponent,
    ChappComponent,
    ChannelsComponent,
    SubChannelsComponent,
    TheBizComponent,
    ProfileComponent,
    ChannelUsersComponent,
    MessageFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
