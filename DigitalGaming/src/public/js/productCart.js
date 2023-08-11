const optionsSelect = document.getElementById("options");
const otraOptionInput = document.getElementById("otraOption");

optionsSelect.addEventListener("change", function() {
    if (optionsSelect.value === "otra") {
        otraOptionInput.style.display = "block";
        otraOptionInput.setAttribute("required", "required");
    } else {
        otraOptionInput.style.display = "none";
        otraOptionInput.removeAttribute("required");
    }
});