class Сustomer extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor() {
        super('customer')
        this.fields = this.fields.concat([
            'name',
            'uniquecode',
            'budget'

        ])
    }
  }
