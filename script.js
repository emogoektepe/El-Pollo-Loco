// JSON = JavaScript Object Notation
let contacts = [];

function addContact(firstName, lastName, phone) {
    let myContact = new Contact(firstName, lastName, phone);
    contacts.push(myContact);
}

addContact('Emre', 'Göktepe', '0124214123');
addContact('Bünyamin', 'Simit', '0123159812');
addContact('Erika', 'Mustermann', '0123512512');
addContact('Eso', 'Deso', '0532522');