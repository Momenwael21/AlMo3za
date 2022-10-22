//give quran link active in navbar
window.addEventListener("load", function () {
  let navLinks = this.document.querySelectorAll(".nav-item .nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  this.document.querySelector(".quran-link").classList.add("active");

  fetch("../APIs/quran-reading.json")
    .then((resp) => resp.json())
    .then((response) => {
      for (i = 0; i < response.length; i++) {
        let div = this.document.createElement("div");
        div.classList.add("surah");

        let h5 = this.document.createElement("h5");
        h5.textContent = response[i].name;
        div.appendChild(h5);

        let p = this.document.createElement("p");
        p.textContent = `و عدد آياتها ${response[i].array.length}`;
        div.appendChild(p);

        this.document
          .querySelector(".surahs .surahs-container")
          .appendChild(div);
      }
    });
  // fetch api of sound
  fetch("../APIs/quran-listening.json")
    .then((response) => response.json())
    .then((response) => response.reciters)
    .then((response) => {
      console.log(response);
      let surahs = document.querySelectorAll(".surahs .surah");

      // to get qare name
      for (i = 0; i < response.length; i++) {
        if (response[i].id == sessionStorage.getItem("currentQare")) {
          document.querySelector(".surahs .surahs-head h1").textContent =
            response[i].name;
        }
      }
      // to select surah and play audio
      let audio = document.querySelector(".surahs .player audio");
      surahs.forEach((surah, index) => {
        surah.addEventListener("click", function () {
          for (i = 0; i < response.length; i++) {
            console.log(response[i]);
            // to give server link to audio tag
            console.log(sessionStorage.getItem("currentQare"));
            if (response[i].id == sessionStorage.getItem("currentQare")) {
              console.log(response[i]);
              if ((index + 1).toString().length == 1) {
                audio.src = `https://server11.mp3quran.net/hawashi/00${
                  index + 1
                }.mp3`;
              } else if ((index + 1).toString().length == 2) {
                audio.src = `${response[i].Server}/0${index + 1}.mp3`;
              } else if ((index + 1).toString().length == 3) {
                audio.src = `${response[i].Server}/${index + 1}.mp3`;
              }
              document.querySelector(
                ".surahs .player .surahName"
              ).textContent = `سورة ${surah.firstChild.textContent}`;
              document.querySelector(
                ".surahs .player .sheikh"
              ).textContent = `للقارئ الشيخ ${response[i].name}`;
              surahs.forEach((surah) => surah.classList.remove("active"));
              surah.classList.add("active");
              audio.addEventListener("ended", () => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "السورة انتهت",
                  showConfirmButton: true,
                });
              });
            } else console.log("Not Found");
            // break;
          }
        });
      });
    });
});
// api for quran surahs data
