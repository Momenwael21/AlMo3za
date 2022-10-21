//give quran link active in navbar
window.addEventListener("load", function () {
  let navLinks = this.document.querySelectorAll(".nav-item .nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  this.document.querySelector(".quran-link").classList.add("active");
});

// api for quran surahs data
let surahs = fetch("../APIs/quran-reading.json").then((resp) => resp.json());

window.addEventListener("load", function () {
  let counter = 1;
  surahs.then((response) => {
    for (i = 0; i < response.length; i++) {
      let div = this.document.createElement("div");
      div.classList.add("surah", `${counter}`);
      counter++;

      let h5 = this.document.createElement("h5");
      h5.textContent = response[i].name;
      div.appendChild(h5);

      let p = this.document.createElement("p");
      p.textContent = `و عدد آياتها ${response[i].array.length}`;
      div.appendChild(p);

      this.document.querySelector(".surahs .container").appendChild(div);
    }
    for (i = 0; i < response.length; i++) {
      delete response[i].array;
    }
  });
});

// fetching api of surahs sounds from server

let quraa = fetch("../APIs/quran-listening.json")
  .then((response) => response.json())
  .then((response) => response.reciters);

window.addEventListener("load", function () {
  let allSurahs = document.querySelectorAll(".surahs .surah");
  let audio = document.querySelector(".surahs audio");
  allSurahs.forEach((surah) => {
    quraa.then((resp) => {
      for (i = 0; i < resp.length; i++) {
        if (resp[i].id == sessionStorage.getItem("currentQare")) {
          var currentQare = resp[i];
          this.document.querySelector(".surahs .surahs-head h1").textContent =
            resp[i].name;
        }
      }
      surah.addEventListener("click", function () {
        console.log(surah);
        console.log(currentQare);

        if (surah.classList[1].toString().length == 1) {
          console.log(currentQare);
          console.log(`${currentQare.Server}/00${surah.classList[1]}.mp3`);
          audio.src = `${currentQare.Server}/00${surah.classList[1]}.mp3`;
        } else if (surah.classList[1].toString().length == 2) {
          audio.src = `${currentQare.Server}/0${surah.classList[1]}.mp3`;
          console.log(`${currentQare.Server}/0${surah.classList[1]}.mp3`);
        } else if (surah.classList[1].toString().length == 3) {
          audio.src = `${currentQare.Server}/${surah.classList[1]}.mp3`;
          console.log(`${currentQare.Server}/${surah.classList[1]}.mp3`);
        }
      });
    });
  });
});
