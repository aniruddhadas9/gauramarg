import { Injectable } from '@angular/core';

import ClientConfig = gapi.auth2.ClientConfig;

export interface NgGapiClientConfig extends ClientConfig {
  discoveryDocs: string[];
}


@Injectable({
  providedIn: 'root'
})
export class GoogleApiConfigService {

  protected clientConfig: NgGapiClientConfig;

  constructor(clientConfig: NgGapiClientConfig) {
    this.clientConfig = clientConfig;
  }

  public getClientConfig(): NgGapiClientConfig {
    return this.clientConfig;
  }
}
