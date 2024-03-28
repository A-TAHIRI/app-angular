import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/general/home/home.component';
import { ContactComponent } from './pages/general/contact/contact.component';
import { AboutComponent } from './pages/general/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailComponent } from './components/detail/detail.component';
import {HttpInterceptorService} from "./services/interceptor/http-interceptor.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import * as fr from '@angular/common/locales/fr'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {NouvelUtilisateurComponent} from "./pages/utilisateur/nouvel-utilisateur/nouvel-utilisateur.component";
import {NouvelleCategoryComponent} from "./pages/categories/nouvelle-category/nouvelle-category.component";
import {CategoriesComponent} from "./pages/categories/categories.component";
import {NouveauCltFrsComponent} from "./components/nouveau-clt-frs/nouveau-clt-frs.component";
import {NouvelleCmdCltFrsComponent} from "./components/nouvelle-cmd-clt-frs/nouvelle-cmd-clt-frs.component";
import {DetailCmdCltFrsComponent} from "./components/detail-cmd-clt-frs/detail-cmd-clt-frs.component";
import {DetailCmdComponent} from "./components/detail-cmd/detail-cmd.component";
import {DetailUtilisateurComponent} from "./components/detail-utilisateur/detail-utilisateur.component";
import {CmdCltFrsComponent} from "./pages/cmd-clt-frs/cmd-clt-frs.component";
import {UtilisateurComponent} from "./pages/utilisateur/utilisateur.component";
import {ProfilComponent} from "./pages/profil/profil.component";
import {FournisseurComponent} from "./pages/fournisseur/fournisseur.component";
import {ClientComponent} from "./pages/client/client.component";
import {DetailCltFrsComponent} from "./components/detail-clt-frs/detail-clt-frs.component";
import {DetailMvtStkComponent} from "./components/detail-mvt-stk/detail-mvt-stk.component";
import {DetailMvtStkArticleComponent} from "./components/detail-mvt-stk-article/detail-mvt-stk-article.component";
import {NouvelArticleComponent} from "./pages/article/nouvel-article/nouvel-article.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {BouttonActionComponent} from "./components/boutton-action/boutton-action.component";
import {DetailArticleComponent} from "./components/detail-article/detail-article.component";
import {ArticleComponent} from "./pages/article/article.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {StatistiquesComponent} from "./pages/statistiques/statistiques.component";
import {InscriptionComponent} from "./pages/inscription/inscription.component";
import {LoginComponent} from "./pages/login/login.component";
import {NotFoundComponent} from "./pages/general/not-found/not-found.component";
import {MvtstkComponent} from "./pages/mvtstk/mvtstk.component";
import {ChangerMotDePasseComponent} from "./pages/profil/changer-mot-de-passe/changer-mot-de-passe.component";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import {ServiceComponent} from "./pages/general/service/service.component";
import { ServiceDetailComponent } from './pages/general/service/service-detail/service-detail.component';
import { CaracteridtiqueDetailsComponent } from './components/caracteridtique-details/caracteridtique-details.component';

import { RGPDComponent } from './pages/general/rgpd/rgpd.component';
import { CGUComponent } from './pages/general/cgu/cgu.component';
import { MotPasseOublieComponent } from './pages/profil/mot-passe-oublie/mot-passe-oublie.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    DetailComponent,
    NotFoundComponent,
    AboutComponent,
    LoginComponent,
    InscriptionComponent,
    DashboardComponent,
    StatistiquesComponent,
    MenuComponent,
    MvtstkComponent,
    LoaderComponent,
    HeaderComponent,
    ArticleComponent,
    DetailArticleComponent,
    BouttonActionComponent,
    PaginationComponent,
    NouvelArticleComponent,
    DetailMvtStkArticleComponent,
    DetailMvtStkComponent,
    DetailCltFrsComponent,
    ClientComponent,
    FournisseurComponent,
    ProfilComponent,
    UtilisateurComponent,
    CmdCltFrsComponent,
    DetailUtilisateurComponent,
    DetailCmdComponent,
    DetailCmdCltFrsComponent,
    NouvelleCmdCltFrsComponent,
    NouveauCltFrsComponent,
    CategoriesComponent,
    NouvelleCategoryComponent,
    NouvelUtilisateurComponent,
    ChangerMotDePasseComponent,
    FooterComponent,
    HeaderHomeComponent,
    ServiceComponent,
    ServiceDetailComponent,
    CaracteridtiqueDetailsComponent,
    RGPDComponent,
    CGUComponent,
    MotPasseOublieComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,


  ],
  providers: [
     {provide: LOCALE_ID, useValue: 'fr_FR'},
    {provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default)
  }
}
