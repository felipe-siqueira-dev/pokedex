import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemPokemonComponent } from '../item-pokemon/item-pokemon.component';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detalhe-pokemon',
  standalone: true,
  imports: [CommonModule,ItemPokemonComponent],
  templateUrl: './detalhe-pokemon.component.html',
  styleUrl: './detalhe-pokemon.component.scss'
})
export class DetalhePokemonComponent implements OnChanges{
  @Input() pokemon?:Pokemon;
  @Input() aberto:boolean = false;
  @Output() clicked = new EventEmitter();
  descricao:string = "";
  
  constructor(private pokemonService:PokemonService){}
  ngOnChanges(): void {
    if(this.pokemon){
      this.pokemonService.getDescription(this.pokemon?.id).then(res =>{
        this.descricao = res;
      })
    }
  }

}
