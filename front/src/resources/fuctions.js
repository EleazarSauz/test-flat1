
export const getListRepo = async () => {
    
    var getData = await fetch('http://54.88.171.247/gitpy/repo/')
    
    var parseData = await getData.json()
    console.log('getRepo', parseData)

    return parseData
}

export const postRepoToApi = async (name, owner, description="", in_github=true) => {

    var options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            owner,
            description,
            in_github
        })
    }

    var getData = await fetch('http://54.88.171.247/gitpy/repo/', options)
    
    var parseData = await getData.json()
    console.log('getRepo', parseData)

    return parseData
}

export const getListPullReuqest = async (idRepo) => {

    var getData = await fetch('http://54.88.171.247/gitpy/PRsOfRepo/' + idRepo)
    
    var parseData = await getData.json()
    console.log('getListPullReuqest', parseData)

    return parseData
    
}

export const postPullReuqest = async (objPullRequest) => {
    var options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objPullRequest)
    }

    var getData = await fetch('http://54.88.171.247/gitpy/PRsOfRepo/1/', options)
    
    var parseData = await getData.json()
    console.log('postPullReuqest', parseData)

    return parseData
    
}