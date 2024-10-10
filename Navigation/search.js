function GetSearchItem(Title, Content, SearchValue, MatchIndex){
    let Middle = 80;

    Content = MatchIndex > Middle 
                ? '...' + Content.substring(MatchIndex - Middle, MatchIndex + Middle) + '...'
                : Content = Content.substring(0, Middle * 2) + '...';

    Content = Content.replace(new RegExp(SearchValue, 'gi'), '<mark>$&</mark>');
    return `<div class="NavLgSearchItem">
                <p class="NavLgSearchTitle">${Title}</p>
                <div class="NavLgSearchContent">
                    <svg class="NavLgSearchContent-Icon" width="25" height="25" viewBox="0 0 20 20"><path d="M17 5H3h14zm0 5H3h14zm0 5H3h14z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linejoin="round"></path></svg>
                    <p class="NavLgSearchContent-Desc">${Content}</p>
                </div>
            </div>`;
} 

document.getElementById('NavLgSearch').style.display = "none";

fetch('https://dummyjson.com/posts')
.then(res => res.json())
.then(response => {

    document.getElementById('NavLgSearch').style.display = "block";
    const searchInput = document.getElementById('NavLgSearchFormInput');
    searchInput.addEventListener("keyup", () => {

        let NavLgSearchResult = document.getElementById('NavLgSearchResult');
        let SearchValue = searchInput.value;

        if( SearchValue == '' ){
            NavLgSearchResult.innerHTML = `<p class="NavLgSearchResult-No">No recent searches</p>`;
            return;
        }

        NavLgSearchResult.innerHTML = '';
        response.posts.forEach(Item => {
            let Title = Item.title; let Content = Item.body;
            if( Content.toUpperCase().indexOf(SearchValue.toUpperCase()) != -1 ){
                let MatchIndex = Content.indexOf(SearchValue);
                NavLgSearchResult.innerHTML += GetSearchItem(Title, Content, SearchValue, MatchIndex);
            }
        });

    });

});
