document.addEventListener("DOMContentLoaded", function () {
    showView("users");

    const options = document.querySelectorAll(".select-option");
    options.forEach(option => {
        option.addEventListener("click", function () {
            const viewId = this.id;
            showView(viewId);

            options.forEach(item => {
                item.classList.remove("selected");
            });
            this.classList.add("selected");
        });
    });



    function showView(viewId) {
        const views = document.querySelectorAll(".contains-dash > div");
        views.forEach(view => {
            view.style.display = "none";
        });
        const selectedView = document.getElementById(`dash-${viewId}`);
        if (selectedView) {
            selectedView.style.display = "block";
        }
    }
});
