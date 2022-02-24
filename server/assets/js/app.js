// MENU BAR
const navButton = document.querySelector(".nav-button")
const navMenu = document.querySelector(".nav-menu")
const nav = document.querySelector(".nav")
const main = document.querySelector("main")
let isOpen = false

// setup navbar toggle
// mobile devices only
navButton.addEventListener("click", () => {
    if(isOpen === false){
        main.classList.add("nav-open")
        nav.classList.add("nav-open")
        navButton.classList.add("nav-open")
        isOpen = true
        return
    }

    nav.classList.remove("nav-open")
    navButton.classList.remove("nav-open")
    setTimeout(() => {
        main.classList.remove("nav-open")
    }, 500)
    isOpen = false
    return
})






// form input animation
const inputFormItem = document.querySelectorAll(".form-item-input")
inputFormItem.forEach((item, i) => {
    
    // item childNode[1] -> input
    // item childNode[3] -> span.border-solid
    // item childNode[5] -> span.placeholder    
    const input = item.childNodes[1]
    const border = item.childNodes[3]
    let isActive = false
    
    input.setAttribute("autocomplete", "off")
    input.value = ""
    input.addEventListener("focusin", () => {
        if(isActive === false){
            // solid border & placeholder animation1
            item.childNodes[5].classList.add("placeholder-active")
            if(i !== 0) item.classList.add("item-active")
            border.classList.add("border-active")
    
            isActive = true
        }
    })
    input.addEventListener("focusout", () => {
        if(input.value.length === 0){
            item.childNodes[5].classList.remove("placeholder-active")
            if(i !== 0) item.classList.remove("item-active")

            border.classList.remove("border-active")

            isActive = false
        }

    })

});
// end form input animation








// image sub open
const imageContainer = document.querySelectorAll(".image-container")

imageContainer.forEach(container => {

    // container.childNode[1] --> image
    // container.childNode[3] --> image sub
    const image = container.childNodes[1]
    const sub = container.childNodes[3]

    container.addEventListener("mouseover", () => {
        sub.classList.add("sub-open")
        image.classList.add("sub-open")
    })
    
    container.addEventListener("mouseout", () => {
        image.classList.remove("sub-open")
        sub.classList.remove("sub-open")
    })

});





// display image file name
const imageInput = document.querySelector("input[type=file]")

if(imageInput){
    imageInput.addEventListener("change", function(){
    
        const formItem = imageInput.parentElement
        const deleteIcon = formItem.childNodes[5]
        const label = formItem.childNodes[3]
    
        label.textContent = this.files[0].name
        label.classList.add("image-selected")
        deleteIcon.classList.add("image-selected")
    
        deleteIcon.addEventListener("click", () => {
            this.value=""
            label.classList.remove("image-selected")
            deleteIcon.classList.remove("image-selected")
            label.textContent = 'Select an image'
        })
    })
}