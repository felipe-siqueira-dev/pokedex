import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoPokemonComponent } from "../../components/foto-pokemon/foto-pokemon.component";
import { ItemPokemonComponent } from "../../components/item-pokemon/item-pokemon.component";
import { PokemonService } from '../../services/pokemon.service';
import { Resultado } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';
import { DetalhePokemonComponent } from '../../components/detalhe-pokemon/detalhe-pokemon.component';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, FotoPokemonComponent, ItemPokemonComponent,DetalhePokemonComponent]
})
export class HomeComponent implements OnInit{

    constructor (private pokemonService: PokemonService){}
    @ViewChild('itens') itensElement!:ElementRef;

    listaPokemon:Resultado[] = [];

    pagina:number = 1;
    carregando:boolean = false;
    pokemonSelecionado?:Pokemon;
    detalhe:boolean = false;

    ngOnInit(): void {
        this.carregarLista();
        this.pokemonService.getById("1");
    }

    async carregarLista(){
        this.carregando = true;
        this.listaPokemon =  [...this.listaPokemon, ...await this.pokemonService.getByPage(this.pagina)];
        console.log(this.listaPokemon);
        this.carregando = false;
        this.pagina++;
    }

    onScroll(e:any){
        if(this.carregando) return;
        if(Math.round(this.itensElement.nativeElement.clientHeight + this.itensElement.nativeElement.scrollTop)=== e.srcElement.scrollHeight){
            this.carregarLista();
        }
    }

    async itemClicado(id:string){
        this.pokemonSelecionado = await this.pokemonService.getById(id);
    }

    mudarEstadoDetalhe(){
        if(this.pokemonSelecionado) this.detalhe = !this.detalhe;
    }
}
