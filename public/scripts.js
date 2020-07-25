const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")
const formDelete = document.querySelector("#form-delete")
const itemBody = document.querySelector("body")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

// So executa o eventListener se estiver dentro do edit das páginas
// Senão da caughtException e tranca o resto do script
if (currentPage.includes("edit")) {
    formDelete.addEventListener("submit", function(event){
        const confirmation = confirm("Deseja deletar?")
        if(!confirmation) {
            event.preventDefault()
        }
    })
}

// Muda o background-color do body quando o usuario está na área dos estudantes
if (currentPage.includes("students")) {
    itemBody.style.backgroundColor = "lightcoral";
}