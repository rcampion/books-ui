// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	ES_HOST: 'http://localhost:9200',
	RESULTS_PER_PAGE: 10,
	// apiUrl: 'https://www.zdslogic-development.com:8080/ng8-spring-server/api'
	// apiUrl: 'https://www.zdslogic-development.com:8080/spring-boot-docker-server/api'
	// apiUrl: 'http://www.zdslogic.com/ng8-spring-server/api'
	// apiUrl: 'http://localhost:8080/ng9-spring-server/api'
	redirectUri: 'http://localhost:8089',
	// redirectUri: 'http://www.zdslogic.com',
	// ssoUrl: 'http://localhost:18080/auth',

	apiUrl: 'http://localhost:8085/zdslogic-server/api',
	// apiUrl: 'http://www.zdslogic.com/zdslogic-server/api',


	// wsUrl: 'http://www.zdslogic.com/zdslogic-server/live'
	socketUrl: '/',
	baseURL: 'http://localhost:8085/zdslogic-server/api',
	wsUrl: 'http://localhost:8085/zdslogic-server/live',
	//microservices

	booksApiUrl: 'http://localhost:8085/books-server/api',

	ssoUrl: 'http://www.zdslogic.com/keycloak/auth',

	originHeader: 'http://localhost:8089',
	siteKey: '6LekHPgZAAAAAF22P6SL0snnu1stiwZkYN-slvea'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
