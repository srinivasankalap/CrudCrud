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