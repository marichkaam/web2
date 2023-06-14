'use strict'

const customerModel = new Customer() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#customer-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const customerData = {}
    formData.forEach((value, key) => {
      customerData[key] = value
    })
    
    const existingCustomer = customerModel.Select().find(customer => customer.code === customerData.code)
    if (existingCustomer) {
      alert('Code already exists!')
      return
    }

    customerModel.Create(customerData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#customer-list').DataTable({
    data: customerModel.Select(),
    columns: [
      { title: 'Name', data: 'name' },
      { title: 'Uniquecode', data: 'uniquecode' },
      { title: 'Budget', data: 'budget' },
      {
        title: 'Action',
        data: null,
        orderable: false,
        searchable: false,
        render: function (data, type, row, meta) {
          const editButton = '<button type="button" class="btn btn-primary btn-sm edit-customer" data-id="' + row.id + '">Edit</button>';
          const deleteButton = '<button type="button" class="btn btn-danger btn-sm delete-customer" data-id="' + row.id + '">Delete</button>';
          return editButton + '&nbsp;&nbsp;' + deleteButton;
        }
      }
    ]
  })
}

function initListEvents () {
  window.jQuery('#customer-list').on('click', '.delete-customer', function (e) {
    const customerId = window.jQuery(this).data('id')
    customerModel.Delete(customerId)
  })
  
  window.jQuery('#customer-list').on('click', '.edit-customer', function (e) {
    const customerId = window.jQuery(this).data('id')
    const customer = customerModel.FindById(customerId)

    if (customer) {
      const code = window.prompt('Enter a new name', customer.name)
      const name = window.prompt('Enter a new uniqcode', customer.uniquecode)
      const country = window.prompt('Enter a new budget', customer.budget)

      if (name !== null && uniquecode !== null && budget !== null) {
        const existingCustomer = customerModel.Select().find(p => p.code === code && p.id !== customerId)
        if (existingCustomer) {
          window.alert(`Name '${name}' already exists. Please enter a different name.`)
        } else {
          customerModel.Update(customerId, { name: name, uniquecode: uniquecode, budget: budget })
        }
      }
    }
  })

  document.addEventListener('customerListDataChanged', function (e) {
    const dataTable = window.jQuery('#customer-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
