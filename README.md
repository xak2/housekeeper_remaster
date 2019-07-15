State tree
app: {
    user: {
        auth: boolen (true/false),
        id: number,
        name: string
    }
}

App scheme
App (component): {
    isAuthenticated?: {
        Dashboard (component): {
            Customers (?),
            PackingList (container)
        }
    } : {
        LandingPage: {
            SignIn (container),
            Track (container),
            ResetPassword (container)
        }
    }
}