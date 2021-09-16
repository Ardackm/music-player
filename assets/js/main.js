const { ipcRenderer } = require ("electron");

document.getElementById("close").addEventListener("click", () => {
    ipcRenderer.send("close");
});

let durationMinutes, durationSeconds;

document.getElementById("music").onloadedmetadata = function () {
    durationMinutes = Math.floor(document.getElementById("music").duration / 60);
    durationSeconds = Math.floor(document.getElementById("music").duration - durationMinutes * 60);

    if (durationMinutes.toString().length < 2 && durationSeconds.toString().length < 2) {
        document.getElementById("time").innerText = `0${durationMinutes}:0${durationSeconds}`;
    }
    else if (durationMinutes.toString().length < 2 || durationSeconds.toString().length >= 2) {
        document.getElementById("time").innerText = `0${durationMinutes}:${durationSeconds}`;
    }
    else if ( durationMinutes.toString().length >= 2 || durationSeconds.toString().length < 2) {
    }
    else {
        document.getElementById("time").innerText = `${durationMinutes}:0${durationSeconds}`;
    }
};

document.getElementById("play").addEventListener("click", ()=> {
    if(document.getElementById("music").src != '') {
        if (document.querySelector("#play").classList[1] == "fa-play") {
            document.querySelector("#play").classList.add("fa-pause");
            document.querySelector("#play").classList.remove("fa-play");
            document.getElementById("music").play();
            document.getElementById("animation").classList.add("animation");
        }
        else {
            document.querySelector("#play").classList.remove("fa-pause");
            document.querySelector("#play").classList.add("fa-play");
            document.getElementById("music").pause();
            document.getElementById("animation").classList.remove("animation");
        }

        setInterval(() => {
            var currentMinutes = Math.floor(document.getElementById("music").currentTime / 60);
            var currentSeconds = Math.floor(document.getElementById("music").currentTime - currentMinutes * 60);
            if (currentMinutes.toString().length < 2 && currentSeconds.toString().length < 2) {
            }
            else if (currentMinutes.toString().length < 2 || currentMinutes.toString().length >= 2) {   
                document.getElementById("current").innerText = `${currentMinutes}:${currentSeconds}`;
            }
            else if (currentMinutes.toString().length >= 2 || currentSeconds.toString().length < 2) {
                document.getElementById8("current").innerText = `0${currentMinutes}:${currentSeconds}`;
            }
            else {
                document.getAnimations("current").innerText = `${currentMinutes}:0${currentSeconds}`;
            }

            document.getElementById("point").style.left = `${document.getElementById("music").currentTime / (document.getElementById("music").duration / 100)}%`;
        }, 1000)
    } 
    else {
        alert("Please open any music file!")
    }
})

ipcRenderer.on("openFile", (event, {file, filename})=> {
    const type = (/[^.]+$/.exec(filename)[0]).toLowerCase();
    if (type == "mp3" || type == "ogg" || type == "wav" || type == "aac") {
        if (filename.length > 27) {
            document.getElementById("name").innerText = `${filename.slice(0, 27)}..`;
        }
        else {
            document.getElementById("name").innerText = filename;
        }
        document.getElementById("music").src = file;

        document.getElementById("current").innerText = "00:00";
    }
    else {
        alert(`You can't open ${type}`)
    }
})