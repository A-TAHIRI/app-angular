import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MesServicesService {


  constructor( ) { }
 datas() {
    return  this.data;
 }

   data=
    [

      {
        "id" : "1",
        "titre":"Gestion de Stock Centralisée",
        "image":"assets/img/img/centraliser.jpg",
        "dely":"100",
        "miniDescription":

          "GestoStock centralise la gestion du stock, offre une vision globale de l'inventaire, suit les mouvements, ajuste les niveaux et planifie les réapprovisionnements.",
        "description":"GestoStock vous permet de centraliser la gestion de votre stock en un seul endroit, vous offrant une visibilité complète sur l'ensemble de votre inventaire, quel que soit l'endroit où il est stocké. Vous pouvez suivre les mouvements de stock, gérer les niveaux de stock et optimiser les réapprovisionnements avec facilité."

      },
      {
        "id":"2",
        "titre":"Suivi des Produits",
        "image":"assets/img/img/suivi.png",
        "dely":"200",
        "miniDescription":
          "GestoStock surveille chaque article avec précision, enregistre les données essentielles pour une gestion complète des stocks.",
        "description":"Avec GestoStock, vous pouvez suivre chaque produit de votre inventaire de manière précise. Vous pouvez enregistrer les détails des produits, y compris les informations sur les fournisseurs, les codes-barres, les descriptions et les prix, ce qui vous permet de garder une trace de chaque article et de faciliter la gestion des stocks."

      },
      {
        "id":"3",
        "titre":"Gestion des Commandes et des Livraisons",
        "image":"assets/img/img/commande.png",
        "dely":"300",
        "miniDescription":
          "GestoStock simplifie la gestion des commandes et des livraisons, optimise les processus et assure la satisfaction client.",
        "description":"Simplifiez le processus de gestion des commandes et des livraisons avec GestoStock. Vous pouvez suivre les commandes clients, gérer les retours, générer des bons de livraison et optimiser les processus de réception des marchandises, vous aidant ainsi à maintenir un flux de travail efficace et à satisfaire les demandes des clients."

      },
      {
        "id":"4",
        "titre":"Rapports et Analyses",
        "image":"assets/img/img/analytics-vs-reporting.jpg",
        "dely":"400",
        "miniDescription":
          "GestoStock propose des outils d'analyse avancés pour optimiser vos stocks et prendre des décisions éclairées.",
        "description":"GestoStock offre des fonctionnalités de génération de rapports et d'analyses avancées qui vous permettent d'obtenir des informations précieuses sur les performances de votre inventaire. Vous pouvez générer des rapports sur les niveaux de stock, les mouvements de stock, les tendances de vente, les prévisions de réapprovisionnement, etc., pour prendre des décisions éclairées et optimiser votre gestion des stocks."

      },
      {
        "id":"5",
        "titre":"Gestion des Employés",
        "image":"assets/img/img/personnes-dans-la-main_1.jpg",
        "dely":"500",
        "miniDescription":
          "GestoStock assure une gestion efficace des employés, optimisant ainsi la productivité et favorisant une communication transparente au sein de votre entreprise.",
        "description":"GestoStock propose un service complet de gestion des employés de l'entreprise, vous permettant de gérer facilement tous les aspects liés à vos ressources humaines. Vous pouvez créer et gérer les profils des employés, suivre les informations personnelles, les rôles et les autorisations, ainsi que gérer les horaires de travail et les congés. De plus, vous pouvez générer des rapports sur la présence, les performances et les données relatives aux ressources humaines pour une gestion efficace de votre personnel. Ce service vous aide à optimiser la planification des effectifs, à améliorer la productivité et à garantir une communication transparente au sein de votre entreprise."

      },
      {
        "id":"6",
        "titre":"Notifications et Alertes",
        "image":"assets/img/img/alert.png",
        "dely":"600",
        "miniDescription":
          "GestoStock vous informe en temps réel pour une gestion proactive des stocks, vous permettant de réagir rapidement et d'anticiper les problèmes potentiels.",
        "description":"Restez informé en tout temps grâce aux notifications et alertes de GestoStock. Recevez des notifications sur les niveaux de stock bas, les commandes en attente, les livraisons en retard, etc., vous permettant de réagir rapidement aux changements et de prévenir les problèmes potentiels avant qu'ils ne surviennent."

      }

    ]




}
