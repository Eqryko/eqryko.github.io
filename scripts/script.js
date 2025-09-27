
function openImage(){
    window.open(newUrl, "_self");
}

const apiKey = "ooA3JQ8fnLy8kTGMXUi2Iil4dvaF4ZCwjDj91Qe8";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
var newUrl;

fetch(url) // richiesta HTTP -> Promise
    .then(response => {
        // Leggi headers prima di convertire in JSON
    const remaining = response.headers.get("X-RateLimit-Remaining");
    const limit = response.headers.get("X-RateLimit-Limit");

    // Mostra nell'HTML
    document.getElementById("usage").textContent =
      `Remaining requests: ${remaining}/${limit}`;

    // Ora converti il body in JSON
        return response.json();  // se la Promise ha successo riceve una risposta che convertiamo in Json (per il formato dell'api)
    })
        .then(data => { // anche quest'ultima ritorna una Promise (data contiene i dati Json pronti)
        if(data.media_type === "image"){
            document.getElementById("img_apod").src = data.url;
            document.getElementById("img_apod").style.display = "block";
        } else if(data.media_type === "video"){
            document.getElementById("vid_apod").src = data.url;
            document.getElementById("vid_apod").style.display = "block";
        }
        document.getElementById("p_date").textContent = data.date;
        document.getElementById("apod_title").textContent = data.title;
        document.getElementById("apod_cr").textContent = `Image Credit & Copyright: ${data.copyright}`;
        document.getElementById("explanation").textContent = data.explanation;
        newUrl = data.url;
    })
.catch(err => console.error(err));

