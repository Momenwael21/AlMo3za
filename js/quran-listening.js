//give quran link active in navbar
window.addEventListener("load", function () {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  this.document.querySelector(".quran-link").classList.add("active");
});

// fetching api of quraa

let quraaContainer = this.document.querySelector(".quraa .quraa-container");
let rewayasType = document.querySelectorAll(".quraa .rewaya");
let quraa = fetch("../APIs/quran-listening.json")
  .then((response) => response.json())
  .then((response) => response.reciters);

//fetch quraa names
window.addEventListener("load", function () {
  quraa.then((resp) => {
    // to get quraa like moshaf type
    function getQuraa(rewayaType) {
      if (rewayaType == "moratal") {
        for (i = 0; i < resp.length; i++) {
          if (resp[i].count == 114) {
            let a = this.document.createElement("a");
            a.href = "../pages/qare-suras.html";
            a.classList.add(
              "qare",
              `${resp[i].id}`,
              `${resp[i].name.split(" ").join("-")}`
            );

            let h5 = this.document.createElement("h5");
            h5.textContent = resp[i].name;
            a.appendChild(h5);

            let p = this.document.createElement("p");
            p.textContent = `براوية ${resp[i].rewaya}`;
            a.appendChild(p);

            quraaContainer.appendChild(a);
          }
        }
      } else if (rewayaType == "mojawoad") {
        for (i = 0; i < resp.length; i++) {
          if (resp[i].count == 114 && resp[i].rewaya == "المصحف المجود") {
            let a = this.document.createElement("a");
            a.href = "../pages/qare-suras.html";
            a.classList.add(
              "qare",
              `${resp[i].id}`,
              `${resp[i].name.split(" ").join("-")}`
            );

            let h5 = this.document.createElement("h5");
            h5.textContent = resp[i].name;
            a.appendChild(h5);

            let p = this.document.createElement("p");
            p.textContent = `براوية ${resp[i].rewaya}`;
            a.appendChild(p);

            this.document
              .querySelector(".quraa .quraa-container")
              .appendChild(a);
          }
        }
      }

      // to select quraa and save data to get surahs
      let qares = this.document.querySelectorAll(".quraa .qare");
      qares.forEach((qare) => {
        qare.addEventListener("click", function () {
          localStorage.setItem("currentQare", `${qare.classList[1]}`);
          localStorage.setItem("currentQareName", `${qare.classList[2]}`);
        });
      });
    }
    // to get moshaf moratal by default
    getQuraa("moratal");

    // to get moshaf as the user choose
    rewayasType.forEach((moshaf) => {
      moshaf.addEventListener("click", function () {
        if (quraaContainer.innerHTML != "") {
          quraaContainer.innerHTML = "";
        }
        if (
          moshaf.classList.contains("active") &&
          moshaf.classList.contains("moratal")
        ) {
          getQuraa("moratal");
        } else {
          getQuraa("mojawoad");
        }
        rewayasType.forEach((moshaf) => moshaf.classList.remove("active"));
        moshaf.classList.add("active");
      });
    });
  });
});
