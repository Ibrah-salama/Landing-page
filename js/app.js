/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//select all setions in dom
var sections = document.querySelectorAll('.section')
//select the nav bar 
var navigationList  = document.querySelector('#myList')
//create a new empty document docFragment
var docFragment = document.createDocumentFragment();
//select all links 
const alinks = document.getElementsByTagName('a')
//select all li
const li = document.getElementsByTagName('li')
// select the hamburger button 
const hamburger = document.getElementById('hamburger')
//select the list of nav items
const navUl = document.getElementsByClassName('nav__ul')[0]
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


        //for each section create li,
        //for each li append link,
        //for each 
sections.forEach((element)=>{
    //first we need to get the data nave attribute
    //to add it as a text node for each section
    const secAttribute = element.getAttribute('data-nav');
    //create li
    const li = document.createElement('li');
    //create link
    const link = document.createElement('a');
    //create text node
    const sectionText = document.createTextNode(secAttribute);
    //alert(secAttribute);
    //Add event on each link created to scroll to the desired section 
    link.addEventListener('click',(event)=>{
        event.preventDefault();
        element.scrollIntoView({behavior:'smooth',block: 'center'})
    })
    //append the text of section attribute to link
    link.appendChild(sectionText);
    //append each link to the li 
    li.appendChild(link);
    //append li to the fragment 
    docFragment.appendChild(li);
    // console.log(docFragment);
})
                //append the fragment to ul navigation list 
navigationList.appendChild(docFragment)

//window action
window.addEventListener('scroll', toggleActiveState);

//intersection object 
const option={
    root: null,
    threshold:0.5,
    rootMargin: "0px 0px -200px 0px"
};
function toggleActiveState(){
  //  instance of intersectionObserver
    const interActObserv = new IntersectionObserver((entries,observer)=>{
        
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            }
            //console.log(entry.target.dataset.nav);
            // add new class to one of the entries and disable the others 
            sections.forEach((section)=>{   
                section.classList.remove('your-active-class')
                if( entry.target.getAttribute('data-nav')== section.getAttribute('data-nav')){
                    section.classList.add('your-active-class')
                }
            })

            for(let i= 0 ; i< 4 ; i++){
                // console.log(alinks[i])
                alinks[i].classList.remove('item-active-class')
                // console.log(alinks[i].textContent)
                if(alinks[i].textContent == entry.target.getAttribute('data-nav')){
                    alinks[i].classList.add('item-active-class')
                }
            }

        })
    },option)
    sections.forEach((sec)=>{ interActObserv.observe(sec)})
}
//add event listner to the hamburger button to show the list while click 
hamburger.addEventListener('click',()=>{
    navUl.classList.toggle('show');
})