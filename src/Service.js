

function store(){


    this.setRefrence = (ref) => {
    console.log("====ref===",ref)

    setTimeout(() => {
        ref.props = {name:'warish'};
        console.log("===set==",ref.props,ref)
        ref.forceUpdate()
    },5000)
    }
}

export default new store()