let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressBookList = getAddressBookDataFromStorage();
    document.querySelector(".address-count").textContent = addressBookList.length;
    createInnerHTML();
    localStorage.removeItem('editAddress');
});

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
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
                    <img id="${addressBookData._id}" onclick="remove(this)" src="../assets/images/delete.svg" alt="delete">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img id="${addressBookData._id}" onclick="update(this)" src="../assets/images/edit.svg" alt="edit">
                </td>
            </tr>
            `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}