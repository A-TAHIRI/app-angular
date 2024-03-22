export interface Menu {
    id?: string;
    titre?: string;
    souTitre?:string
    icon?: string;
    url?: any;
    active?: boolean;
    sousMenu?: Array<Menu>;
  }
