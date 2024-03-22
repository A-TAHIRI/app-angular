import { Adresse } from './adresse';
import { Entreprise } from './entreprise';
import { Role } from './role';

export class Utilisateur {
  constructor(
    public id?: number,
    public creationDate?: number,
    public lastModifiedDate?: number,
    public nom?: string,
    public prenom?: string,
    public email?: string,
    public mdp?: string,
    public numTel?: string,
    public adresse?: Adresse,
    public dateDeNaissance?: Date,
    public idEntreprise?: number,
    public entreprise?: Entreprise,
    public photo?: string,
    public role?: Array<Role>
  ) {}
}
