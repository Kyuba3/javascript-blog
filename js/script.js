{
  ('use strict');

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const linkAtribiute = clickedElement.getAttribute('href');
    console.log(linkAtribiute);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(linkAtribiute);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('Adding class "active" to: ' + linkAtribiute);
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagListSelector = '.tags .list';

  const generateTitleLinks = function(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* insert link into titleList */
      html = html + linkHTML;
      //console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  /* Tags */

  const generateTags = function(){
    /* [NEW] create a new variable allTags with empty array */
    let allTags = [];
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(const article of articles){
      /* find tags wrapper */
      const tagWraper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for(const tag of articleTagsArray){
        /* generate HTML of the link */
        const tagListHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
        html = html + tagListHTML;
        /* [NEW] check if this link is NOT already allTags */
        if(allTags.indexOf(tagListHTML) == -1){
          allTags.push(tagListHTML);
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagWraper.innerHTML = html;
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagListSelector);
    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');
  };

  generateTags();

  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked');
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTags);
    /* START LOOP: for each active tag link */
    for(const activeTag of activeTags){
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="#tag-' + href + '"]');
    console.log(tagLinks);
    /* START LOOP: for each found tag link */
    for (const tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
      console.log(tagLinks);
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (const tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  /* Authors */

  const generateAuthors = function(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(const article of articles){
      /* find authors wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-author attribute */
      const authorTags = article.getAttribute('data-author');
      /* generate HTML of the link */
      const linkHTML = '<a href ="#author-' + authorTags + '">' + authorTags + '</a>';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* insert HTML of all the links into the authors wrapper */
      authorWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
  };

  generateAuthors();

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    for(const activeAuthor of activeAuthors){
      activeAuthor.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="#author-' + href + '"]');
    for(const authorLink of authorLinks){
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-authors ="' + author + '"]');
  };

  const addClickListenersToAuthors = function(){
    /*find all links to authors */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    /*start loop for each link */
    for(const authorLink of authorLinks){
      authorLink.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();

}
