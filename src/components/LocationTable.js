class LocationTable extends HTMLElement {
  setdata (headValue, itemValue) {
    this.innerHTML = ''
    this._headValue = headValue
    this._itemValue = itemValue
    this.render()
  }

  render () {
    const tableElement = document.createElement('table')
    const tableHead = document.createElement('thead')
    const tableBody = document.createElement('tbody')

    // Add Table Element Bootstrap Class
    this.classList.add('table-responsive')
    tableElement.classList.add('table')

    // Fill Table Head Value
    this._headValue.forEach(headItem => {
      const itemElement = document.createElement('th')

      itemElement.innerHTML = `${headItem}`
      tableHead.appendChild(itemElement)
    })

    // Fill Table Body Value
    this._itemValue.forEach(bodyItem => {
      const rowElement = document.createElement('tr')

      bodyItem.forEach(columnItem => {
        const columnElement = document.createElement('td')
        columnElement.innerHTML = columnItem
        rowElement.appendChild(columnElement)
      })

      tableBody.appendChild(rowElement)
    })

    this.appendChild(tableElement)
    tableElement.appendChild(tableHead)
    tableElement.appendChild(tableBody)
  }

  attributeChangedCallback (name, oldValue, NewValue) {
    this[name] = NewValue
  }
}

customElements.define('location-table', LocationTable)
