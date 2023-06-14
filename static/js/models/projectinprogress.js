class ProjectInProgress extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
            constructor() {
        super('projectinprogress')
        this.fields = this.fields.concat([
            'project',
            'performer',
            'starttime',
            'endtime'
        ])
    }
  }