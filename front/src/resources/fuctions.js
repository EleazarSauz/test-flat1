const URI = 'http://54.88.171.247/api/v1/'

export const getListRepoApi = async () => {
    try {
        var getData = await fetch(URI+'repo/')
        var parseData = await getData.json()
        if (getData.status === 400) {
            throw parseData;
        }
    
        return parseData
    } catch (error) {
        console.error('getListRepoApi', error)
        throw error;
    }
}

export const postRepoToApi = async (name, owner, description="", in_github=true) => {
    try {
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
        var getData = await fetch(URI+'repo/', options)
        var parseData = await getData.json()
        if (getData.status === 400) {
            throw parseData;
        }
    
        return parseData
    } catch (error) {
        console.error('postRepoToApi', error)
        throw error;
    }
}

export const getRepoGitpy = async (id) => {
    try {
        var getDataRepo = await fetch(URI+'repoDetails/'+id)
        var parseData = await getDataRepo.json()
        var getDataGit = await fetch(URI + 'repoInfoGit/' + parseData.id_repo)
        var parseDataGit = await getDataGit.json()
        
        if (getDataGit.status === 404 ) {
            throw parseDataGit;
        }
        
        parseData.git = parseDataGit   
        return parseData
    } catch (error) {
        console.error('getRepoGitpy', error)
        throw error;
    }
}

export const getListPullRequest = async (id) => {
    try {
        var getData = await fetch(URI+'listPullRequest/' + id)
        var parseData = await getData.json()
        if (getData.status === 400) {
            throw parseData;
        }
    
        return parseData
    } catch (error) {
        console.error('listPullRequest ', error)
        throw error;
    }
}

export const postPullRequest = async (objPullRequest) => {
    try {
        var options = {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(objPullRequest)
        }
        var getData = await fetch(URI+'newPullRequest/', options)
        var parseData = await getData.json()
        if (getData.status === 500) {
            throw parseData;
        }
    
        return parseData
    } catch (error) {
        console.error('newPullRequest ', error)
        throw error;
    }
}

export const editPullRequest = async (objPullRequest, id) => {
    try {
        var options = {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(objPullRequest)
        }
        var getData = await fetch(URI+'updatePullRequest/' + id, options)
        var parseData = await getData.json()
        if (getData.status === 400) {
            throw parseData;
        }
    
        return parseData
    } catch (error) {
        console.error('newPullRequest ', error)
        throw error;
    }
}
