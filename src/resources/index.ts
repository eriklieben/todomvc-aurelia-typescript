import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './value-converters/statevalueconverter',
    './value-converters/pluralizevalueconveter',
    './value-converters/timeAgoValueConverter',
    './elements/lastModified'
  ]);
}
