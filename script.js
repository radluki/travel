function renderMapWithRoute(id, name) {
    return `<div style="max-width:600px;overflow:hidden;margin:0 auto;min-width:300px;"><iframe
    src="https://mapa-turystyczna.pl/map/widget/route/h1l0p1/${id
        }.html" height="680" frameborder="0"
        style = "width:100%;border:0;" ></iframe > <a
            href="https://mapa-turystyczna.pl/route/${id
        }?utm_source=external_web&amp;utm_medium=widget&amp;utm_campaign=route_widget"
            target="_blank"
            style="color:#999;padding:7px 0;font-size: 13px;font-family:Roboto,Arial,sans-serif;display: inline-block;">Trasa:
            ${name} | mapa-turystyczna.pl</a></div >`;
}

function renderListElement(id, name) {
    let div = document.createElement('div');

    let nameNode = document.createElement('h4');
    nameNode.innerText = name;
    div.appendChild(nameNode)
    div.id = `x${id}`;

    div.innerHTML += renderMapWithRoute(id, name).trim();
    return div;
}

fetch('https://raw.githubusercontent.com/radluki/travel/main/trasy.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (let item of data.wysokie) {
            console.log(item)
            let element = renderListElement(item.id, item.name)
            document.getElementById("content-wysokie").append(element)

            let menuItem = document.createElement("li");
            menuItem.innerHTML = `<a href="#x${item.id}">${item.name}</a>`;
            document.getElementById("wysokieSubmenu").append(menuItem)
        }

        for (let item of data.zachodnie) {
            console.log(item)
            let element = renderListElement(item.id, item.name)
            document.getElementById("content-zachodnie").append(element)

            let menuItem = document.createElement("li");
            menuItem.innerHTML = `<a href="#x${item.id}">${item.name}</a>`;
            document.getElementById("zachodnieSubmenu").append(menuItem)
        }

    })
    .catch(function (err) {
        console.log(err);
    });