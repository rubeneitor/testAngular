import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, RouterModule, TranslateModule, TranslatePipe],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
    sidebarVisible = true;
    isMobile = false;

    constructor(private translate: TranslateService){
        this.translate.setDefaultLang('es')
    }

    ngOnInit() {
        if (typeof window !== 'undefined') { 
            this.checkScreenSize();
            window.addEventListener('resize', () => this.checkScreenSize());
        }
    }

    // Evento para notificar al padre (app.component)
    @Output() sidebarToggled = new EventEmitter<boolean>();


    checkScreenSize() {
        this.isMobile = window.innerWidth < 768; 
    }

    hideSidebar() {
        if (this.isMobile) {
            this.sidebarVisible = false;
        }
        this.sidebarToggled.emit(this.sidebarVisible);
    }

    hiderSidebarButton() {
        this.sidebarVisible = false;
        this.sidebarToggled.emit(this.sidebarVisible);
    }

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
        this.sidebarToggled.emit(this.sidebarVisible);
    }

}
