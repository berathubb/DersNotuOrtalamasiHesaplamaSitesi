const tableBody = document.querySelector("tbody");
const hesapla = document.getElementById("hesapla");
const sonuc = document.getElementById("sonuc");
const yeniDersEkleButton = document.getElementById("yeniDersEkle");
const popupOverlay = document.getElementById('popup-overlay');
const popup = document.getElementById('popup');
const kaydetPopupButton = popup.querySelector('.kaydet');
const duzenlePopupButton = popup.querySelector('.duzenle');
const popupTableBody = document.getElementById('popup-table-body');
const deletePopup = document.getElementById("delete-popup");
const yesButton = document.querySelector(".evet");
const noButton = document.querySelector(".iptal");
const deletePopupOverlay = document.getElementById('delete-popup-overlay');

const dersler = [];


let idCounter = 0; // Her ders için benzersiz bir kimlik oluşturmak için sayaç

function yeniDersEkle() {
    const row = document.createElement("tr");
    const dersCell = document.createElement("td");
    const notCell = document.createElement("td");
    const silmeCell = document.createElement("td");

    const dersInput = document.createElement("input");
    dersInput.type = "text";
    dersInput.placeholder = "Ders İsmi";
    dersCell.appendChild(dersInput);

    $(dersInput).inputmask({ regex: "[a-zA-Z\s]*" });

    const notInput = document.createElement("input");
    notInput.type = "number";
    notInput.placeholder = "Not";
    notInput.min = 0;
    notInput.max = 100;
    notCell.appendChild(notInput);

    const silButton = document.createElement("button");
    silButton.className = "delete-button";
    silButton.innerHTML = "Sil";
    silButton.addEventListener("click", function () {
        deletePopupOverlay.style.display = 'block';

        deletePopup.style.display = 'block';

        yesButton.addEventListener("click", function () {
            deletePopupOverlay.style.display = 'none';
            tableBody.removeChild(row);
            const index = dersler.findIndex((ders) => ders.row === row);
            if (index !== -1) {
                dersler.splice(index, 1);
                hesaplaOrtalama();
                updatePopupTable();
            }
            deletePopup.style.display = 'none';
        });

        noButton.addEventListener("click", function () {
            deletePopupOverlay.style.display = 'none';
            deletePopup.style.display = 'none';
        });
    });
    silmeCell.appendChild(silButton);

    row.appendChild(dersCell);
    row.appendChild(notCell);
    row.appendChild(silmeCell);

    tableBody.appendChild(row);

    const id = idCounter++; // mevcut değerini bir sabit olan id'ye atadık ve  idCounter'ın değerini bir artırdık. 
    dersler.push({ id, row, dersInput, notInput });
    updatePopupTable();
}

function updatePopupTable() {
    // popup tablosunu temizledik
    popupTableBody.innerHTML = '';
    // Her ders için popup tablosuna bir satır ekledik
    dersler.forEach((ders) => {  // dersler dizisini dolaşan bir forEach döngüsünün başlangıcıdır. Bu döngü, dersler dizisindeki her öğe için aşağıdaki işlemleri gerçekleştiricek;
        const popupRow = document.createElement("tr");
        const dersCell = document.createElement("td");
        const notCell = document.createElement("td");
        dersCell.textContent = ders.dersInput.value;
        notCell.textContent = ders.notInput.value;
        popupRow.appendChild(dersCell);
        popupRow.appendChild(notCell);
        popupTableBody.appendChild(popupRow);
    });
}

function hesaplaOrtalama() {
    let toplamDers = 0;
    let toplamNot = 0;

    for (const ders of dersler) {
        const not = parseFloat(ders.notInput.value);

        if (!isNaN(not) && not >= 0 && not <= 100) {
            toplamNot += not;
            toplamDers += 1;
        }
    }

    if (toplamDers > 0) {
        const ortalama = toplamNot / toplamDers;
        sonuc.textContent = `Not Ortalamanız : ${ortalama.toFixed(2)}`;
    } else {
        sonuc.textContent = "Geçerli Not Girin";
    }
}

hesapla.addEventListener("click", function () {

    let dersIsimleri = true;
    let notlar = true;

    dersler.forEach((ders) => {
        if (ders.dersInput.value.trim() === "") {
            dersIsimleri = false;
        }
        if (ders.notInput.value.trim() === "") {
            notlar = false;
        }
    });

    if (!dersIsimleri || !notlar) {
        alert("Lütfen tüm ders isimleri ve notları girin.");
        return;
    }

    popupOverlay.style.display = 'block';
    // Popup tablosunu güncelledik
    updatePopupTable();
});

kaydetPopupButton.addEventListener("click", function () {
    hesaplaOrtalama();
    popupOverlay.style.display = 'none';
});

duzenlePopupButton.addEventListener("click", function () {
    popupOverlay.style.display = 'none';
});


yeniDersEkleButton.addEventListener("click", yeniDersEkle);

for (let i = 0; i < 12; i++) {
    yeniDersEkle();
}
