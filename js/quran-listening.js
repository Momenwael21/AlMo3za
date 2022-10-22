//give quran link active in navbar
window.addEventListener("load", function () {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  this.document.querySelector(".quran-link").classList.add("active");
});

// fetching api of quraa
let quraa = fetch("../APIs/quran-listening.json")
  .then((response) => response.json())
  .then((response) => response.reciters);

//fetch quraa names
window.addEventListener("load", function () {
  quraa.then((resp) => {
    for (i = 0; i < resp.length; i++) {
      if (resp[i].count == 114 && resp[i].rewaya == "حفص عن عاصم") {
        let a = this.document.createElement("a");
        a.href = "../pages/qare-suras.html";
        a.classList.add("qare", `${resp[i].id}`);

        let h5 = this.document.createElement("h5");
        h5.textContent = resp[i].name;
        a.appendChild(h5);

        let p = this.document.createElement("p");
        p.textContent = `براوية ${resp[i].rewaya}`;
        a.appendChild(p);

        this.document.querySelector(".quraa .container").appendChild(a);
      }
    }
    let qares = this.document.querySelectorAll(".quraa .qare");
    qares.forEach((qare) => {
      qare.addEventListener("click", function () {
        localStorage.setItem("currentQare", `${qare.classList[1]}`);
      });
    });
  });
});
