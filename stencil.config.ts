import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'event-bus-webcomponent',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'event-bus-webcomponent-ng',
      directivesProxyFile: '../event-bus-webcomponent-ng/src/directives/proxies.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
