let button = document.getElementById("btn");

button.addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let title = document.getElementById("title").value;
    let website = document.getElementById("website").value;
    let location = document.getElementById("location").value;
    let theme = document.getElementById("themeSelect").value;
    console.log(name,email,phone,title,website,location,theme);
    
    if(!name || !email|| !phone || !location || !title) {
        alert("Please fill in all the required fields");
        return;
    } 

    document.querySelector(".card-preview").style.display = "block";
    document.getElementById("dwdimg").style.display = "inline-block";
    document.getElementById("dwdpdf").style.display = "inline-block";


    let cardOutput = document.querySelector(".cardOutput");
    cardOutput.classList.remove("light","dark","color");
    cardOutput.classList.add(theme);
    
    let cardInfo = document.querySelector(".cardInfo");

    let imageInput = document.getElementById("img");
    let imageURL;

    if (imageInput.files && imageInput.files[0]) {
        imageURL = URL.createObjectURL(imageInput.files[0]);
    } else {
        imageURL = "https://www.w3schools.com/howto/img_avatar.png"; 
    }

    document.getElementById("profileimage").src = imageURL;
    cardInfo.innerHTML = `
    <div class="card ${theme}">
    <h3><strong>Name:</strong> ${name}</h3>
    <p><strong>Title: ${title}</strong></p>
    <p><strong>Phone:</strong> ${phone}</p>
    ${website ? `<p>Website(optional): ${website}</p>` : ''}
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Email:</strong> ${email}</p>
    </div>`;
});
// 1. Save as Image
document.getElementById("dwdimg").addEventListener("click", () => {
    const card = document.querySelector(".cardOutput");
    html2canvas(card).then(canvas => {
        const link = document.createElement("a");
        link.download = "business_card.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// 2. Save as PDF
document.getElementById("dwdpdf").addEventListener("click", () => {
    const card = document.querySelector(".cardOutput");
    html2canvas(card).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jspdf.jsPDF(); // A4 by default
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save("business_card.pdf");
    });
});

