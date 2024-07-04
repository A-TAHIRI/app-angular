import { Adresse } from './adresse';
import { Entreprise } from './entreprise';
import { Role } from './role';

export interface Utilisateur {

    id?: number,
     creationDate?: number,
    lastModifiedDate?: number,
     nom?: string,
     prenom?: string,
     email?: string,
     mdp?: string,
     numTel?: string,
     adresse?: Adresse,
   dateDeNaissance?: Date,
    idEntreprise?: number,
     entreprise?: Entreprise,
     photo?: string,
     role?: Array<Role>

}
