import {ClientDto} from './client-dto';
import {LigneCommandeClientDto} from './ligne-commande-client-dto';

export interface CommandeClientDto {

  id?: number,
  creationDate?: number,
  lastModifiedDate?: number,
  reference?: string,
  dateCommande?: number,
  etatCommande?: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE',
  idEntreprise?: number,
  client?: ClientDto,
  ligneCommandeClients?: Array<LigneCommandeClientDto>

}
