// api for quran data

let surahs = fetch("http://api.alquran.cloud/v1/meta")
  .then((response) => response.json())
  .then((response) => response.data.surahs.references);

window.addEventListener("load", function () {
  surahs.then((response) => {
    for (i = 0; i < response.length; i++) {
      let div = this.document.createElement("div");
      div.classList.add("surah", response[i].englishName);

      let h5 = this.document.createElement("h5");
      h5.textContent = response[i].name;
      div.appendChild(h5);

      let p = this.document.createElement("p");
      p.textContent = `و عدد آياتها ${response[i].numberOfAyahs}`;
      div.appendChild(p);

      this.document.querySelector(".surahs .container").appendChild(div);
    }
  });
});
