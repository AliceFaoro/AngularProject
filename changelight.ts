import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appChangeLight]',
    standalone: true
})

export class ChangeLight {

    /*ElementRef: Fornisce l'accesso diretto all'elemento DOM su cui è applicata la direttiva. elem.nativeElement rappresenta l'elemento HTML.
    Renderer2: Usato per modificare lo stile o altre proprietà dell'elemento in modo sicuro (evitando manipolazioni dirette del DOM, che potrebbero creare problemi in ambienti server-side come Angular Universal).*/
    constructor(private elem: ElementRef, private rend: Renderer2) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.setBackLight('green', 'white');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setBackLight('', ''); // reset to default
    }

    private setBackLight(color: string, color2: string) {
        this.rend.setStyle(this.elem.nativeElement, 'background-color', color); //elem.nativeElement rappresenta l'elemento HTML.
        this.rend.setStyle(this.elem.nativeElement, 'color', color2);
    }
}

/* Vantaggi dell'approccio:
Astrazione: La direttiva isola la logica di manipolazione degli stili, mantenendo il codice HTML pulito.
Riutilizzabilità: Può essere applicata a qualsiasi elemento HTML. */