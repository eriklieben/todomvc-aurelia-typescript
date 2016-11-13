export class PluralizeValueConverter {
  
  public toView(count, single, multiple) {
    return (count === 1) ?  single : multiple;
  }
}

