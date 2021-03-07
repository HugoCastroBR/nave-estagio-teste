

function renderInContainer(item,container){
    container.innerHTML += item
}


function generateNaver(infos){
    const container = document.querySelector('.navers_container')
    const naverTemplate= `
            <div class="Naver_Card">
                <div class="Naver_Card__image_container">
                    <img src="${infos.image_url}" alt="" class="Naver_Card__image">
                </div>
                <div class="Naver_Card__infos">
                    <h2 class="Naver_Card__infos__name">${infos.name}</h2>
                    <span class="Naver_Card__infos__job">${infos.job_role}</span>
                </div>
                </div>

    `
    renderInContainer(naverTemplate,container)
}

async function getNavers(){
    const res = await fetch('https://my-json-server.typicode.com/naveteam/fake-api/navers')
    const Navers = await res.json()
    Navers.forEach(naver => {
        generateNaver(naver)
    })
}

getNavers()