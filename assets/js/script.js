const modal = document.querySelector("#modal");

const newTransactionButton = document.querySelector("#new");

const closeModalButton = document.querySelector("#close-modal");

const registerBtn = document.querySelector("#register-btn");

const nameInput = document.querySelector("#name-in");
const priceInput = document.querySelector("#price-in");
const categoryInput = document.querySelector("#category-in");

const radioInput = document.querySelector("#radio-in");
const radioOutput = document.querySelector("#radio-out");

const cardin = document.querySelector("#cardin");
const cardout = document.querySelector("#cardout");
const cardtotal = document.querySelector("#cardtotal");

const cardt = document.querySelector(".cardtotal");

let incomes = 0;
let outcomes = 0;
let total = 0;

function resetInput(n) {
    n.style.border = "1px solid #d7d7d7";
}

function redInput(n) {
    n.style.border = "1px solid var(--red)";
}

function formatPrice(value) {
    const formattedPrice = Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return formattedPrice;
}

newTransactionButton.addEventListener("click", () => {
    radioInput.checked = true;
    nameInput.value = "";
    priceInput.value = "";
    categoryInput.value = "";
    resetInput(nameInput);
    resetInput(priceInput);
    resetInput(categoryInput);
    modal.showModal();
});

closeModalButton.addEventListener("click", () => {
    modal.close();
});

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.close();
    }
});

registerBtn.addEventListener("click", () => {
    if (nameInput.value !== "" && priceInput.value !== "" && categoryInput.value !== "") {
        const transactionList_el = document.querySelector(".transaction-list");

        const transaction_el = document.createElement("div");
        transaction_el.classList.add("transaction");

        const tname_el = document.createElement("div");
        tname_el.classList.add("title");
        tname_el.innerText = nameInput.value;

        const tprice_el = document.createElement("div");
        tprice_el.classList.add("price");

        if (radioInput.checked) {
            console.log("blz mané");
            tprice_el.classList.remove("outcome");
            tprice_el.classList.add("income");
            tprice_el.innerText = formatPrice(priceInput.value.replace("-", ""));
            incomes += Number(priceInput.value.replace("-", ""));
        } else {
            if (priceInput.value.includes("-")) {
                priceInput;
                tprice_el.classList.remove("income");
                tprice_el.classList.add("outcome");
                tprice_el.innerText = formatPrice(priceInput.value);
            } else {
                tprice_el.classList.remove("income");
                tprice_el.classList.add("outcome");
                tprice_el.innerText = formatPrice("-" + priceInput.value);
            }
            outcomes += Number(priceInput.value.replace("-", ""));
        }

        const tcategory_el = document.createElement("div");
        tcategory_el.classList.add("category");
        tcategory_el.innerText = categoryInput.value;

        const tdate_el = document.createElement("div");
        tdate_el.classList.add("date");

        const data = new Date();
        const dia = data.getDate();
        const mes = 1 + data.getMonth();
        const ano = data.getFullYear();

        tdate_el.innerText = dia + "/" + mes + "/" + ano;

        transaction_el.appendChild(tname_el);
        transaction_el.appendChild(tprice_el);
        transaction_el.appendChild(tcategory_el);
        transaction_el.appendChild(tdate_el);
        transactionList_el.appendChild(transaction_el);

        cardin.innerText = formatPrice(incomes);
        cardout.innerText = formatPrice(outcomes);

        total = incomes - outcomes;

        cardtotal.innerText = formatPrice(total);

        console.log(total);

        if (total >= 0) {
            cardt.style.background = "var(--green)";
        } else {
            cardt.style.background = "var(--red)";
        }

        modal.close();
    } else {
        if (nameInput.value == "") {
            redInput(nameInput);
        }
        if (priceInput.value == "") {
            redInput(priceInput);
        }
        if (categoryInput.value == "") {
            redInput(categoryInput);
        }
    }
});

nameInput.addEventListener("input", () => {
    if (nameInput.value.length == 1) {
        resetInput(nameInput);
    }
});

priceInput.addEventListener("input", () => {
    if (priceInput.value.length == 1) {
        resetInput(priceInput);
    }
});

categoryInput.addEventListener("input", () => {
    if (categoryInput.value.length == 1) {
        resetInput(categoryInput);
    }
});
