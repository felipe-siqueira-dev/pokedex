import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resultado } from '../../interfaces/pokeapi';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-item-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-pokemon.component.html',
  styleUrl: './item-pokemon.component.scss'
})

export class ItemPokemonComponent implements OnChanges {
  
  constructor(private pokemonService: PokemonService){}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.extrairInformacao();
  }

  @Input() data?:Resultado;
  @Input() selecionado:boolean = false;
  @Input() fullData?:Pokemon;
  @Output() clicado = new EventEmitter<string>();
  id:string = "0";

    extrairInformacao(){
      if(this.data && this.data.url !== ""){
        this.id = this.data.url.substring(34,this.data.url.length - 1);
        return;
      }
      if(this.fullData){
        this.id = this.fullData.species.url.substring(42,this.fullData.species.url.length - 1);
        this.data = {
          name: this.fullData.species.name,
          url:""
        }
      }
    }

}
