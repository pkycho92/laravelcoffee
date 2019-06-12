(function () {

    let container = document.getElementById("container");
    container.innerHTML = "";
    let contact = document.createElement("div");
    contact.setAttribute("id", "contact");
    contact.innerHTML = "<p>(818)555-5555</p><p>email@gmail.com</p><p>12345 Somewhere St., Somewhere City, CA 12345</p>";
    let divider = document.createElement("img");
    divider.classList.add("dividerImage");
    divider.src = "resources/divider.png";
    let map = document.createElement("iframe");
    map.setAttribute("id", "map");
    map.src = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d42500.75558795804!2d-118.53900408877853!3d34.28929672327978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1543799998646";
    container.appendChild(contact);
    container.appendChild(divider);
    container.appendChild(map);
    map.classList.add("activeArticle");
}());
