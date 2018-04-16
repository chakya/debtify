import { DebtListPage } from './../pages/debt-list/debt-list';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DebtCalcPage } from '../pages/debt-calc/debt-calc';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private auth: AuthProvider) {
    
    const authObserver = auth.currentUserObservable().subscribe(user => {
      this.rootPage = user && user.emailVerified ? DebtCalcPage : LoginPage;
      authObserver.unsubscribe();
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: DebtListPage },
      { title: 'Log Out', component: LoginPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == LoginPage) {
      this.auth.logoutUser().then(() => this.nav.setRoot(page.component));
    } else {
      this.nav.setRoot(page.component);
    }
  }

}
