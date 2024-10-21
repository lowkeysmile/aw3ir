// store.js
/*
Script pour gérer la liste de contact en JSON

Pour ajouter un contact:  contactStore.add(_name, _firstname, _date, _adresse, _mail);
Pour récupérer la liste:    contactStore.getList();
Pour réinitialiser la liste: contactStore.reset();
*/
var contactStore = (function () {
    // Variable privée
    let contactListString = localStorage.getItem("contactList");
    var contactList = contactListString ? JSON.parse(contactListString) : [];

    // Expose these functions via an interface while hiding
    // the implementation of the module within the function() block

    return {
        add: function (_name, _firstname, _date, _adresse, _mail) {
            var contact = {
                name: _name,
                firstname: _firstname,
                date: _date,
                adresse: _adresse, // Изменено на 'adresse'
                mail: _mail,
            };
            // Добавление контакта в список
            contactList.push(contact);

            // Сохранение списка в localStorage
            localStorage.setItem("contactList", JSON.stringify(contactList));

            return contactList;
        },
        reset: function () {
            contactList = []; // Очищаем массив
            localStorage.removeItem("contactList");

            return contactList;
        },

        getList: function () {
            return contactList;
        },
    };
})();
