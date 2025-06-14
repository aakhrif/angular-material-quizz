import { Component, Input } from '@angular/core';
import { TECH_ICONS } from '../shared/models/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-icon',
  imports: [CommonModule],
  templateUrl: './tech-icon.html',
  styleUrl: './tech-icon.scss'
})
export class TechIcon {
  @Input({ required: true }) type!: string;
  

  ngOnInit(): void {
    console.log('type ', this.type)
  }

  get iconPath(): string | null {
    return TECH_ICONS[this.type] ?? null;
  }
}
