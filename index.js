function movieSearch(event) {
  event.preventDefault();

  let movie = document.querySelector("#movie").value;
  showmovie(movie);
  // showMovie(movie);
}

// async function showMovie(q) {
//   const url = "http://www.omdbapi.com/?apikey=5bec42fd&t=" + q;
//   try {
//     let data = await fetch(url);
//     let movie = await data.json();
//     console.log(movie);
//   } catch (err) {
//     console.log("error:", err);
//   }
// }

function appendMovie(movieData) {
  document.querySelector(".container").innerHTML = "";
  movieData.forEach((element) => {
    let div = document.createElement("div");
    div.setAttribute("class", "small_div");

    let image = document.createElement("img");
    image.src = element.Poster;
    let details = document.createElement("div");
    details.setAttribute("class", "details");

    let name = document.createElement("h2");
    name.innerText = element.Title;
    let gerne = document.createElement("p");
    gerne.innerText = `Genre: ${element.Genre}`;
    let run = document.createElement("p");
    run.innerText = `Time: ${element.Runtime}`;
    let year = document.createElement("p");
    year.innerText = `Year of Release: ${element.Year}`;
    let rate = document.createElement("p");
    rate.innerText = `IMDb Rating: ${element.imdbRating}`;
    let lang = document.createElement("p");
    lang.innerText = `Language: ${element.Language}`;

    details.append(name, gerne, run, year, rate, lang);
    div.append(image, details);
    document.querySelector(".container").append(div);
    document.querySelector("input").value = null;
  });
}

function notValidData() {
  document.querySelector(".container").innerHTML = "";
  let img = document.createElement("img");
  img.src =
    "https://media1.giphy.com/media/8L0Pky6C83SzkzU55a/200w.webp?cid=ecf05e47mfgsv5qz6rix5m7k8qklkgqwry6ochlooa0zowxq&rid=200w.webp&ct=g";
  document.querySelector(".container").append(img);
}

function showmovie(q) {
  const url = "http://www.omdbapi.com/?apikey=5bec42fd&t=" + q;
  var arr = [];
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.Title !== q) {
        notValidData(data);
      } else {
        if (data.imdbRating > 8.5) {
          let tag = document.querySelector("#recommended");
          tag.innerText = "Top Rated Movie";

          arr.push(data);
          appendMovie(arr);
        } else {
          document.querySelector("#recommended").innerText = "";
          arr.push(data);
          appendMovie(arr);
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
