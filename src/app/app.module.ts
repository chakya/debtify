import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from './../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DebtCalcPage } from '../pages/debt-calc/debt-calc';
import { DebtListPage } from '../pages/debt-list/debt-list';

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AuthProvider } from '../providers/auth/auth';
import { UtilsProvider } from '../providers/utils/utils';
import { DebtProvider } from '../providers/debt/debt';
import { LendProvider } from '../providers/lend/lend';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    DebtCalcPage,
    DebtListPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    DebtCalcPage,
    DebtListPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UtilsProvider,
    DebtProvider,
    LendProvider
  ]
})
export class AppModule {}
