import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { IconsService } from 'app/zdslogic-ui-shell/modules/admin/ui/icons/icons.service';
import { Icon } from 'app/zdslogic-ui-shell/modules/admin/ui/icons/icons.types';

@Component({
    selector     : 'icons',
    templateUrl  : './icons.component.html',
    encapsulation: ViewEncapsulation.None
})
export class IconsComponent implements OnInit, OnDestroy
{
    icons$: Observable<Icon>;
    filteredIcons$: Observable<Icon>;
    filterValue$: BehaviorSubject<string> = new BehaviorSubject('');

    iconSize: string = 'icon-size-8';
    selectedIcon: string[];
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * Constructor
     */
    constructor(private _iconsService: IconsService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the icons
        this.icons$ = this._iconsService.icons;

        // Subscribe to icons
        this._iconsService.icons
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((icons): any {

                // Set the icon size in case the icon set
                // has a special base grid size
                this.iconSize = icons.grid;

                // Select the first icon
                this.selectedIcon = [icons.namespace, icons.list[0]];
            });

        // Create filtered icons
        this.filteredIcons$ = combineLatest([this.icons$, this.filterValue$])
            .pipe(
                map(([icons, filterValue]): any {

                    // Filter the icons
                    const filteredIcons = icons.list.filter(icon => icon.toLowerCase().includes(filterValue.toLowerCase()));

                    // Update the list with the filtered icons
                    return {
                        ...icons,
                        list: filteredIcons
                    };
                })
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter icons
     *
     * @param event
     */
    filterIcons(event: any): void
    {
        // Push the value to the observable
        this.filterValue$.next(event.target.value);
    }

    /**
     * Select an icon
     *
     * @param namespace
     * @param icon
     */
    selectIcon(namespace: string, icon: string): void
    {
        this.selectedIcon = [
            namespace,
            icon
        ];
    }

    /**
     * Returns the selected icon's svgIcon
     * to use in mat-icon component
     */
    calcSvgIconAttr(): string
    {
        if ( !this.selectedIcon )
        {
            return '';
        }

        if ( this.selectedIcon[0] === '' )
        {
            return this.selectedIcon[1];
        }

        return this.selectedIcon.join(':');
    }
}
