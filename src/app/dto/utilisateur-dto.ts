import { AdresseDto } from "./adresse-dto";
import { EntrepriseDto } from "./entreprise-dto";
import { RoleDto } from "./role-dto";

export interface UtilisateurDto {

       id?: number,
       creationDate?: number,
       lastModifiedDate?: number,
       nom?: string,
       prenom?: string,
       email?: string,
       mdp?: string,
       numTel?: string,
       dateDeNaissance?: Date,
       adresse?: AdresseDto,
       idEntreprise?: number,
       entreprise?: EntrepriseDto,
       photo?: string,
       role?: Array<RoleDto>

  }
