import { RouterConfiguration, Router } from 'aurelia-router';

export class App {
  public router;
   
  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia - TodoMVC';
    config.map([
      { route: ['', 'all'],   name: 'all',        moduleId: 'todoView', nav: true, title: 'All' },
      { route: 'active',      name: 'active',     moduleId: 'todoView', nav: true, title: 'Active' },
      { route: 'completed',   name: 'completed',  moduleId: 'todoView', nav: true, title: 'Completed' }
    ]);

    this.router = router;
  }
}
