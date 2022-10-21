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
let quraa = fetch("../APIs/quran-listening.json")
  .then((response) => response.json())
  .then((response) => response.reciters);

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
      let audio = this.document.createElement("audio");

      quraa.then((resp) => {
        for (i = 0; i < resp.length; i++) {
          if (resp[i].id == sessionStorage.getItem("currentQare")) {
            this.document.querySelector(".surahs .surahs-head h1").textContent =
              resp[i].name;

            audio.setAttribute(
              "src",
              `${resp[i].Server}/00${div.classList[1]}.mp3`
            );
          }
        }
        audio.setAttribute("controls", true);
        div.appendChild(audio);

        this.document.querySelector(".surahs .container").appendChild(div);
      });
    }
  });
});

// fetching api of surahs sounds from server

// window.addEventListener("load", function () {
//   let allSurahs = document.querySelectorAll(".surahs .surah");
//   allSurahs.forEach((surah) => {
//     surah.addEventListener("click", () => {});
//   });
// });
