let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_local_storage.match("true")) {
        getAddressBookDataFromStorage()
      } else {
        getAddressBookDataFromServer() 
      }
});

const getAddressBookDataFromStorage = () => {
    addressBookList  = localStorage.getItem('AddressBookList') ? 
  JSON.parse(localStorage.getItem('AddressBookList')) : []
  procesAddressBookCount()
  createInnerHtml()
}

function procesAddressBookCount() {
    document.querySelector(".address-count").textContent = addressBookList.length;
}

function getAddressBookDataFromServer() {
    makePromiseCall("GET", site_properties.server_url, true)
      .then(
        (responseText) =>{
          addressBookList = JSON.parse(responseText)
          procesAddressBookCount()
          createInnerHtml();
        }
      )
      .catch(
        (error) =>
          {
              console.log("Error status"+JSON.stringify(error));
              addressBookList = []
              procesAddressBookCount()
          }
      );  
}

const createInnerHTML = () => {
    if (addressBookList.length == 0) return;
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th>";
    let innerHtml = `${headerHtml}`;
    for (const addressBookData of addressBookList) {

        innerHtml =
            `
            ${innerHtml}
            <tr>
                <td>${addressBookData._name}</td>
                <td class="addressColumn">${addressBookData._address}</td>
                <td>${addressBookData._city}</td>
                <td>${addressBookData._state}</td>
                <td>${addressBookData._zip}</td>
                <td>${addressBookData._phoneNumber}</td>
                <td>
                    <img id="${addressBookData.id}" onclick="remove(this)" src="../assets/images/delete.svg" alt="delete">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img id="${addressBookData.id}" onclick="update(this)" src="../assets/images/edit.svg" alt="edit">
                </td>
            </tr>
            `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let addressBookData = addressBookList.find(addressData => addressData.id == node.id);
    if (!addressBookData) return;
    const index = addressBookList.map(addressData => addressData.id).indexOf(addressBookData.id);
    addressBookList.splice(index, 1);
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
    document.querySelector(".address-count").textContent = addressBookList.length;
    createInnerHTML();
    location.reload();
}

const update = (node) => {
    let addressBookData = addressBookList.find(addressData => addressData.id == node.id);
    if (!addressBookData) return;
    localStorage.setItem('editAddress', JSON.stringify(addressBookData));
    window.location = "../pages/addressBookForm.html";
}