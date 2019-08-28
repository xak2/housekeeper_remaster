cd "path to your repo"
git init
git add . # if you want to commit everything. Otherwise use .gitconfig files
git commit -m "initial commit" # If you change anything, you can add and commit again...
To add a remote, just do

git remote add origin https://...
git remote show origin # if everything is ok, you will see your remote
git push -u origin master # assuming your are on the master branch.

Used tutorial:
https://maxfarseer.gitbooks.io/redux-course-ru-v2/content/sozdanie/tochka-vhoda.html
https://www.npmjs.com/package/react-cookie

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