class AddressBookData {

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        }
        else {
            throw 'Name is incorrect!';
        }
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(phoneNumber) {
        let phoneNumberRegex = RegExp('^([1-9]{1}[0-9]{9}|[9]{1}[1]{1}[1-9]{1}[0-9]{9}|/[+]{1}[9]{1}[1]{1}[1-9]{1}[0-9]{9})$');
        if (phoneNumberRegex.test(phoneNumber)) {
            this._phoneNumber = phoneNumber;
        }
        else throw 'Phone Number is incorrect!';
    }

    get address() {
        return this._address;
    }

    set address(address) {
        let addressRegex = RegExp('^[a-zA-Z0-9]{3,}\\s[a-zA-Z0-9]{3,}([ ]|[a-zA-Z0-9]{3,})*?$');
        if (addressRegex.test(address)) {
            this._address = address;
        }
        else throw 'Address is incorrect!';
    }

    get city() {
        return this._city;
    }

    set city(city) {
        this._city = city;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
    }

    get zip() {
        return this._zip;
    }

    set zip(zip) {
        this._zip = zip;
    }
}

window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    const textErrorNew = document.querySelector('.text-error-new');

    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }

        try {
            (new AddressBookData()).name = name.value;
            textError.textContent = "";
            textErrorNew.textContent = "valid";
        } catch (e) {
            textErrorNew.textContent = "";
            textError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressTextError = document.querySelector('.address-text-error');
    const addressTextErrorNew = document.querySelector('.address-text-error-new');

    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressTextError.textContent = "";
            return;
        }

        try {
            (new AddressBookData()).address = address.value;
            addressTextError.textContent = "";
            addressTextErrorNew.textContent = "valid";
        } catch (e) {
            addressTextErrorNew.textContent = "";
            addressTextError.textContent = e;
        }
    });

    const phoneNumber = document.querySelector('#phoneNumber');
    const phoneNumberTextError = document.querySelector('.phoneNumber-text-error');
    const phoneNumberTextErrorNew = document.querySelector('.phoneNumber-text-error-new');

    phoneNumber.addEventListener('input', function () {
        if (phoneNumber.value.length == 0) {
            phoneNumberTextError.textContent = "";
            return;
        }

        try {
            (new AddressBookData()).phoneNumber = phoneNumber.value;
            phoneNumberTextError.textContent = "";
            phoneNumberTextErrorNew.textContent = "valid";
        } catch (e) {
            phoneNumberTextErrorNew.textContent = "";
            phoneNumberTextError.textContent = e;
        }
    });
});

const save = () => {

    try {
        createaAddressBook();
    } catch (e) {
        alert("Oops!!! There's an error ======> " + e);
        alert("Please correct the details & try again...!!!");
        return;
    }
}

const createaAddressBook = () => {
    let addressBookData = new AddressBookData();

    addressBookData.id = createNewAddressId();
    addressBookData.name = getInputValueById('#name');
    addressBookData.phoneNumber = getInputValueById('#phoneNumber');
    addressBookData.address = getInputValueById('#address');
    addressBookData.city = getInputValueById('#city');
    addressBookData.state = getInputValueById('#state');
    addressBookData.zip = getInputValueById('#zipCode');
    alert("Object created successfully with id : " + addressBookData._id + " -----> " + addressBookData.toString());
    return addressBookData;
}