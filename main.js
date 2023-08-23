let form=document.getElementById('my-form');
form.addEventListener('submit',store);
let itemList=document.getElementById('items')
itemList.addEventListener('click',removeItem);
function store(e){
    e.preventDefault()
    let temp=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    const isEdit=document.getElementById('editUserId').value !=='';
    let myObj={
        name:temp,
        mailID:email,
    }
    if (isEdit){
        const editUserId=document.getElementById('editUserId').value
        axios.put(`https://crudcrud.com/api/48d7a40849b04ef9be7b0db200499821/cloud/${editUserId}`,myObj)
        .then(()=>{
            let updatedItem = null;
            for (let i = 0; i < itemList.childNodes.length; i++) {
                const listItem = itemList.childNodes[i];
                if (listItem.nodeType === Node.ELEMENT_NODE && listItem.getAttribute('data-id') === editUserId) {
                    updatedItem = listItem;
                    break;
                }
            }

            updatedItem.textContent=myObj.name+' - '+myObj.mailID;
        })
        .catch((err)=>console.log(err))
    }else{
        axios.post('https://crudcrud.com/api/48d7a40849b04ef9be7b0db200499821/cloud',myObj)
        .then((response)=>{
            addItem(response.data);
            console.log(response);
        })
        .catch((err)=>console.log(err))
}
    
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
    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-primary btn-sm float-right edit';
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editBtn);
    editBtn.dataset.id = item._id;
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
        const email=listItem.textContent.split(' - ')[1].slice(0,-10);
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


itemList.addEventListener('click',editItem);

function editItem(e){
    if (e.target.classList.contains('edit')){
        const listItem=e.target.parentElement;
        const email=listItem.textContent.split(' - ')[1].slice(0,-10);
        const userId = e.target.dataset.id;
        console.log(email);
        axios.get("https://crudcrud.com/api/48d7a40849b04ef9be7b0db200499821/cloud")
        .then((response)=>{
            const userData = response.data;
                let userIdToEdit = null;
                
                for (let i = 0; i < userData.length; i++) {
                    if (userData[i].mailID == email) {
                        userIdToEdit = userData[i];
                        break;
                    }
                }
            console.log(userIdToEdit.name);
            if(userIdToEdit){
                document.getElementById('name').value=userIdToEdit.name;
                document.getElementById('email').value=userIdToEdit.mailID;
                document.getElementById('editUserId').value = userId;
            }
        })
        .catch((err)=> console.log(err))
    }
}