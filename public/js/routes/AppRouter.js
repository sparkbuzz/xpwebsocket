class AppRouter extends Backbone.Router {

    constructor() {
        this.routes = {
            "*actions": "homeAction"
        };
        super();
    }

    homeAction() {
        let view = new HomeView();
    }
}
