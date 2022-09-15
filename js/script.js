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
    optArticleTagsSelector = '.post-tags .list';

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


  const generateTags = function(){
    /* find all articles */
    const allArticles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(const article of allArticles){
      /* find tags wrapper */
      const tagWraper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for(const tag of articleTagsArray){
        /* generate HTML of the link */
        const tagListHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
        html = html + tagListHTML;
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagWraper.innerHTML = html;
    /* END LOOP: for every article: */
    }
  };

  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
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
    for(let activeTag of activeTags){
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="#tag-' + href + '"]');
    console.log(tagLinks);
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

}


