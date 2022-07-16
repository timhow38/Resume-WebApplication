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
            //create button for each app that is open

            //console.log(appsArray);
        } else if (appClassSplit.includes('application-non-drag')) {
            //console.log(appController.apps[i].id, "Is Closed");

            appsArray.push(appController.apps[i].id, "closed");
            //console.log(appsArray);
        }

    }
}


// create an empty function
function taskbarItem() {
    console.log("taskbarItem");
    //check if appController.apps contains 'application' if it is create a new button for each app and append to id "task-windows"
    $("#task-windows").append('<li class="nav-item minWindow" id="taskbar-item"><input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off"><label class="btn btn-outline-primary" for="btn-check-outlined">' + appController.apps[0].id + '</label></li>');
}


//if class minWindow is clicked, open the app
$("#task-windows").find(".minWindow-" + o.name).click(function() {
    //consolelog all o.name
    console.log(o.name);
    console.log("clicked on " + $(this).text());
    appController.close($(this).text());
});

//if class minWindow is clicked, open the app
$("#task-windows").find(".minWindow-terminal").click(function() {
    //consolelog all o.name
    console.log("test");
});
//$("#task-windows").append('<li class="nav-item minWindow ' + n.name + '" id="taskbar-item"><input type="checkbox" class="btn-check" name="btn-' + n.name + '" id="btn-check-outlined" autocomplete="off"><label class="btn btn-outline-primary" for="btn-check-outlined">' + n.name + '</label></li>'),