import { Injectable } from '@angular/core';

@Injectable()
export class User {
    public IDutente: number;
    public NomePG: string;
    public CognomePG: string;
    public IDprofessione: number;
    public nomeprofessione: string; //from LEFT JOIN
    public desc: string; //from LEFT JOIN
    public IDspecial :number; 
    public nomespecial: string; //from LEFT JOIN
    public bonus: string; //from LEFT JOIN
    public Miti: number;
    public Sanita: number;
    public PF: number;
    public URLimg: string;
    public registrationID: string; //non usato
    public IDbp: number;
    public descbp: string; //from LEFT JOIN
    public gg: number;
    public mm: number;
    public aaaa: number;
    public xspecpg: number;
    public IDspecialx: number ;  //uguale xspecpg
    public xbonus: string;

    constructor (){
        this.IDutente = 0;
        this.NomePG = '';
        this.CognomePG = '';
        this.IDprofessione = 0;
        this.nomeprofessione = ''; //from LEFT JOIN
        this.desc = ''; //from LEFT JOIN
        this.IDspecial = 0; 
        this.nomespecial = ''; //from LEFT JOIN
        this.bonus = ''; //from LEFT JOIN
        this.Miti = 0;
        this.Sanita = 10;
        this.PF = 3;
        this.URLimg = "assets/imgs/nopicture.gif";
        this.registrationID = ''; //non usato
        this.IDbp = 0;
        this.descbp = ''; //from LEFT JOIN
        this.gg = 1;
        this.mm = 1;
        this.aaaa = 1970;
        this.xspecpg  = 0;
        this.IDspecialx = 0 ;  //uguale xspecpg
        this.xbonus = '';
    }
}

@Injectable()
export class Oggetto {
  public id = '';
}

@Injectable()
export class Status {
    magie = false;
    generico = false;
}


export class DescOggetto {
    public nome = ''; 
    public descrizione = ''; // base
    public descrizione1 = '';  // PROFESSIONE
    public descrizione2 = ''; //SPECIAL
    public descrizione3 = ''; //IDBP
    public descrizione4 = ''; //PAIRED
    public deltasan = 0 ;
    public deltamiti = 0;
    public deltapf = 0;
    public newsan = 0 ;
    public newmiti = 0;
    public newpf = 0;

    public domanda = '';
    public r1 = '';
    public r2 = '';
    public rispsan = 0;
    public rispmiti = 0;
    public risppf = 0;

    public richiesta = '';
    public password = '';
    public passwdok = '';
  }
  
  export class Scan  {
    public IDoggetto = '';
    public datascan = '';
    public scan = '';  //identificativo barcode
    public nome = ''; 
    public descrizione = ''; // base
  }

  export class Messaggio  {
    public data = '';
    public testo = ''; // base
    public url = '';
  }