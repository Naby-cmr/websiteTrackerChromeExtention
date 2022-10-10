let toTrack = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const trackFromLocalStorage = JSON.parse( localStorage.getItem("toTrack") )
const tabBtn = document.getElementById("tab-btn")

if (trackFromLocalStorage) {
    toTrack = trackFromLocalStorage
    render(toTrack)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        toTrack.push(tabs[0].url)
        localStorage.setItem("toTrack", JSON.stringify(toTrack) )
        render(toTrack)
    })
})

function render(track) {
    let listItems = ""
    for (let i = 0; i < track.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${track[i]}'>
                    ${track[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    toTrack = []
    render(toTrack)
})

inputBtn.addEventListener("click", function() {
    toTrack.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("toTrack", JSON.stringify(toTrack) )
    render(toTrack)
})