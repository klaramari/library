let form = document.querySelector(".newbookform")

//make sure form is not shown in the beginning
document.addEventListener("DOMContentLoaded", () => {
    form.style.display = "none";
    displayBooks();
})

const myLibrary =[new Book("harry potter", "jk", 30, true),
new Book("harry potter2","jk", 500, true)];

function Book(title,author,pages, read){
this.pages = pages
this.title = title
this.author = author
this.read = read
this.info = function (){
    let rd = ""
    if (this.read == 0){
        rd = "not read yet"
    }
    else{
        rd = "already read"
    }
    return `${title} by ${author}, ${pages}, ${rd}`
}
}

function addBookToLibrary(title,author,pages,read){
    console.log(read)
    let book = new Book(title,author, pages, read)  
    console.log(book)
    myLibrary.push(book);
    form.style.display = "none";
    displayBooks();
}


let newbook = document.querySelector(".newbook")
newbook.addEventListener("click", toggleForm)

function toggleForm(){
    
    if (form.style.display == "none"){
        form.style.display = "flex";
    }
    else if (form.style.display == "flex"){
        form.style.display = "none";
    }
}

let submitb = document.querySelector(".submitbutton")
form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    addBookToLibrary(document.querySelector("#title").value,document.querySelector("#author").value,document.querySelector("#pages").value,document.querySelector("#read").checked);
    
})

let display = document.querySelector(".displaybooks")


function displayBooks(){
    display.innerHTML = "";

    myLibrary.forEach((book,index) => {
        console.log(index)
        const card = createCard(book, index); // Pass the book to the createCard function
        display.appendChild(card); // Append the card to the display container
    });
    
}

function createCard(book, index){
    const card = document.createElement("div");
    card.classList.add(`book-card`);
    card.classList.add(`${index}`)

    // Create elements to display book information
    const title = document.createElement("h2");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const readStatus = document.createElement("p");
    readStatus.textContent = `Status: ${book.read ? "Already read" : "Not read yet"}`;

    const toggleRead = document.createElement("button");
    toggleRead.textContent = "Toggle Read";
    toggleRead.classList.add("readbut")
    toggleRead.classList.add(`${index}`)
    
    toggleRead.addEventListener("click", () => {
        if (myLibrary[index].read == true){
            myLibrary[index].read = false
        }
        else{
            myLibrary[index].read = true
        }
        displayBooks();
    })


    const deleteB = document.createElement("button");
    deleteB.textContent = "Delete book";
    deleteB.classList.add(`delete${index}`)

    deleteB.addEventListener("click", () => {
        myLibrary.splice(index,1)
        displayBooks()
        
    })

    // Append elements to the card
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readStatus);
    card.appendChild(toggleRead);
    card.appendChild(deleteB);

    return card;
    
}

