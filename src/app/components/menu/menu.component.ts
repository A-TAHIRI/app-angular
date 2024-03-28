import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Menu} from "./menu";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit{

  constructor( private router: Router) {
  }
  ngOnInit(): void {
  }

  public menuProperties: Array<Menu> = [
    {
      id: '1',
      titre: 'Dashboard',
      icon: 'bi bi-grid',
      souTitre:'dashboard-nav',
      url: '',
      sousMenu: [
        {
          id: '11',
          titre: 'Vue D\'ensemble',
          icon: 'bi bi-chart-pie',
          url: '',
        },
        {
          id: '12',
          titre: 'Statistiques',
          icon: 'bi bi-chart-bar',
          url: 'statistiques'
        }
      ]
    },
    {
      id: '2',
      titre: 'Articles',
      souTitre:'article-nav',
      icon: 'bi bi-boxes',
      url: '',
      sousMenu: [
        {
          id: '21',
          titre: 'Articles',
          icon: 'bi bi-boxes',
          url: 'articles'
        },
        {
          id: '22',
          titre: 'Mouvements Du Stock',
          icon: 'bi bi-stack-overflow',
          url: 'mvtstk'
        }
      ]
    },
    {
      id: '3',
      titre: 'Clients',
      souTitre:'client-nav',
      icon: 'bi bi-people',
      url: '',
      sousMenu: [
        {
          id: '31',
          titre: 'Clients',
          icon: 'bi bi-people',
          url: 'clients'
        },
        {
          id: '32',
          titre: 'Commandes clients',
          icon: 'bi bi-shopping-basket',
          url: 'commandesclient'
        }
      ]
    },
    {
      id: '4',
      titre: 'Fournisseurs',
      souTitre:'fournisseur-nav',
      icon: 'bi bi-truck',
      url: '',
      sousMenu: [
        {
          id: '41',
          titre: 'Fournisseurs',
          icon: 'bi bi-cercle',
          url: 'fournisseurs'
        },
        {
          id: '42',
          titre: 'Commandes fournisseurs',
          icon: 'bi bi-cercle',
          url: 'commandesfournisseur'
        }
      ]
    },
    {
      id: '5',
      titre: 'Parametrages',
      souTitre:'parametre-nav',
      icon: 'bi bi-gear',
      url: '',
      sousMenu: [
        {
          id: '51',
          titre: 'Categories',
          icon: 'bi bi-tools',
          url: 'categories'
        },
        {
          id: '52',
          titre: 'Utilisateurs',
          icon: 'bi bi-people-cog',
          url: 'utilisateurs'
        }
      ]
    }
  ];




  navigate(url : string): void {

    this.router.navigate([url]);
  }

  sidebarLinks = [
    {
      label: 'Dashboard',  icon: 'bi bi-grid',   collapse: 'dashboard',  expanded: true,

      children: [
        { label: "Vue D'ensemble", route: '/dashboard' },
        { label: 'Statistiques', route: '/dashboard/statistiques' },
      ]

    },
    {
      label: 'Articles', icon: 'bi bi-boxes', collapse: 'articles', expanded: true,
      children: [
        { label: 'Articles', route: '/dashboard/articles' },
        { label: 'Mouvements Du Stock', route: '/dashboard/mvtstk' },
      ]
    },
    {
      label: 'Clients', icon: 'bi bi-people', collapse: 'clients', expanded: true,
      children: [
        { label: 'Clients', route: '/dashboard/clients' },
        { label: 'Commandes clients', route: '/dashboard/commandesclient' },
      ]
    },
    {
      label: 'Fournisseurs', icon: 'bi bi-truck', collapse: 'fournisseur', expanded: true,
      children: [
        { label: 'Fournisseurs', route: '/dashboard/fournisseurs' },
        { label: 'Commandes fournisseurs', route: '/dashboard/commandesfournisseur' },
      ]
    },
    {
      label: 'Parametrages', icon: 'bi bi-gear', collapse: 'parametrages', expanded: true,
      children: [
        { label: 'Categories', route: '/dashboard/categories' },
        { label: 'Utilisateurs', route: '/dashboard/utilisateurs' },
      ]
    }
  ];

}
