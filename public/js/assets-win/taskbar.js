//appController.apps[0].elm.className
const appClassString = appController.apps[0].elm.className;
const appClassSplit = appClassString.split(' ');


// create empty function
function AppStatus() {

    //check all appController.apps
    for (let i = 0; i < appController.apps.length; i++) {
        const appClassString = appController.apps[i].elm.className;
        const appClassSplit = appClassString.split(' ');
        //console.log(appClassSplit);
        //if appClassSplit contains 'application' console.log
        var appsArray = [];
        if (appClassSplit.includes('application')) {
            //console.log(appController.apps[i].id, "Is Open");
            //create a new array called "appsArray" and push appController.apps[i].id

            appsArray.push(appController.apps[i].id, "open");
            console.log(appsArray);
        } else if (appClassSplit.includes('application-non-drag')) {
            //console.log(appController.apps[i].id, "Is Closed");

            appsArray.push(appController.apps[i].id, "closed");
            console.log(appsArray);
        }

    }
}