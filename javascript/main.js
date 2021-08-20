/* eslint-disable no-undef */
import CoronaData from './data/ApiData.js'
import ApiCacheData from './data/ApiCacheData.js'
import registerServiceWorker from './worker/register-sw.js'
import { Chart, ArcElement, BarElement, BarController, DoughnutController, LinearScale, CategoryScale } from 'chart.js'
import Lottie from 'lottie-web'
import loadingAnimation from '../lottie/18469-stay-safe.json'
import coronaAttackAnimation from '../lottie/18795-coronavirus.json'
import './components/LocationTable.js'
import style from '../css/style.css'

style.use()
Chart.register(
  ArcElement,
  BarElement,
  BarController,
  DoughnutController,
  LinearScale,
  CategoryScale
)

// Start application
document.addEventListener('DOMContentLoaded', main)

const ctx = document.getElementById('coronaChart').getContext('2d')
const ctx2 = document.getElementById('coronaChartIndonesia').getContext('2d')
const doughnutCasesChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Positif', 'Sembuh', 'Meninggal'],
    datasets: [{
      label: 'Corona ',
      data: [1, 1, 1],
      backgroundColor: [
        '#ff0d00',
        '#0095ff',
        '#ffa000'
      ],
      borderColor: [
        'white',
        'white',
        'white'
      ]
    }]
  },
  options: {
    maintainAspectRatio: false,
    responsive: true
  }
})
const barChartIndonesiaProvince = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Positif', 'Sembuh', 'Meninggal'],
    datasets: [{
      label: 'Jumlah kasus',
      data: [],
      backgroundColor: '#0069ff'
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
})

/**
 * Main of code
 */
function main () {
  const corePage = document.querySelector('#core-page')
  const loadingContainer = document.querySelector('#loading-container')

  /**
   * Show core page to screen
   */
  const showCorePage = () => {
    Lottie.loadAnimation({
      container: document.querySelector('#corona-attack'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: coronaAttackAnimation
    })

    window.scroll(0, 0)
    loadingContainer.style.display = 'none'
    corePage.style.display = 'block'
  }

  /**
   * Show loading animation to screen
   */
  const showLoadingAnimation = () => {
    Lottie.loadAnimation({
      container: document.querySelector('#loading-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingAnimation
    })

    loadingContainer.style.display = 'flex'
    corePage.style.display = 'none'
  }

  /**
   * Show error message on loading animation
   */
  const showErrorLoadingMessage = () => {
    loadingContainer.querySelector('span').style.color = 'red'
    loadingContainer.querySelector('span').innerText = 'Network Error :(\nPlease Refresh Page !'
  }

  /**
   * Start render application to screen
   * @param {CoronaData} coronaData
   */
  const startRender = (coronaData) => {
    showCorePage()
    renderData(coronaData)
  }

  /**
   * Render application with cache data
   * @async
   * @param {CoronaData} coronaData
   */
  const loadCacheData = async (coronaData) => {
    try {
      const cacheData = await ApiCacheData()
      coronaData.worldData = [cacheData[0], cacheData[1], cacheData[2]]
      coronaData.indonesiaData = cacheData[3]
      coronaData.indonesiaProvinceData = cacheData[4]
      coronaData.worldCountryData = cacheData[5]
      startRender(coronaData)
    } catch (error) {
      showErrorLoadingMessage()
    }
  }

  /**
   * Render application with api data
   * @async
   * @param {CoronaData} coronaData
   */
  const loadApiData = async (coronaData) => {
    /**
     * Handle when fetch api error
     */
    const handleError = () => {
      if ('caches' in window) {
        loadCacheData(coronaData)
      } else {
        showErrorLoadingMessage()
      }
    }

    try {
      await coronaData.loadData()
      startRender(coronaData)
    } catch (error) {
      handleError()
    }
  }

  const coronaData = new CoronaData()
  registerServiceWorker()
  showLoadingAnimation()
  loadApiData(coronaData)
}

/**
 * Render data to elements
 * @param {CoronaData} coronaData
 */
const renderData = (coronaData) => {
  const worldCoronaData = [
    String(coronaData.worldData[0].value),
    String(coronaData.worldData[1].value),
    String(coronaData.worldData[2].value)
  ]
  const indonesiaProvinceData = coronaData.indonesiaProvinceData

  renderCasesChart(
    worldCoronaData[0].replace(/,/g, ''),
    worldCoronaData[1].replace(/,/g, ''),
    worldCoronaData[2].replace(/,/g, '')
  )
  renderCasesAmmountInformation(
    worldCoronaData[0].replace(/,/g, '.'),
    (String(worldCoronaData[1]) !== '0') ? worldCoronaData[1].replace(/,/g, '.') : '-',
    worldCoronaData[2].replace(/,/g, '.')
  )
  renderButtonSwitchCaseInformation(coronaData)
  renderIndonesiaProvinceChart(indonesiaProvinceData)
  renderIndonesiaProvinceTable(indonesiaProvinceData)
  addIndonesiaProvinceTableSearchListener(coronaData)
  renderWorldTable(coronaData.worldCountryData)
  addWorldTableSearchListener(coronaData)
}

/**
 * Render doughnut chart coronavirus cases
 * @param {String|Number} positive
 * @param {String|Number} recovered
 * @param {String|Number} death
 */
function renderCasesChart (positive, recovered, death) {
  doughnutCasesChart.data.datasets[0].data = [
    positive,
    recovered,
    death
  ]

  doughnutCasesChart.update()
}

/**
 * Render bar chart Indonesia province coronavirus cases statistic
 * @param {Array} indonesiaProvinceData
 */
function renderIndonesiaProvinceChart (indonesiaProvinceData) {
  const listprovinsi = []
  const listvalueprovinsi = []
  indonesiaProvinceData.forEach(object => {
    listprovinsi.push(object.attributes.Provinsi)
    listvalueprovinsi.push(object.attributes.Kasus_Posi)
  })

  barChartIndonesiaProvince.data.labels = listprovinsi
  barChartIndonesiaProvince.data.datasets[0].data = listvalueprovinsi
  barChartIndonesiaProvince.update()
}

/**
 * Render coronavirus cases positive, recovered, deatch ammount
 * @param {String|Number} positive
 * @param {String|Number} recovered
 * @param {String|Number} death
 */
function renderCasesAmmountInformation (positive, recovered, death) {
  const positiveInformation = document.querySelector('.keterangan-statistic:nth-child(1) .data-value')
  const recoveredInformation = document.querySelector('.keterangan-statistic:nth-child(2) .data-value')
  const deathInformation = document.querySelector('.keterangan-statistic:nth-child(3) .data-value')

  positiveInformation.innerText = positive
  recoveredInformation.innerText = recovered
  deathInformation.innerText = death
}

/**
 * Render Indonesia province coronavirus cases table
 * @param {Array} indonesiaProvinceData
 */
function renderIndonesiaProvinceTable (indonesiaProvinceData) {
  const indonesiaProvinceTable = document.querySelector('#indonesia-province-table')

  /**
   * Updating table value
   */
  const updateTable = () => {
    const tableProvinceHead = ['No', 'Provinsi', 'Action']
    const tableProvinceBody = []
    for (let i = 0; i < indonesiaProvinceData.length; i++) {
      const data = indonesiaProvinceData[i]
      const array = []

      array.push(i + 1)
      array.push(data.attributes.Provinsi)
      array.push(`<button class="btn btn-sm btn-primary" value="${data.attributes.Kode_Provi}"><i class="fa fa-search-plus"></i> Detail</button>`)

      tableProvinceBody.push(array)
    }

    indonesiaProvinceTable.setdata(tableProvinceHead, tableProvinceBody)
  }

  /**
   * Find province value by provinceCode
   * @param {Number} provinceCode
   * @return {Object}
   */
  const getProvinceValue = (provinceCode) => {
    return indonesiaProvinceData.find(province => (provinceCode === province.attributes.Kode_Provi))
  }

  /**
   * Adding click listener on detail button to set information cases
   */
  const addButtonDetailListener = () => {
    const buttonsDetailProvince = indonesiaProvinceTable.querySelectorAll('.btn')
    for (let i = 0; i < buttonsDetailProvince.length; i++) {
      const button = buttonsDetailProvince[i]
      button.onclick = () => {
        const provinceName = indonesiaProvinceData[i].attributes.Provinsi
        const provinceCode = indonesiaProvinceData[i].attributes.Kode_Provi
        const provinceData = getProvinceValue(provinceCode)
        const casesData = [
          String(provinceData.attributes.Kasus_Posi),
          String(provinceData.attributes.Kasus_Semb),
          String(provinceData.attributes.Kasus_Meni)
        ]
        renderCasesChart(
          casesData[0],
          casesData[1],
          casesData[2]
        )
        renderCasesAmmountInformation(
          numberWithIndonesianCommas(casesData[0]),
          numberWithIndonesianCommas(casesData[1]),
          numberWithIndonesianCommas(casesData[2])
        )
        updateCaseInformationTitle(provinceName)
        performScrollToInformationElement()
      }
    }
  }

  updateTable()
  addButtonDetailListener()
}

/**
 * Adding search listener for Indonesia Province table
 * @param {CoronaData} coronaData
 */
function addIndonesiaProvinceTableSearchListener (coronaData) {
  const searchProvinceInput = document.querySelector('#indonesia-province-search')

  /**
   * Search province data
   * @param {String} keyword
   * @returns {Array}
   */
  const searchProvinceValue = (keyword) => {
    return coronaData.indonesiaProvinceData.filter(
      object => object.attributes.Provinsi.toUpperCase().includes(keyword.toUpperCase())
    )
  }

  searchProvinceInput.oninput = () => {
    const keyword = searchProvinceInput.value
    renderIndonesiaProvinceTable(searchProvinceValue(keyword))
  }
}

/**
 * Render world coronavirus cases table
 * @param {Array} worldCountryData
 */
function renderWorldTable (worldCountryData) {
  const worldCountryTable = document.querySelector('#world-country-table')

  /**
   * Updating table value
   */
  const updateTable = () => {
    const tableWorldHead = ['No', 'Negara', 'Action']
    const tableWorldeBody = []

    for (let i = 0; i < worldCountryData.length; i++) {
      const data = worldCountryData[i]
      const array = []

      array.push(i + 1)
      array.push(data.attributes.Country_Region)
      array.push(`<button value="${data.attributes.OBJECTID}" class="btn btn-sm btn-primary"><i class="fa fa-search-plus"></i> Detail</button>`)

      tableWorldeBody.push(array)
    }

    worldCountryTable.setdata(tableWorldHead, tableWorldeBody)
  }

  /**
   * Get country data by countryId
   * @param {Number} countryId
   * @return {Object}
   */
  const getCountryValue = (countryId) => {
    return worldCountryData.find(country => (countryId === country.attributes.OBJECTID))
  }

  /**
   * Adding click listener on detail button to set information cases
   */
  const addButtonDetailListener = () => {
    const buttonsDetailCountry = worldCountryTable.querySelectorAll('.btn')
    for (let i = 0; i < buttonsDetailCountry.length; i++) {
      const button = buttonsDetailCountry[i]
      button.onclick = () => {
        const countryName = worldCountryData[i].attributes.Country_Region
        const countryId = worldCountryData[i].attributes.OBJECTID
        const countryData = getCountryValue(countryId)
        const casesData = [
          String(countryData.attributes.Confirmed),
          String(countryData.attributes.Recovered),
          String(countryData.attributes.Deaths)
        ]

        renderCasesChart(
          casesData[0],
          casesData[1],
          casesData[2]
        )
        renderCasesAmmountInformation(
          numberWithIndonesianCommas(casesData[0]),
          (casesData[1] !== 'null') ? numberWithIndonesianCommas(casesData[1]) : '-',
          numberWithIndonesianCommas(casesData[2])
        )
        updateCaseInformationTitle(countryName)
        performScrollToInformationElement()
      }
    }
  }

  updateTable()
  addButtonDetailListener()
}

/**
 * Adding search listener for World table
 * @param {CoronaData} coronaData
 */
function addWorldTableSearchListener (coronaData) {
  const searchCountryInput = document.querySelector('#world-country-search')

  /**
   * Search country data
   * @param {String} keyword
   * @returns {Array}
   */
  const searchCountry = (keyword) => {
    return coronaData.worldCountryData.filter(
      object => object.attributes.Country_Region.toUpperCase().includes(keyword.toUpperCase())
    )
  }

  searchCountryInput.oninput = () => {
    const keyword = searchCountryInput.value
    renderWorldTable(searchCountry(keyword))
  }
}

/**
 * Switch button to display data between World and Indonesia coronavirus cases
 * @param {CoronaData} coronaData
 */
function renderButtonSwitchCaseInformation (coronaData) {
  const btnSwitch = document.getElementsByClassName('btn-switch')

  /**
   * Switch listener to change between world and indonesia data
   * @param {Number} val 0 (World) or 1 (Indonesia)
   */
  const toggleBtnSwitchData = (val) => {
    if (val === 0) {
      const worldCoronaData = [
        String(coronaData.worldData[0].value),
        String(coronaData.worldData[1].value),
        String(coronaData.worldData[2].value)
      ]

      renderCasesChart(
        worldCoronaData[0].replace(/,/g, ''),
        worldCoronaData[1].replace(/,/g, ''),
        worldCoronaData[2].replace(/,/g, '')
      )
      renderCasesAmmountInformation(
        worldCoronaData[0].replace(/,/g, '.'),
        (String(worldCoronaData[1]) !== '0') ? worldCoronaData[1].replace(/,/g, '.') : '-',
        worldCoronaData[2].replace(/,/g, '.')
      )

      updateCaseInformationTitle('World Coronavirus Data')
    } else if (val === 1) {
      const indonesiaCoronaData = [
        String(coronaData.indonesiaData[0].positif),
        String(coronaData.indonesiaData[0].sembuh),
        String(coronaData.indonesiaData[0].meninggal)
      ]

      renderCasesChart(
        indonesiaCoronaData[0].replace(/,/g, ''),
        indonesiaCoronaData[1].replace(/,/g, ''),
        indonesiaCoronaData[2].replace(/,/g, '')
      )
      renderCasesAmmountInformation(
        indonesiaCoronaData[0].replace(/,/g, '.'),
        indonesiaCoronaData[1].replace(/,/g, '.'),
        indonesiaCoronaData[2].replace(/,/g, '.')
      )

      updateCaseInformationTitle('Indonesia Coronavirus Data')
    }
  }

  for (let i = 0; i < btnSwitch.length; i++) {
    btnSwitch[i].addEventListener('click', () => {
      toggleBtnSwitchData(i)
    })
  }
}

/**
 * Update #title-statistic element text
 * @param {string} title
 */
function updateCaseInformationTitle (title) {
  const coronaStatisticTitle = document.querySelector('#title-statistic')
  coronaStatisticTitle.innerText = title
}

/**
 * Perform scroll to coronavirus information element
 */
function performScrollToInformationElement () {
  /**
   * Get #app-information element top scroll location
   * @return {Number}
   */
  const getTopContentOffset = () => {
    const topContentOffsetHeight = document.querySelector('#top-content').offsetHeight
    const appInformationOffsetHeight = document.querySelector('#app-information').offsetHeight
    return (topContentOffsetHeight + appInformationOffsetHeight) - 45
  }

  window.scroll({
    top: getTopContentOffset(),
    behavior: 'smooth'
  })
}

/**
 * Convert string number to indonesian coma separator
 * @param {String} string
 * @return {String}
 */
function numberWithIndonesianCommas (string) {
  return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
