class Performer extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor() {
        super('performer')
        this.fields = this.fields.concat([
            'name',
            'uniquecode',
            'budget'
        ])
    }
  }