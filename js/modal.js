class Modal{
    constructor(){
        console.log("modal loading");
        this.addContainer= document.querySelector("#addModalContainer");
        this.addContainerContent= document.querySelector("#addModalContent");
    }

    itemsModal=(e)=>{
        e.preventDefault();
        let itemCotainer = document.querySelector("#itemModalContainer")
        let itemContainerContent= document.querySelector("#itemModalContent");
        let itemId= e.path[2].dataset.itemid;
        let url= `https://mousy-meat.glitch.me/api/items/${itemId}?accessToken=5b1064585f4ab8706d275f90`;

        fetch(url,{
            method:'GET',
        })
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            console.log(data);
            let html=`
            <form action="#" id="itemModalForm">
            <ul>
                    <li>
                    <label>Title</label>
                    <input class="required" id="title" placeholder="${data.title}"></input>
                    </li>
    
                    <li>
                    <label>Description</label>
                    <input class="required" id="description" placeholder="${data.description}"></input>
                    </li>
    
                    <li>
                    <label>Date</label>
                    <input class="required" id="date" placeholder="${data.dueDate}"></input>
                    </li>
            </ul>
            <button id="submit">Submit</button>
            </form>`;
            //console.log(html)
            itemContainerContent.insertAdjacentHTML('beforeend',html);
            let submit= document.querySelector('#submit');
        })
        .catch(err=>{
            console.log(err);
        })
        itemCotainer.classList.toggle('is-open');
        itemCotainer.addEventListener('click', this.closeItemModal);
        window.addEventListener('keydown', this.escape);
        itemContainerContent.addEventListener('click', e => {
            e.stopPropagation();
        })

      

    }

    addModal=(e)=>{
        console.log('Open')
        let board=e.path[2].dataset.boardid;
        this.addContainer.classList.toggle('is-open');
        this.addContainer.addEventListener('click', this.closeAddModal);
        window.addEventListener('keydown', this.escape);
        this.addContainerContent.addEventListener('click', e => {
            e.stopPropagation();
        })

        let html=`
        <form action="#" id="addModalForm">
        <ul>
                <li>
                <label for="title">Title</label>
                <input class="required" id="title" required></input>
                </li>

                <li>
                <label for="date">Date</label>
                <input class="required" id="date" required></input>
                </li>

                <li>
                <label for="description">Description</label>
                <textarea rows="4" cols="50" name="description" form="addModalForm" placeholder="Enter Text Here..." id="description" required></textarea>
                </li>
        </ul>
        <button type="submit" id="submitItem">SUBMIT</button>
        </form>`;

        this.addContainerContent.insertAdjacentHTML('beforeend',html);
        let sumbit = document.querySelector("#submitItem");
        console.log(this);
        sumbit.addEventListener('submit',function (e) {this.submit(e,board)}.bind(this),true);
    }

    submit=(e,board)=>{
        e.preventDefault();
        //console.log(board)
        let title = document.querySelector("#title").value;
        let description= document.querySelector("#description").value;
        let date = document.querySelector("#date").value;

        let url= 'https://mousy-meat.glitch.me/api/items?accessToken=5b1064585f4ab8706d275f90';
        let data={
            title:title,
            description:description,
            dueDate:new Date(date),
            listId:board
    
        };

        fetch(url,{
            method:'POST',
            body:(JSON.stringify(data)),
            headers: {
            'content-type': 'application/json'
        }
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            location.reload();
        })
        

    }

    closeItemModal=()=>{
        let itemContainer = document.querySelector("#itemModalContainer")
        let itemContainerContent= document.querySelector("#itemModalContent");
        itemContainer.classList.toggle('is-open')
        itemContainerContent.innerHTML = ''
        itemContainer.removeEventListener('click', this.close)
        window.removeEventListener('keypress', this.escape)
    }

    closeAddModal=()=>{
        this.addContainer.classList.toggle('is-open')
        this.addContainerContent.innerHTML = ''
        this. addContainer.removeEventListener('click', this.close)
        window.removeEventListener('keypress', this.escape)
    }

    escape = e => {
        if (e.keyCode === 27) {
          this.close()
        }
    }
}