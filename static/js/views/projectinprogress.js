'use strict'

const projectinprogressModel = new ProjectInProgress() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#projectinprogress-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const projectinprogressData = {}
    formData.forEach((value, key) => {
      projectinprogressData[key] = value
    })
    
    const existingProjectinprogress = projectinprogressModel.Select().find(projectinprogress => projectinprogress.code === projectinprogressData.code)
    // if (existingProject) {
    //   alert('Code already exists!')
    //   return
    // }

    projectinprogressModel.Create(projectinprogressData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#projectinprogress-list').DataTable({
    data: projectinprogressModel.Select(),
    columns: [
      { title: 'Project', data: 'project' },
      { title: 'Performer', data: 'performer' },
      { title: 'StartTime', data: 'starttime' },
      { title: 'EndTime', data: 'endtime' },
      {
        title: 'Action',
        data: null,
        orderable: false,
        searchable: false,
        render: function (data, type, row, meta) {
          const editButton = '<button type="button" class="btn btn-primary btn-sm edit-projectinprogress" data-id="' + row.id + '">Edit</button>';
          const deleteButton = '<button type="button" class="btn btn-danger btn-sm delete-projectinprogress" data-id="' + row.id + '">Delete</button>';
          return editButton + '&nbsp;&nbsp;' + deleteButton;
        }
      }
    ]
  })
}

function initListEvents () {
  window.jQuery('#projectinprogress-list').on('click', '.delete-projectinprogress', function (e) {
    const projectinprogressId = window.jQuery(this).data('id')
    projectinprogressModel.Delete(projectinprogressId)
  })
  
  window.jQuery('#projectinprogress-list').on('click', '.edit-projectinprogress', function (e) {
    const projectinprogressId = window.jQuery(this).data('id')
    const projectinprogress = projectinprogressModel.FindById(projectinprogressId)

    if (project) {
      const project =  window.prompt('Enter a new project', projectinprogress.project)
      const performer = window.prompt('Enter a new performer', projectinprogress.performer)
      const starttime = window.prompt('Enter a new start time', projectinprogress.starttime)
      const endtime = window.prompt('Enter a new end time', projectinprogress.endtime)
      if (project !== null && performer !== null && starttime !== null && endtime !== null) {
      projectinprogressModel.Update(projectinprogressId, { project: project, performer: performer, starttime: starttime, endtime: endtime })}
    }
  })

  document.addEventListener('projectinprogressListDataChanged', function (e) {
    const dataTable = window.jQuery('#projectinprogress-list').DataTable()

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
