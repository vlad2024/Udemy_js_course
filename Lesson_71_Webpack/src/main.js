function myModule(){
    this.hello = function(){
        console.log("Hello");
    };

    this.goodbye = function(){
        console.log("by");
    };
}

// синтаксис commondJS выглядит таким образом 
module.exports = myModule; // пишем модуль експортс и то что хотим ексортировать, такм образом мы експортировали
// эту функцию, а в файле script.js надо наоборот импортировать её(принять)