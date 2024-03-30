import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/general/home/home.component';
import { ContactComponent } from './pages/general/contact/contact.component';
import { AboutComponent } from './pages/general/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {DetailComponent} from "./components/detail/detail.component";
import {LoginComponent} from "./pages/login/login.component";
import {InscriptionComponent} from "./pages/inscription/inscription.component";
import {StatistiquesComponent} from "./pages/statistiques/statistiques.component";
import {ArticleComponent} from "./pages/article/article.component";
import {NouvelArticleComponent} from "./pages/article/nouvel-article/nouvel-article.component";
import {MvtstkComponent} from "./pages/mvtstk/mvtstk.component";
import {ClientComponent} from "./pages/client/client.component";
import {NouveauCltFrsComponent} from "./components/nouveau-clt-frs/nouveau-clt-frs.component";
import {CmdCltFrsComponent} from "./pages/cmd-clt-frs/cmd-clt-frs.component";
import {ApplicationGuardService} from "./services/guard/application-guard.service";
import {NouvelleCmdCltFrsComponent} from "./components/nouvelle-cmd-clt-frs/nouvelle-cmd-clt-frs.component";
import {FournisseurComponent} from "./pages/fournisseur/fournisseur.component";
import {CategoriesComponent} from "./pages/categories/categories.component";
import {NouvelleCategoryComponent} from "./pages/categories/nouvelle-category/nouvelle-category.component";
import {UtilisateurComponent} from "./pages/utilisateur/utilisateur.component";
import {NouvelUtilisateurComponent} from "./pages/utilisateur/nouvel-utilisateur/nouvel-utilisateur.component";
import {ProfilComponent} from "./pages/profil/profil.component";
import {ChangerMotDePasseComponent} from "./pages/profil/changer-mot-de-passe/changer-mot-de-passe.component";
import {NotFoundComponent} from "./pages/general/not-found/not-found.component";
import {ServiceComponent} from "./pages/general/service/service.component";
import {ServiceDetailComponent} from "./pages/general/service/service-detail/service-detail.component";
import {CaracteridtiqueDetailsComponent} from "./components/caracteridtique-details/caracteridtique-details.component";
import {RGPDComponent} from "./pages/general/rgpd/rgpd.component";
import {CGUComponent} from "./pages/general/cgu/cgu.component";
import {MotPasseOublieComponent} from "./pages/profil/mot-passe-oublie/mot-passe-oublie.component";


const routes: Routes = [
{path:'',component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inscrire', component: InscriptionComponent},
{path:'contact',component:ContactComponent},
{path:'about',component:AboutComponent},
  {path:'rgpd', component:RGPDComponent},
  {path:'cgu', component:CGUComponent},
  {path:'mot-passe-oublie', component : MotPasseOublieComponent},
  {path:'services',component:ServiceComponent},
  {path:'service-details/:idService',component:ServiceDetailComponent,
  children:[
    {path: 'caracteristique/:idCaracteristique' ,component: CaracteridtiqueDetailsComponent},

  ]
  },

{path:'dashboard',component:DashboardComponent,
  canActivate: [ApplicationGuardService],
children:[
  {path:'', component:DetailComponent},
  {path: 'statistiques', component: StatistiquesComponent,
    canActivate: [ApplicationGuardService]},
  {path: 'articles', component: ArticleComponent,
    canActivate: [ApplicationGuardService]},
  {path: 'nouvelarticle', component: NouvelArticleComponent,
    canActivate: [ApplicationGuardService]},
  {path: 'nouvelarticle/:idArticle', component: NouvelArticleComponent,
    canActivate: [ApplicationGuardService]},
  {path: 'mvtstk', component: MvtstkComponent,
    canActivate: [ApplicationGuardService]},
  {path:'clients', component: ClientComponent,
    canActivate: [ApplicationGuardService]},
  {path: 'nouveauclient', component: NouveauCltFrsComponent,
    canActivate: [ApplicationGuardService],
    data: {
      origin: 'client'
    }},
  {path: 'nouveauclient/:id', component: NouveauCltFrsComponent,
    canActivate: [ApplicationGuardService],
    data: {
      origin: 'client'
    }},
  {path: 'commandesclient', component: CmdCltFrsComponent,
    canActivate: [ApplicationGuardService],
    data: {
      origin: 'client'
    }},
  {path: 'nouvellecommandeclt', component: NouvelleCmdCltFrsComponent,
    canActivate: [ApplicationGuardService],
    data: {
      origin: 'client'
    }},
  {path:'fournisseurs', component: FournisseurComponent},
  {path:'commandesfournisseur', component: CmdCltFrsComponent ,
    canActivate: [ApplicationGuardService],
    data: {
      origin: 'fournisseur'
    }},
  {path: 'nouveaufournisseur', component: NouveauCltFrsComponent,
    canActivate: [ApplicationGuardService],
    data: {
      origin: 'fournisseur'
    }},
  {path: 'nouveaufournisseur/:id', component: NouveauCltFrsComponent,
    canActivate: [ApplicationGuardService],
    data: {
      origin: 'fournisseur'
    }},
  {path: 'nouvellecommandefrs', component: NouvelleCmdCltFrsComponent,
    canActivate: [ApplicationGuardService],
    data: {
      origin: 'fournisseur'
    }},
  {path:'categories', component: CategoriesComponent,
    canActivate: [ApplicationGuardService],

  },
  {path:'nouvellecategorie', component: NouvelleCategoryComponent,
    canActivate: [ApplicationGuardService]},

  {path:'nouvellecategorie/:idCategorie', component: NouvelleCategoryComponent,
    canActivate: [ApplicationGuardService]},

  {path:'utilisateurs', component: UtilisateurComponent,
    canActivate: [ApplicationGuardService]},

  {path:'nouvelutilisateur', component: NouvelUtilisateurComponent,
    canActivate: [ApplicationGuardService]
  },
  {path:'nouvelutilisateur/:idUtilisateur', component: NouvelUtilisateurComponent,
    canActivate: [ApplicationGuardService]
  },

  {path:'profil', component: ProfilComponent,
    canActivate: [ApplicationGuardService]
  },
]
},
  {path:'changermotdepasse' , component: ChangerMotDePasseComponent,
    canActivate: [ApplicationGuardService]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
