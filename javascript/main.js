import CoronaData from './data/CoronaData.js';
import './component/LocationTable.js';
import '../libraries/jquery/jquery.min.js'
import '../libraries/chart.js/Chart.min.js';
import '../libraries/lottie-web/lottie.min.js';

registerServiceWorker();
$(document).ready(main);

function registerServiceWorker() {
    if("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
           navigator.serviceWorker.register("../service-worker.js")
           .then(function() {
               console.log("Service Worker sucessfuly registered");
           })
           .catch(function() {
               console.log("Failed to register service worker");
           });
        });
    }
    else
        console.log("This browser doesn't support service worker");
}

function main() {
    const coronaData = new CoronaData();
    const ctx = document.getElementById('coronaChart').getContext('2d');
    const ctx2 = document.getElementById('coronaChartIndonesia').getContext('2d');
    const coronaChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Positif', 'Sembuh', 'Meninggal'],
            datasets: [{
                label: 'Corona ',
                data: [1, 1, 1],
                backgroundColor: [
                    '#ff0d00',
                    '#0095ff',
                    '#ffa000',
                ],
                borderColor: [
                    'white',
                    'white',
                    'white'
                ],
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true
        }
    });
    const coronaChartIndonesia = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Positif', 'Sembuh', 'Meninggal'],
            datasets: [{
                label: 'Indonesi Coronavirus Statistic',
                data: [],
                backgroundColor: '#0069ff',
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            maintainAspectRatio: false,
            responsive: true
        }
    });
    const corePage = document.querySelector('#core-page');
    const loadingContainer = document.querySelector("#loading-container");
    const indonesiaProvinceTabel = document.querySelector("#indonesia-province-table");
    const worldCountryTabel = document.querySelector("#world-country-table");
    let coronaStatisticInformationScroll;
    const coronaStatisticTitle = document.querySelector('#title-statistic');
    const btnSwitch = document.getElementsByClassName("btn-switch");

    const renderData = () => {
        //Fill World Corona Value
        const worldCoronaData = [
                        coronaData.worldData[0].value,
                        coronaData.worldData[1].value,
                        coronaData.worldData[2].value
                    ];
        const indonesiaProvinceData = coronaData.indonesiaProvinceData;

        $('.keterangan-statistic .data-value').eq(0).text(worldCoronaData[0].replace(/\,/g,'.'));
        $('.keterangan-statistic .data-value').eq(1).text(worldCoronaData[1].replace(/\,/g,'.'));
        $('.keterangan-statistic .data-value').eq(2).text(worldCoronaData[2].replace(/\,/g,'.'));

        //Fill Indonesia statistic table
        coronaChart.data.datasets[0].data = [
            coronaData.worldData[0].value.replace(/\,/g,''),
            coronaData.worldData[1].value.replace(/\,/g,''),
            coronaData.worldData[2].value.replace(/\,/g,'')
        ];
        coronaChart.update();

        const listprovinsi = [];
        const listvalueprovinsi = [];
        indonesiaProvinceData.forEach(object => {
            listprovinsi.push(object.attributes.Provinsi);
            listvalueprovinsi.push(object.attributes.Kasus_Posi);
        });

        coronaChartIndonesia.data.labels = listprovinsi;
        coronaChartIndonesia.data.datasets[0].data = listvalueprovinsi;
        coronaChartIndonesia.update();

        //Fill Indonesia Province Tabel
        const tableProvinceHead = ['No', 'Provinsi', 'Action'];
        const tableProvinceBody = [];
        for(let i = 0;i<coronaData.indonesiaProvinceData.length;i++) {
            const array = [];

            array.push(i+1);
            array.push(coronaData.indonesiaProvinceData[i].attributes.Provinsi);
            array.push(`<button class="btn btn-sm btn-primary" value="${coronaData.indonesiaProvinceData[i].attributes.Kode_Provi}"><i class="fa fa-search-plus"></i> Detail</button>`);

            tableProvinceBody.push(array);
        }
        indonesiaProvinceTabel.setdata(tableProvinceHead, tableProvinceBody);

        //Fill World Corona Table
        const tableWorldHead = ['No', 'Negara', 'Action'];
        const tableWorldeBody = [];
        for(let i = 0;i<coronaData.worldCountryData.length;i++) {
            const array = [];

            array.push(i+1);
            array.push(coronaData.worldCountryData[i].attributes.Country_Region);
            array.push(`<button value="${coronaData.worldCountryData[i].attributes.OBJECTID}" class="btn btn-sm btn-primary"><i class="fa fa-search-plus"></i> Detail</button>`);

            tableWorldeBody.push(array);
        }
        worldCountryTabel.setdata(tableWorldHead, tableWorldeBody);
    }

    const toggleBtnSwitchData = val => {
        if(val == 0) {
            const worldCoronaData = [
                coronaData.worldData[0].value,
                coronaData.worldData[1].value,
                coronaData.worldData[2].value
            ]

            coronaChart.data.datasets[0].data = [
                worldCoronaData[0].replace(/\,/g,''),
                worldCoronaData[1].replace(/\,/g,''),
                worldCoronaData[2].replace(/\,/g,'')
            ];
            coronaChart.update();

            $('.keterangan-statistic .data-value').eq(0).text(worldCoronaData[0].replace(/\,/g,'.'));
            $('.keterangan-statistic .data-value').eq(1).text(worldCoronaData[1].replace(/\,/g,'.'));
            $('.keterangan-statistic .data-value').eq(2).text(worldCoronaData[2].replace(/\,/g,'.'));
            coronaStatisticTitle.innerText = 'World Coronavirus Data';
        }
        else if(val == 1) {
            const indonesiaCoronaData = [
                coronaData.indonesiaData[0].positif,
                coronaData.indonesiaData[0].sembuh,
                coronaData.indonesiaData[0].meninggal
            ]

            coronaChart.data.datasets[0].data = [
                indonesiaCoronaData[0].replace(/\,/g,''),
                indonesiaCoronaData[1].replace(/\,/g,''),
                indonesiaCoronaData[2].replace(/\,/g,'')
            ];
            coronaChart.update();

            $('.keterangan-statistic .data-value').eq(0).text(indonesiaCoronaData[0].replace(/\,/g,'.'));
            $('.keterangan-statistic .data-value').eq(1).text(indonesiaCoronaData[1].replace(/\,/g,'.'));
            $('.keterangan-statistic .data-value').eq(2).text(indonesiaCoronaData[2].replace(/\,/g,'.'));
            coronaStatisticTitle.innerText = 'Indonesia Coronavirus Data';
        }
    }

    const btnListener = () => {
        for(let i = 0;i < btnSwitch.length;i++) {
            btnSwitch[i].addEventListener("click", () => {
                toggleBtnSwitchData(i);
            });
        }

        //Btn Detail Action Listener
        const btnDetailProvince = document.querySelectorAll("#indonesia-province-table .btn");
        const btnDetailCountry = document.querySelectorAll("#world-country-table .btn");

        for(let i = 0;i < btnDetailProvince.length;i++) {
            btnDetailProvince[i].addEventListener("click", () => {
                updateToProvinceValue(btnDetailProvince[i].value);
            });
        }

        for(let i = 0;i < btnDetailCountry.length;i++) {
            btnDetailCountry[i].addEventListener("click", () => {
                updateToCountryValue(btnDetailCountry[i].value);
            });
        }
    }

    const updateToProvinceValue = provinceCode => {
        coronaData.indonesiaProvinceData.forEach(object => {
            if(provinceCode == object.attributes.Kode_Provi) {
                const coronaData = [
                    object.attributes.Kasus_Posi,
                    object.attributes.Kasus_Semb,
                    object.attributes.Kasus_Meni
                ];
                coronaChart.data.datasets[0].data = coronaData;

                $('.keterangan-statistic .data-value').eq(0).text(coronaData[0].toLocaleString("id"));
                $('.keterangan-statistic .data-value').eq(1).text(coronaData[1].toLocaleString("id"));
                $('.keterangan-statistic .data-value').eq(2).text(coronaData[2].toLocaleString("id"));
                coronaStatisticTitle.innerText = object.attributes.Provinsi;

                coronaChart.update();
                window.scroll({
                    top: coronaStatisticInformationScroll,
                    behavior: 'smooth'
                });
            }
        });
    }

    const updateToCountryValue = ObjectCode => {
        coronaData.worldCountryData.forEach(object => {
            if(ObjectCode == object.attributes.OBJECTID) {
                const coronaData = [
                    object.attributes.Confirmed,
                    object.attributes.Recovered,
                    object.attributes.Deaths
                ];
                coronaChart.data.datasets[0].data = coronaData;

                $('.keterangan-statistic .data-value').eq(0).text(coronaData[0].toLocaleString("id"));
                $('.keterangan-statistic .data-value').eq(1).text(coronaData[1].toLocaleString("id"));
                $('.keterangan-statistic .data-value').eq(2).text(coronaData[2].toLocaleString("id"));
                coronaStatisticTitle.innerText = object.attributes.Country_Region;

                coronaChart.update();
                window.scroll({
                    top: coronaStatisticInformationScroll,
                    behavior: 'smooth'
                });
            }
        });
    }

    const searchListener = () => {
        //Search Listener
        const searchProvinceInput = document.querySelector("#indonesia-province-search");
        const searchCountryInput = document.querySelector("#world-country-search");
        const searchProvinceBtn = document.querySelector("#indonesia-province-search + .btn");
        const searchCountryBtn = document.querySelector("#world-country-search + .btn");

        searchProvinceInput.addEventListener('input', event => {
            searchProvince(searchProvinceInput.value);
        });

        searchCountryInput.addEventListener('input', event => {
            searchCountry(searchCountryInput.value);
        });

        searchProvinceBtn.addEventListener('click', () => {
            searchProvince(searchProvinceInput.value);
        });

        searchCountryBtn.addEventListener('click', () => {
            searchCountry(searchCountryInput.value);
        });
    }

    const searchProvince = keyword => {
        const searchData = coronaData.indonesiaProvinceData.filter(object => {
            return object.attributes.Provinsi.toUpperCase().includes(keyword.toUpperCase());
        });

        const tableProvinceHead = ['No', 'Provinsi', 'Action'];
        const tableProvinceBody = [];
        for(let i = 0;i<searchData.length;i++) {
            const array = [];

            array.push(i+1);
            array.push(searchData[i].attributes.Provinsi);
            array.push(`<button class="btn btn-sm btn-primary" value="${searchData[i].attributes.Kode_Provi}"><i class="fa fa-search-plus"></i> Detail</button>`);

            tableProvinceBody.push(array);
        }
        indonesiaProvinceTabel.setdata(tableProvinceHead, tableProvinceBody);
        btnListener();
    }

    const searchCountry = keyword => {
        const searchData = coronaData.worldCountryData.filter(object => {
            return object.attributes.Country_Region.toUpperCase().includes(keyword.toUpperCase());
        });

        const tableWorldHead = ['No', 'Negara', 'Action'];
        const tableWorldeBody = [];
        for(let i = 0;i < searchData.length;i++) {
            const array = [];

            array.push(i+1);
            array.push(searchData[i].attributes.Country_Region);
            array.push(`<button value="${searchData[i].attributes.OBJECTID}" class="btn btn-sm btn-primary"><i class="fa fa-search-plus"></i> Detail</button>`);

            tableWorldeBody.push(array);
        }
        worldCountryTabel.setdata(tableWorldHead, tableWorldeBody);
        btnListener();
    }

    //Show Loading
    loadingContainer.style.display = 'flex';
    corePage.style.display = 'none';

    const loadFromCache = () => {
        caches.match(`https://cors-servza.herokuapp.com/https://api.kawalcorona.com/`).then(function(response) {
            if(response) {
                coronaCacheData().then(cacheData => {
                    coronaData.worldData = [cacheData[0], cacheData[1], cacheData[2]];
                    coronaData.indonesiaData = cacheData[3];
                    coronaData.indonesiaProvinceData = cacheData[4];
                    coronaData.worldCountryData = cacheData[5];

                    //Show Core Page
                    loadingContainer.style.display = 'none';
                    corePage.style.display = 'block';
                    staySaveAnimation.stop();
                    scrollSet();

                    //Render All Component
                    window.scroll(0,0);
                    renderData();
                    btnListener();
                    searchListener();
                });
            }
        });
    }

    //Get data From API
    coronaData.loadData()
        .then(resolve => {
            console.log(resolve);

            //Show Core Page
            loadingContainer.style.display = 'none';
            corePage.style.display = 'block';
            staySaveAnimation.stop();
            scrollSet();

            //Render All Component
            window.scroll(0,0);
            renderData();
            btnListener();
            searchListener();
        })
        .catch(reject => {
            console.log(reject);
            
            if("caches" in window)
                loadFromCache();

            document.querySelector('#loading-container span').style.color = 'red';
            document.querySelector('#loading-container span').innerText = "Network Error :(\nPlease Refresh Page !";
        });

    //Handler scroll when resize screen
    const scrollSet = () => {
        coronaStatisticInformationScroll = (document.querySelector('#top-content').offsetHeight + document.querySelector('#app-information').offsetHeight) - 45;
    }

    window.addEventListener('resize', () => {
        scrollSet();
    });

    const coronaAtkAnimation = bodymovin.loadAnimation({
        container: document.querySelector('#corona-attack'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'lottie/18795-coronavirus.json'
    });

    const staySaveAnimation = bodymovin.loadAnimation({
        container: document.querySelector('#loading-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'lottie/18469-stay-safe.json'
    });
}

function coronaCacheData() {
    return new Promise((resolve, reject) => {
        const baseurl = "https://cors-servza.herokuapp.com/https://api.kawalcorona.com/";
        const urlReq = [
            caches.match(`${baseurl}positif/`),
            caches.match(`${baseurl}sembuh/`),
            caches.match(`${baseurl}meninggal/`),
            caches.match(`${baseurl}indonesia/`),
            caches.match(`${baseurl}indonesia/provinsi/`),
            caches.match(`${baseurl}`),
        ];
    
        Promise.all(urlReq).then(response => {
            const jsonProm = [
                response[0].json(),
                response[1].json(),
                response[2].json(),
                response[3].json(),
                response[4].json(),
                response[5].json(),
            ];
            
            return jsonProm;
        }).then(jsonProm => {
            Promise.all(jsonProm).then(jsonArr => {
                resolve(jsonArr);
            });
        });
    });
}