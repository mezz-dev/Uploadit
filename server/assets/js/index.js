const messageBox = document.querySelector(".message-box")
const appBaseUrl = "http://localhost:3000/"
const imagesContainer = document.querySelector(".images-container")
const fileInp = document.querySelector("input[type=file]")
const images = document.querySelectorAll(".image-container img")


// ----------------------------------------------------
// FORMS -------------------------------------------
// ----------------------------------------------------
$("#loginForm").on("submit", async function(e){
    
    e.preventDefault()

    try {
        // Login
        const response = await fetch("/api/v1/auth/login", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(getFormData($(this)))
        })
        const data = await response.json()

        if(!data.success){
            return importErrorMessage(data.errMessage)
        }

        // redirect to dashboard
        return redirectTo(appBaseUrl + "dashboard")

    } catch (error) {
        console.log(error)
        redirectTo(appBaseUrl)
    }
    

})

$("#registerForm").on("submit", async function(e){
    
    e.preventDefault()

    
    try {
        // Sign up
        const response = await fetch("/api/v1/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getFormData($(this)))
        })
        const data = await response.json()

        if(!data.success){
            return importErrorMessage(data.errMessage)
        }
        
        importSuccessMessage(data.message, appBaseUrl + "auth/login")

    } catch (error) {
        console.log(error)
        redirectTo(appBaseUrl)
    }
})

// form#addImageForm
$("#addImageForm").on("submit", async function(e){

    e.preventDefault()

    
    const imageFile = fileInp.files[0]
    if(!imageFile){
        return importErrorMessage("Please select an image")
    }

    // loading animation
    const loader = this.parentElement.querySelector(".loader")
    loader.classList.add("loader-active")

    // get image data as base64
    toBase64(imageFile)
     .then(async (res) => {
         const imageData = res.split(",")[1]

         // send and save image data with post request
         const response = await fetch("/api/v1/images/", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({imageData}) // body data type must match "Content-Type" header
         })

         const data =  await response.json()

         loader.classList.remove("loader-active")

         
         if(!data.success){
            loader.classList.remove("loader-active")
            return importErrorMessage(data.errMessage)
         }

         importSuccessMessage(data.message, appBaseUrl + "dashboard")
     })
     .catch((err) => {
         loader.classList.remove("loader-active")
         console.log(err)
         importErrorMessage(err.message)
     })



})
// ----------------------------------------------------
// end FORMS -------------------------------------------
// ----------------------------------------------------










// delete user image on click
$(".imageDeleteBtn").on("click", async function(){

    const imageId = this.dataset.imageId

    const response = await fetch(`http://localhost:3000/api/v1/images/${imageId}`, {
        method: "DELETE",
    })
    const data = await response.json()

    if(!data.success){
        importErrorMessage(data.errMessage)
    }

    // redirect to same page
    redirectTo(appBaseUrl + "dashboard")    
})

// get and import images one by one
$(document).ready(async function(){
    if(images){
        images.forEach(async (image) => {   
            let imageId = image.dataset.imageId
            const imageData = await getImage(imageId)
            image.src = `data:image/jpeg;base64,${imageData.data}`
            image.parentElement.classList.remove("image-loader")
        });
    }
})











// get user image
async function getImage(imageId){
    try {
        const response = await fetch(`api/v1/images/${imageId}`)
        const data = await response.json()

        if(!data.success){
            importErrorMessage(data.errMessage)
        }

        return data.image

    } catch (error) {
        console.log(error)   
    }
}

// convert file to base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

// import success message
function importSuccessMessage(msg, redirectUrl=null){
    messageBox.textContent = msg
    messageBox.classList.add("box-active", "success-message")
    if(redirectUrl){
        setTimeout(() =>  window.location = redirectUrl, 1500)
    }
}

// import error message
function importErrorMessage(msg){
    messageBox.textContent = msg
    messageBox.classList.add("box-active", "error-message")
}

// return form data
function getFormData(form, fileDOM=null){

    const formSerializedArray = $(form).serializeArray()
    let formData = {}
    $.map(formSerializedArray, (n) => {
        formData[n["name"]] = n["value"]
    })
    
    if(fileDOM){
        formData[fileDOM.getAttribute("name")] = fileDOM.value
    }

    return formData
}

// redirect
function redirectTo(url){
    location.href = url
}

function getCookie(cookie){
    let obj = {}
    const cookieItems = document.cookie.split(";")
    cookieItems.forEach(cookieItem => {
        const keyVal = cookieItem.split("=")
        obj[keyVal[0]] = keyVal[1]
    });

    return obj
}