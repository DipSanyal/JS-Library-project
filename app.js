console.log("Started logging");
let tbl=[];
displayTable();

function Book(name, author, genre)
{
  this.name=name;
  this.author=author;
  this.genre=genre;
}

function display()
 {
   
   
 }

 display.prototype.add=function(book){
  let tblCon=localStorage.getItem("Books");
  let tblObj=[];

  if(tblCon!=null)
    tblObj=JSON.parse(tblCon);

  tblObj.push(book);
  localStorage.setItem("Books",JSON.stringify(tblObj));
  displayTable();
 }

 display.prototype.clear=function(){
   let libForm=document.getElementById('libraryForm');
   libForm.reset();
 }

display.prototype.validate=function(book){
  if(book.name=="" || book.name.length <2 || book.name.length>100)
  {
    return false;
  }
  return true;

}

 display.prototype.popup=function(type,msg){
   let message=document.getElementById('message');
   let html=`<div class="alert ${type} alert-dismissible fade show" role="alert">
   <strong><b>${msg}!!</b></strong>
   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`;
 message.innerHTML=html;
 setTimeout(function(){
   message.innerHTML="";
 },2000);
 }

 function displayTable()
 {
  let html="";
  let tblCon=localStorage.getItem("Books");
  let tblObj=[];

  if(tblCon!=null)
  {
    tblObj=JSON.parse(tblCon);

    tblObj.forEach(function(element,index){
      html+=`<tr>
      <th scope="row">${index+1}</th>
      <td>${element.name}</td>
      <td>${element.author}</td>
      <td>${element.genre}</td>
      <td><button type="button" class="btn btn-danger" id="rowDel" onclick="deleteRow(${index})">Delete</button></td>
    </tr>`;
  }); 
  }
 let tblBody=document.getElementsByTagName('tbody')[0];
 tblBody.innerHTML=html;
 }

 function deleteRow(index){
  let tblCon=localStorage.getItem("Books");
  let tblObj=[];
  tblObj=JSON.parse(tblCon);
  tblObj.splice(index,1);
  localStorage.setItem("Books",JSON.stringify(tblObj));
  displayTable();
 }


 let addBtn=document.getElementById('addBk');
 addBtn.addEventListener("click",function(e){
  e.preventDefault();
  let bkName=document.getElementById('inputName3').value;
  let authName=document.getElementById('inputAuthor3').value;
  let genres=document.getElementsByClassName('form-check-input');
  let disp=new display();
   let obj;
   let chkelm;
   let genre;

     
        if(authName=="")
        {
          authName="Unavailable";
        }
        Array.from(genres).forEach(element=>{
            if(element.checked)
            {
                chkelm=element;
            }
        });

        if(chkelm==null)
        {
          genre="unavailable";
        }
        else{
          genre=chkelm.value;
        }
        

        let book= new Book(bkName,authName,genre);
        console.log(book);
        if(disp.validate(book))
        {
        disp.add(book);
        disp.clear();
        disp.popup("alert-success","success");
        }
        else{
          disp.popup("alert-danger","failure");
        }

      
 });

