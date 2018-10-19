export default (hash)=>{
    let openKey = ['/'+hash.split('/')[1]];
    let keyList = hash.split('/');
        keyList.pop();
    let selectedKeys = keyList.join('/') ? keyList.join('/') : '/';
    // selectedKeys = [hash];
    return [openKey,[selectedKeys]]
}