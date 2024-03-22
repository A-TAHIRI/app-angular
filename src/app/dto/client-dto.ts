import { AdresseDto } from './adresse-dto';
import { CommandeClientDto } from './commande-client-dto';

export interface ClientDto {

     id?: number,
     creationDate?: number,
     lastModifiedDate?: number,
     nom?: string,
     prenom?: string,
     adresse?: AdresseDto,
     photo?: string,
     email?: string,
     numTel?: string,
     idEntreprise?: number,
     commandeClients?: Array<CommandeClientDto>

}
