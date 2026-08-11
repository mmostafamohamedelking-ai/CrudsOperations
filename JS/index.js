var fullNameInput = document.getElementById("fullName"); // inputs
var phoneNumber = document.getElementById("phoneNumber"); // inputs
var emailAddress = document.getElementById("emailAddress"); // inputs
var address = document.getElementById("address"); // inputs
var group = document.getElementById("group"); // inputs
var notes = document.getElementById("notes"); // inputs
var isFavorite = document.getElementById("isFavorite"); //* Boolean
var isEmergency = document.getElementById("isEmergency"); //* Boolean
var rowData = document.getElementById("rowData"); //! container
var totalContacts = document.getElementById("totalContacts"); //? counter
var favoritesCount = document.getElementById("favoritesCount"); //? counter
var emergencyCount = document.getElementById("emergencyCount"); //? counter
var favoritesList = document.getElementById("favoritesList"); //! container
var emergencyList = document.getElementById("emergencyList"); //! container
var ContactsList = JSON.parse(localStorage.getItem("ContactsList")) || [];
display();
function addContact() {
  var NewContact = {
    name: fullNameInput.value,
    phone: phoneNumber.value,
    email: emailAddress.value,
    address: address.value,
    group: group.value,
    notes: notes.value,
    isFavorite: isFavorite.checked,
    isEmergency: isEmergency.checked,
  };
  ContactsList.push(NewContact);
  localStorage.setItem("ContactsList", JSON.stringify(ContactsList));
  CloseModal();
  Swal.fire({
    title: "Added Successfully!",
    text: "You clicked the button!",
    icon: "success",
    showConfirmButton: false,
    timer: 2000,
  });
  ClearInputs();
  display();
}
function ClearInputs() {
  fullNameInput.value = "";
  phoneNumber.value = "";
  emailAddress.value = "";
  address.value = "";
  group.value = "";
  notes.value = "";
  isFavorite.value = false;
  isEmergency.value = false;
}
function CloseModal() {
  var Modal = document.getElementById("addContactModal");
  var BootstrapModal = bootstrap.Modal.getInstance(Modal);
  BootstrapModal.hide();
}

function display(){
  if (ContactsList.length == 0){
       emergencyCount.innerHTML = 0;
     favoritesCount.innerHTML = 0;
     totalContacts.innerHTML = 0;
     favoritesList.innerHTML = ''; 
     emergencyList.innerHTML = '';
         rowData.innerHTML = `
         
             <div class="col-12">
                     <p class="alert alert-warning text-center text-danger">
                       No contacts found
                     </p>
                 </div>
                 `
         return
     }
     var cartona = ``;
     var total = 0;
     var favorites = 0;
     var emergency = 0;
     var favCartona = ``;
     var emgCartona = ``;

     for (let i = 0; i < ContactsList.length ; i++){
      if (ContactsList[i].isFavorite){
        
        favorites++;
        favCartona += `
          <div class="sidebar-contact-card"> 
                     <div class="sidebar-contact-avatar" style="background: #3b82f6"> 
                    ${ContactsList[i].name.charAt(0)}
                    </div>
                    <div class="sidebar-contact-info">
                      <h5>${ContactsList[i].name}</h5>
                      <p>${ContactsList[i].phone}</p>
                    </div>
                    <button class="sidebar-call-btn favorites-call">
                      <i class="fas fa-phone"></i>
                    </button >
                </div>  


              </div>
            </div>
        `
      }
      if (ContactsList[i].isEmergency){
        
        emergency++;
        emgCartona += `
          <div class="sidebar-contact-card"> 
                     <div class="sidebar-contact-avatar" style="background: #3b82f6"> 
                    ${ContactsList[i].name.charAt(0)}
                    </div>
                    <div class="sidebar-contact-info">
                      <h5>${ContactsList[i].name}</h5>
                      <p>${ContactsList[i].phone}</p>
                    </div>
                    <button class="sidebar-call-btn favorites-call">
                      <i class="fas fa-phone"></i>
                    </button >
                </div>  


              </div>
            </div>
        `
      }
      
      cartona += `
      <div class="col-md-6 ">
                     <div class="contact-card">
                       <div class="contact-header">
                         <div
                           class="contact-avatar bg-primary ${ContactsList[i].isFavorite ? 'favorite' : ''} ${ContactsList[i].isEmergency ? 'emergency' : ''} "
                         >
                          ${ContactsList[i].name.split(" ")[0].charAt(0)}${ContactsList[i].name.split(" ")[0].charAt(1)}
                         </div>
                         <div class="contact-info">
                           <h4>${ContactsList[i].name}</h4>
                         </div>
                       </div>
                       <div class="contact-details">
                         <div class="contact-detail phone">
                           <i class="fas fa-phone"></i>
                           <span>${ContactsList[i].phone}</span>
                         </div>
                         <div class="contact-detail email">
                           <i class="fas fa-envelope"></i>
                           <span>${ContactsList[i].email}</span>
                         </div>
                         <div class="contact-detail address">
                           <i class="fas fa-map-marker-alt"></i>
                           <span>${ContactsList[i].address}</span>
                         </div>
                       </div>
                       <div class="contact-tags">
                         <span class="tag family">${ContactsList[i].group}</span>
                         ${ContactsList[i].isEmergency ? `<span class="tag emergency">
                           <i class="fas fa-heartbeat"></i> Emergency
                         </span>` : ''}
                         ${ContactsList[i].isFavorite ? '<span class="tag emergency bg-warning"><i class="fa fa-star"></i> Favorite</span>' : ''}

                       </div>
                       <div class="contact-actions">
                         <button class="contact-action call" title="Call">
                           <i class="fas fa-phone"></i>
                         </button>
                         <button class="contact-action email" title="Email">
                           <i class="fas fa-envelope"></i>
                         </button>
                         <button
                           class="contact-action favorite ${ContactsList[i].isFavorite ? 'active' : ''}" onclick="toggleFav(${i})">
                           
                            <i class="fas fa-star"></i> 
                         </button>
                         
                         <button
                           class="contact-action emergency ${ContactsList[i].isEmergency ? 'active' : ''}"
                           title="Emergency" onclick="toggleEmg(${i})">
                            <i class="fas fa-heart"></i>
                          </button> 

                         <button class="contact-action" onclick="editData(${i})"  data-bs-toggle="modal"
            data-bs-target="#addContactModal" title="Edit">
                           <i class="fas fa-edit"></i>
                          </button>
                          <button class="contact-action delete" onclick="deleteContact(${i})"  title="Delete">
                           <i class="fas fa-trash"></i>
                         </button>
                       </div>
                     </div>
 
                  </div>
      `
      total++;
     }
     rowData.innerHTML = cartona;
     emergencyCount.innerHTML = emergency;
     favoritesCount.innerHTML = favorites;
     totalContacts.innerHTML = total;
     favoritesList.innerHTML = favCartona; 
     emergencyList.innerHTML = emgCartona;
  }
  

 function deleteContact(index){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed){
            ContactsList.splice(index , 1);
            display();
            localStorage.setItem("ContactsList" , JSON.stringify(ContactsList));
         Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
        });
    }
        });


}

var currentIndex = 0;
function editData(index){
  var updateLabel = document.getElementById("addContactModalLabel");
  updateLabel.innerHTML = `Update Contact`

  fullNameInput.value = ContactsList[index].name;
  phoneNumber.value = ContactsList[index].phone;
  emailAddress.value = ContactsList[index].email;
  address.value = ContactsList[index].address;
  group.value = ContactsList[index].group;
  notes.value = ContactsList[index].notes;
  isFavorite.checked = ContactsList[index].isFavorite;
  isEmergency.checked = ContactsList[index].isEmergency;

  var addButton = document.getElementById("saveContactBtn");
  addButton.classList.add("d-none");
  var updateButton = document.getElementById("updateContactBtn");
  updateButton.classList.remove("d-none");
  currentIndex = index;
}
function updateContact(){
  var NewContact = {
    name: fullNameInput.value,
    phone: phoneNumber.value,
    email: emailAddress.value,
    address: address.value,
    group: group.value,
    notes: notes.value,
    isFavorite: isFavorite.checked,
    isEmergency: isEmergency.checked,
  }
   ContactsList.splice(currentIndex , 1 , NewContact);
   
   ClearInputs();
   CloseModal();
   
   Swal.fire({
     title: "Updated Successfully!",
        text: "You clicked the button!",
        icon: "success"
        });

    display();
    localStorage.setItem("ContactsList" , JSON.stringify(ContactsList));
}


function toggleFav(index){

    ContactsList[index].isFavorite = ! ContactsList[index].isFavorite;
    display();

    localStorage.setItem("ContactsList" , JSON.stringify(ContactsList));

}

function toggleEmg(index){
    console.log(ContactsList[index]);

    ContactsList[index].isEmergency = ! ContactsList[index].isEmergency;

    display();

    localStorage.setItem("ContactsList" , JSON.stringify(ContactsList));

}
var SearchInput = document.getElementById("searchInput");
function search(){
    var text = searchInput.value.toLowerCase();

    var box = '';

    for (var i = 0; i < allContact.length; i++) {

        if(allContact[i].fullName.toLowerCase().includes(text) || allContact[i].email.includes(text) || allContact[i].phoneNumber.toLowerCase().includes(text)){

             box +=
        `
            <div class="col-md-6">

                    <div class="contact-card">
                      <div class="contact-header">
                        <div
                          class="contact-avatar bg-primary ${allContact[i].isFavorite ? 'favorite' : ''} ${allContact[i].isEmergency ? 'emergency' : ''}"
                        >
                          ${allContact[i].fullName.split(" ")[0].charAt(0)}${allContact[i].fullName.split(" ")[0].charAt(1)}
                        </div>
                        <div class="contact-info">
                          <h4>${allContact[i].fullName}</h4>
                        </div>
                      </div>
                      <div class="contact-details">
                        <div class="contact-detail phone">
                          <i class="fas fa-phone"></i>
                          <span>${allContact[i].phoneNumber}</span>
                        </div>
                        <div class="contact-detail email">
                          <i class="fas fa-envelope"></i>
                          <span>${allContact[i].email}</span>
                        </div>
                        <div class="contact-detail address">
                          <i class="fas fa-map-marker-alt"></i>
                          <span>${allContact[i].address}</span>
                        </div>
                      </div>
                      <div class="contact-tags">
                        <span class="tag family">${allContact[i].group}</span>
                        ${allContact[i].isEmergency ? '<span class="tag emergency"><i class="fas fa-heartbeat"></i> Emergency</span>' : ''}
                        ${allContact[i].isFavorite ? '<span class="tag emergency bg-warning"><i class="fas fa-heartbeat"></i> Favorite</span>' : ''}
                      </div>
                      <div class="contact-actions">
                        <button class="contact-action call" title="Call">
                          <i class="fas fa-phone"></i>
                        </button>
                        <button class="contact-action email" title="Email">
                          <i class="fas fa-envelope"></i>
                        </button>
                        <button onclick="toggleFav(${i})"
                          class="contact-action favorite ${allContact[i].isFavorite ? 'active' : ''}">
                           title="Favorite"
                           <i class="fas fa-star"></i>
                        </button>
                        <button onclick="toggleEmg(${i})"
                          class="contact-action emergency ${allContact[i].isEmergency ? 'active' : ''}"
                          title="Emergency">
                           <i class="fas fa-heart"></i>
                         </button>
                        <button class="contact-action" onclick="editData(${i})" data-bs-toggle="modal" data-bs-target="#addContactModal" title="Edit">
                          <i class="fas fa-edit"></i>
                         </button>
                         <button class="contact-action delete" onclick="deleteContact(${i})" title="Delete">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>

                 </div>

        `

        }
    }

    if(box === ''){
        rowData.innerHTML =
        `
            <div class="col-12">
                    <p class="alert alert-danger text-center text-danger">
                      No Contacts Avalible
                    </p>
                </div>

        `
    }else{
        rowData.innerHTML = box;
    }

}

fullNameInput.addEventListener("input" , function(){
    if(fullNameInput.value.length < 3){
        fullNameInput.classList.add('is-invalid');
    }else{
        fullNameInput.classList.remove('is-invalid');
        fullNameInput.classList.add('is-valid');
    }
})