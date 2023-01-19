//give quran link active in navbar
navLinks.forEach((link) => {
  link.classList.remove("active");
});
this.document.querySelector(".quran-link").classList.add("active");

//put surahs data
window.addEventListener("load", function () {
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
        p.textContent = `سورة ${response[i].type}`;
        div.appendChild(p);
        this.document
          .querySelector(".surahs .surahs-container")
          .appendChild(div);
      }

      let surahs = this.document.querySelectorAll(".surahs .surah");
      // fetch api of sound

      // to get qare name
      document.querySelector(".surahs .surahs-head h1").textContent =
        this.localStorage.getItem("currentQareName").split("-").join(" ");
      // to select surah and play audio
      let audio = document.querySelector(".surahs .player audio");
      surahs.forEach((surah, index) => {
        surah.addEventListener("click", function () {
          fetch("../APIs/quran-listening.json")
            .then((response) => response.json())
            .then((response) => response.reciters)
            .then((response) => {
              for (i = 0; i < response.length; i++) {
                // to give server link to audio tag
                if (response[i].id == localStorage.getItem("currentQare")) {
                  if ((index + 1).toString().length == 1) {
                    audio.src = `${response[i].Server}/00${index + 1}.mp3`;
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
                  break;
                }
              }
            });
        });
      });
    });
});

// api for quran surahs data
