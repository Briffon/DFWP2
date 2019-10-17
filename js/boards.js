class Board{
    constructor(){
        console.log("Boards loading...");    
        this.addContainer= document.querySelector("#addModalContainer");
        this.addContainerContent= document.querySelector("#addModalContent");
        this.modals= new Modal();
        
    }
    
    kanboardAPI(config) {
        //https://mousy-meat.glitch.me/api/lists?accessToken=5b1064585f4ab8706d275f90
        const { endpoint = '/lists', method=''} = config
        console.log(config)
        const API_KEY = '5b1064585f4ab8706d275f90'
        const BASE_URL = 'https://mousy-meat.glitch.me/api'

        
        return fetch(`${BASE_URL}${endpoint}?accessToken=${API_KEY}`).then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(res);
        })
    }

    boardItems(items,board){
        items.forEach(x=>{
            let backlog= document.querySelector(`#${board} ul`);
            let html = `
                <li class=\"item\" data-itemId=\"${x.id}\">
                <h3>${x.title}</h3>
                <p>${x.description}</p>
                <div class="info">
                    <button class=\"edit\">Edit</button>
                    <div class=\"timeInfo\">
                        <img src="/icons/calendar.png" width="20" height="20" alt="">
                        <time datetime=\"${x.dueDate}\">${x.dueDate}</time>
                    </div>
                </div>
                </li>`
                //console.log(html);
                backlog.insertAdjacentHTML('beforeend',html);
            
        })
        let boardItems= document.querySelectorAll(".edit");
        boardItems.forEach(x=>{
            x.addEventListener('click',this.modals.itemsModal);
        })
    }

    makeBoard(board){
        let boards= document.querySelector("#boards");
        let html=`
        <li id=\"${board.title.toLowerCase()}\" data-boardid=\"${board.id}\">
            <div class=\"boardInfo\">     
                <h2>${board.title}</h2>
                <button class="add">Add Task</button>
            </div>
            <ul data-board=\"${board.title.toLowerCase()}\">
                
            </ul>
        </li>`
        boards.insertAdjacentHTML('beforeend',html);
        this.boardItems(board.items,board.title.toLowerCase())


    }
    
    loadItems(e){
        this.kanboardAPI({ endpoint: '/lists'})
        .then(json => {
          //console.log(json);

          if(json.length>0){
                json.forEach(x=>{
                    this.makeBoard(x);
                })
                let addButton = document.querySelectorAll(".add");
                addButton.forEach(x=>{
                    x.addEventListener('click',this.modals.addModal);
                })  
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
}