class Project extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor() {
        super('project')
        this.fields = this.fields.concat([
            'name',
            'uniquecode',
            'budget'
            
        ])
    }
  }