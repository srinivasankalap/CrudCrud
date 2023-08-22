let form=document.getElementById('my-form');
form.addEventListener('submit',store);
let itemList=document.getElementById('items')
itemList.addEventListener('click',removeItem);
function store(e){
    e.preventDefault()
    let temp=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let myObj={
        name:temp,
        mailID:email,
    }
    axios.post('https://crudcrud.com/api/48d7a40849b04ef9be7b0db200499821/cloud',myObj)
    .then((response)=>{
        addItem(response.data);
        console.log(response);
    })
    .catch((err)=>console.log(err))
    
    
};

function addItem(item){
    let li=document.createElement('li');
    li.className='item';
    li.appendChild(document.createTextNode(item.name+' - '+item.mailID));
    let deleteBtn=document.createElement('button');
    deleteBtn.className='btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);
    itemList.appendChild(li);
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/48d7a40849b04ef9be7b0db200499821/cloud")
    .then((response)=>{
        for (var i=0;i<response.data.length;i++){
            addItem(response.data[i]);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})

function removeItem(e){
    if (e.target.classList.contains('delete')){
        const listItem=e.target.parentElement;
        const email=listItem.textContent.split(' - ')[1].slice(0,-6);
        console.log(email);
        axios.get("https://crudcrud.com/api/48d7a40849b04ef9be7b0db200499821/cloud")
        .then((response)=>{
            const userData = response.data;
                let userIdToDelete = null;
                
                for (let i = 0; i < userData.length; i++) {
                    if (userData[i].mailID == email) {
                        userIdToDelete = userData[i]._id;
                        break;
                    }
                }
            console.log(userIdToDelete);
            if(userIdToDelete){
                axios.delete(`https://crudcrud.com/api/48d7a40849b04ef9be7b0db200499821/cloud/${userIdToDelete}`)
                .then(()=>{
                    itemList.removeChild(listItem)
                })
                .catch((err)=>console.log(err))
            }
        })
        .catch((err)=> console.log(err))
    }
}