import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-foto-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foto-pokemon.component.html',
  styleUrl: './foto-pokemon.component.scss'
})

export class FotoPokemonComponent {
  @Input() pokemon?:Pokemon;
}
