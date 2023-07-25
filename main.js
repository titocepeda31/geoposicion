const lat = document.getElementById("lat");
const lng = document.getElementById("lng");
const btn = document.getElementById("buscarPuntos");
const table = document.getElementById("dataTabla");

const buscarPuntos = () => {

    // Validar que existan los elementos lat y lng
    if (!lat || !lng) {
        console.error("No se encontraron los elementos 'lat' y/o 'lng'");
        return;
    }

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat.value}&lon=${lng.value}`)
        .then(response => response.text())
        .then(xml => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");
            const result = xmlDoc.getElementsByTagName('result')[0];
            const address = xmlDoc.getElementsByTagName('addressparts')[0];

            // Validar que existan los elementos result y address
            if (!result || !address) {
                console.error("No se encontraron los elementos 'result' y/o 'addressparts' en el XML");
                return;
            }


            const addressText = result ? result.textContent : '';
            const building = address.getElementsByTagName('building')[0]?.textContent || '';
            const road = address.getElementsByTagName('road')[0]?.textContent || '';
            const neighbourhood = address.getElementsByTagName('neighbourhood')[0]?.textContent || '';
            const city = address.getElementsByTagName('city')[0]?.textContent || '';
            const county = address.getElementsByTagName('county')[0]?.textContent || '';
            const state = address.getElementsByTagName('state')[0]?.textContent || '';
            const postcode = address.getElementsByTagName('postcode')[0]?.textContent || '';
            const country = address.getElementsByTagName('country')[0]?.textContent || '';
            const country_code = address.getElementsByTagName('country_code')[0]?.textContent || '';



            let html = `
                            <tr>
                                <td>${building}</td>
                                <td>${road}</td>
                                <td>${addressText}</td>
                                <td>${city}</td>
                                <td>${county}</td>
                                <td>${state}</td>
                                <td>${postcode}</td>
                                <td>${county}</td>
                            </tr>
                        `;

            table.innerHTML = html;
        })
        .catch(error => console.error(error));

}

btn.addEventListener("click", buscarPuntos);