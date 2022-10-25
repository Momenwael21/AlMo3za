//give quran link active in navbar
navLinks.forEach((link) => {
  link.classList.remove("active");
});
this.document.querySelector(".quran-link").classList.add("active");

// api for quran surahs data
window.addEventListener("load", function () {
  fetch("../APIs/quran-reading.json")
    .then((resp) => resp.json())
    .then((response) => {
      for (i = 0; i < response.length; i++) {
        let div = this.document.createElement("div");
        div.classList.add("surah", `number-${response[i]["id"]}`);

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

      // add event click to surahs => popup
      let surahsNames = document.querySelectorAll(".surahs .container .surah");
      let popUp = document.querySelector(".surahs .popup");
      let popContent = document.querySelector(".surahs .popup .pop-content");
      let popClose = document.querySelector(".surahs .popup .popup-close");

      surahsNames.forEach((surahContainer) => {
        surahContainer.addEventListener("click", function () {
          for (i = 0; i < response.length; i++) {
            if (`number-${response[i]["id"]}` == surahContainer.classList[1]) {
              let h3Ar = document.createElement("h3");
              h3Ar.textContent = response[i].name;
              popContent.append(h3Ar);

              let pAr = document.createElement("p");
              pAr.innerHTML = response[i].ar;
              popContent.appendChild(pAr);

              let h3En = document.createElement("h3");
              h3En.textContent = response[i].name_en;
              popContent.append(h3En);

              let pEn = document.createElement("p");
              pEn.innerHTML = response[i].en;
              popContent.appendChild(pEn);

              popUp.style.cssText = "transform: translateX(0);";
              popClose.addEventListener("click", () => {
                popContent.innerHTML = "";
                popUp.style.cssText = "transform: translateX(100%);";
              });
            }
          }
        });
      });
    });
});
// api for quran array

function getSurah(surahContainer, surah) {
  let surahContent;

  return surahContent;
}
