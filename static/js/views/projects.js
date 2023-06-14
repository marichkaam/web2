'use strict'

const projectModel = new Project() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#project-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const projectData = {}
    formData.forEach((value, key) => {
      projectData[key] = value
    })
    
    const existingProject = projectModel.Select().find(project => project.code === projectData.code)
    // if (existingProject) {
    //   alert('Code already exists!')
    //   return
    // }

    projectModel.Create(projectData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#project-list').DataTable({
    data: projectModel.Select(),
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
          const editButton = '<button type="button" class="btn btn-primary btn-sm edit-project" data-id="' + row.id + '">Edit</button>';
          const deleteButton = '<button type="button" class="btn btn-danger btn-sm delete-project" data-id="' + row.id + '">Delete</button>';
          return editButton + '&nbsp;&nbsp;' + deleteButton;
        }
      }
    ]
  })
}

function initListEvents () {
  window.jQuery('#project-list').on('click', '.delete-project', function (e) {
    const projectId = window.jQuery(this).data('id')
    projectModel.Delete(projectId)
  })
  
  window.jQuery('#project-list').on('click', '.edit-project', function (e) {
    const projectId = window.jQuery(this).data('id')
    const project = projectModel.FindById(projectId)

    if (project) {
      const name = window.prompt('Enter a new name', project.name)
      const uniquecode = window.prompt('Enter a new uniquecode', project.uniquecode)
      const budget = window.prompt('Enter a new budget', project.budget)
      if (name !== null && uniquecode !== null && budget !== null) {
      projectModel.Update(projectId, { name: name, uniquecode: uniquecode, budget: budget })}
    }
  })

  document.addEventListener('projectListDataChanged', function (e) {
    const dataTable = window.jQuery('#project-list').DataTable()

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
