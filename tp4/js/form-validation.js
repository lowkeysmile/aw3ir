// form-validation.js

// Функция для обновления количества символов
function updateCharCount(id) {
    const inputField = document.getElementById(id);
    if (!inputField) return; // Если элемент не найден, выходим
    const charCount = inputField.value.length;
    const countElement = document.getElementById(`${id}Count`);
    if (countElement) {
        countElement.textContent = `${charCount} car.`; // Обновляем содержимое элемента с количеством символов
    }
}

function displayContactList() {
    const contactList = contactStore.getList();
    const tableBody = document.querySelector("table tbody");
    if (!tableBody) return; // Если элемент не найден, выходим
    tableBody.innerHTML = ""; // Очищаем содержимое таблицы перед обновлением

    contactList.forEach((contact, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.firstname}</td>
                <td>${contact.date}</td>
                <td>${contact.adresse}</td> <!-- Изменено на 'adresse' -->
                <td>${contact.mail}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Supprimer</button>
                </td>
            </tr>
        `;
    });
}

function deleteContact(index) {
    const contactList = contactStore.getList();
    if (index < 0 || index >= contactList.length) return; // Проверка валидности индекса
    contactList.splice(index, 1); // Удаляем контакт из массива

    // Обновляем localStorage
    localStorage.setItem("contactList", JSON.stringify(contactList));

    // Обновляем отображение списка контактов
    displayContactList();
}

window.onload = function () {
    console.log("DOM ready!");

    // Отображаем список контактов при загрузке страницы
    displayContactList();

    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        let valid = true;

        const fields = ["nom", "prenom", "adresse"];
        fields.forEach((fieldId) => {
            const field = document.getElementById(fieldId);
            if (field && field.value.length < 5) {
                alert(`${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} doit contenir au moins 5 caractères.`);
                valid = false;
            }
        });

        const email = document.getElementById("email").value;
        if (!validateEmail(email)) {
            alert("Email invalide.");
            valid = false;
        }

        const birthday = document.getElementById("birthday").value;
        const birthdayDate = new Date(birthday);
        const nowDate = new Date();
        if (birthdayDate > nowDate) {
            alert("La date de naissance ne peut pas être dans le futur.");
            valid = false;
        }

        if (valid) {
            const nom = document.getElementById("nom").value.trim();
            const prenom = document.getElementById("prenom").value.trim();
            const adresse = document.getElementById("adresse").value.trim();
            const dateNaissance = document.getElementById("birthday").value;
            const emailValue = document.getElementById("email").value.trim();

            // Добавляем контакт в хранилище
            contactStore.add(nom, prenom, dateNaissance, adresse, emailValue);

            // Обновляем отображение списка контактов
            displayContactList();

            // Показ сообщения подтверждения
            const successMessage = document.getElementById("successMessage");
            if (successMessage) {
                successMessage.classList.remove("d-none"); // Показываем сообщение
                successMessage.classList.add("show"); // Анимация появления

                // Автоматическое скрытие сообщения через 3 секунды
                setTimeout(() => {
                    successMessage.classList.remove("show");
                    successMessage.classList.add("d-none");
                }, 3000);
            }

            // Остальной код для модального окна
            const modalTitle = `Bienvenue ${prenom}`;
            const modalTitleElement = document.getElementById("exampleModalLabel");
            if (modalTitleElement) {
                modalTitleElement.textContent = modalTitle;
            }

            const welcomeMessage = `Vous êtes né le ${dateNaissance} et vous habitez à : ${adresse}`;
            const welcomeMessageElement = document.getElementById("welcomeMessage");
            if (welcomeMessageElement) {
                welcomeMessageElement.textContent = welcomeMessage;
            }

            const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(adresse)}`;
            const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(adresse)}&zoom=14&size=400x300&scale=2&markers=${encodeURIComponent(adresse)}&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

            const mapsLinkElement = document.getElementById("mapsLink");
            if (mapsLinkElement) {
                mapsLinkElement.href = mapsUrl;
            }

            const mapsImageElement = document.getElementById("mapsImage");
            if (mapsImageElement) {
                mapsImageElement.src = staticMapUrl;
            }

            const mapsLinkTextElement = document.getElementById("mapsLinkText");
            if (mapsLinkTextElement) {
                mapsLinkTextElement.href = mapsUrl;
                mapsLinkTextElement.textContent = adresse;
            }

            var myModal = new bootstrap.Modal(document.getElementById("myModal"));
            myModal.show();

            // Очистка формы после отправки
            document.getElementById("registration-form").reset();

            // Сброс счётчиков символов
            ["nom", "prenom", "adresse", "email"].forEach(id => {
                const countElement = document.getElementById(`${id}Count`);
                if (countElement) {
                    countElement.textContent = "0 car.";
                }
            });
        }
    });

    // Обработчик клика для кнопки геолокации
    const geoButton = document.getElementById("geoButton");
    if (geoButton) {
        geoButton.addEventListener("click", function () {
            getLocation();
        });
    }

    // Обработчик для кнопки сброса списка контактов
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            if (confirm("Êtes-vous sûr de vouloir réinitialiser la liste des contacts?")) {
                contactStore.reset();
                displayContactList();
            }
        });
    }

    // Функция для валидации email
    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
};
