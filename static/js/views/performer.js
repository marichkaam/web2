'use strict'

const performerModel = new Performer() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#performer-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const performerData = {}
    formData.forEach((value, key) => {
        performerData[key] = value
    })
    
    const existingPerformer = performerModel.Select().find(performer => performer.code === performer.code)
    // if (existingProject) {
    //   alert('Code already exists!')
    //   return
    // }

    performerModel.Create(performerData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#performer-list').DataTable({
    data: performerModel.Select(),
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
          const editButton = '<button type="button" class="btn btn-primary btn-sm edit-performer" data-id="' + row.id + '">Edit</button>';
          const deleteButton = '<button type="button" class="btn btn-danger btn-sm delete-performer" data-id="' + row.id + '">Delete</button>';
          return editButton + '&nbsp;&nbsp;' + deleteButton;
        }
      }
    ]
  })
}

function initListEvents () {
    window.jQuery('#performer-list').on('click', '.delete-performer', function (e) {
      const performerId = window.jQuery(this).data('id')
      performerModel.Delete(performerId)
    })
    
    window.jQuery('#performer-list').on('click', '.edit-performer', function (e) {
      const performerId = window.jQuery(this).data('id')
      const performer = performerModel.FindById(performerId)
  
      if (performer) {
        const name = window.prompt('Enter a new name', performer.name)
        const uniquecode = window.prompt('Enter a new uniquecode', performer.uniquecode)
        const budget = window.prompt('Enter a new budget', performer.budget)
        if (name !== null && uniquecode !== null && budget !== null) {
        performerModel.Update(performerId, { name: name, uniquecode: uniquecode, budget: budget })}
      }
    })
  
    document.addEventListener('performerListDataChanged', function (e) {
      const dataTable = window.jQuery('#performer-list').DataTable()
  
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
