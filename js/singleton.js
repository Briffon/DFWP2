class Singleton{

    constructor(){
        console.log("singleton loaded");
        let boards = new Board();    
        boards.loadItems(); 
    }

    static instantiate(){
        if(!Singleton._instance){
            Singleton._instance= new Singleton();
            return Singleton._instance;
        }else{
            throw "Cannot create second singleton!";
        }
    }
}