import { Component, OnInit } from '@angular/core';

//import { AngularLogService } from '../../zdslogic-base/core/services/angular-log.service';

//import { ErrorService } from '../../zdslogic-base/core/services/error.service';

//import { ConfigurableService, ConfigService } from '@sinequa/ngx-ui-builder';
//import { PokemonService } from "./pokemon.service";
//import { defaultConfig } from "./config";

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
	products: any;
	constructor(
		//private logger: AngularLogService,
		//private errorService: ErrorService,
//		public configService: ConfigService,
//		public configurableService: ConfigurableService,
		//public pokemonService: PokemonService
	) { }

	ngOnInit(): void  {
		//this.errorService.changeMessage('');

		//this.configService.init(defaultConfig);
/*
		this.configService.init([{
			id: 'products',
			type: '_container',
			items: ['name', 'description', 'image', 'price']
		}, {
			id: 'price',
			type: 'price',
			currency: 'EUR'
		}]);
*/
	}

}
