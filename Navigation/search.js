function GetSearchItem(Title, Content, SearchValue, MatchIndex){
    let Middle = 80;
    
    if( MatchIndex > Middle ){
        Content = '...' + Content.substring(MatchIndex - Middle, MatchIndex + Middle) + '...';
    }else{
        Content = Content.substring(0, Middle * 2) + '...';
    }

    Content = Content.replace(new RegExp(SearchValue, 'gi'), '<mark>$&</mark>');
    return `<div class="NavSearchItem">
                <p class="NavSearchTitle">${Title}</p>
                <div class="NavSearchContent">
                    <svg class="NavSearchContent-Icon" width="25" height="25" viewBox="0 0 20 20"><path d="M17 5H3h14zm0 5H3h14zm0 5H3h14z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linejoin="round"></path></svg>
                    <p class="NavSearchContent-Desc">${Content}</p>
                </div>
            </div>`;
} 

document.getElementById('NavSearch').style.display = "none";

fetch('https://dummyjson.com/posts')
.then(res => res.json())
.then(response => {

    document.getElementById('NavSearch').style.display = "block";
    const searchInput = document.getElementById('NavSearchFormInput');
    searchInput.addEventListener("keyup", () => {
        let NavSearchResult = document.getElementById('NavSearchResult');
        let SearchValue = searchInput.value;

        if( SearchValue == '' ){
            NavSearchResult.innerHTML = `<p class="NavSearchResult-No">No recent searches</p>`;
            return;
        }

        NavSearchResult.innerHTML = '';
        response.posts.forEach(Item => {
            let Title = Item.title; let Content = Item.body;
            if( Content.toUpperCase().indexOf(SearchValue.toUpperCase()) != -1 ){
                let MatchIndex = Content.indexOf(SearchValue);
                NavSearchResult.innerHTML += GetSearchItem(Title, Content, SearchValue, MatchIndex);
            }
        });

    });

});
